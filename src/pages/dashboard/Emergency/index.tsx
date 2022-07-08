import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router";

import { Formik } from "formik";
import dayjs from "dayjs";

import { PATH } from "common/constants/routes";
import { getQueryFromLocation } from "common/functions";
import axiosClient from "common/utils/api";
import { ISourceOption, optionSource } from "common/constants/source";

import SearchBoxTable from "components/SearchBoxTable";
import EmergencyTag from "components/EmergencyTag";

import Table, { IColumns } from "designs/Table";
import ActionButtons from "designs/ActionButtons";
import DatePicker from "designs/DatePicker";
import SimpleSelect from "designs/SimpleSelect";

import TableLayout from "layouts/Table";

import { usePage } from "hooks/usePage";
import { useLoading } from "hooks/useLoading";
import { useBreadcrumb } from "hooks/useBreadcrumb";
import { useRedirect } from "hooks/useRedirect";

import { IEmergencyPrograms, IRegion } from "typings";

import { TopButton, SearchBoxWrapper } from "./styles";

import useStore from "zustand/store";
import { toast } from "react-toastify";

import EmergencyBroadcastDialog from "./Components/EmergencyBroadcastDialog";
import EmergencyPauseDialog from "./Components/EmergencyPauseDialog";
import DuplicateDialog from "./Components/DialogDuplicate";
import { DISTRICT_ID, PROVINCE_ID } from "common/constants/region";
import { BROADCASTING_ID } from "common/constants/emergency";
import Link from "designs/Link";

const LOAD_DATA = "LOAD_DATA";
const CANCEL_DATA = "CANCEL_DATA";
const ROLE = "EmergencyOperator";

interface IFormValue {
  startDay?: string;
  endDay?: string;
}

interface IEmergencyProps extends RouteComponentProps {}

const EmergencyConfigured: React.FC<IEmergencyProps> = ({ location }) => {
  const { currentUser, setCurrentUser } = useStore();
  const redirect = useRedirect();

  const [initialValues, setInitialValues] = useState<IFormValue>({
    startDay: "",
    endDay: "",
  });
  const [startDay, setStartDay] = useState<Date | null>(null);
  const [endDay, setEndDay] = useState<Date | null>(null);
  const [sourceTypeSelected, setSourceTypeSelected] =
    useState<ISourceOption | null>(null);

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [provinceList, setProvinceList] = useState<IRegion[]>([]);
  const [districtList, setDistrictList] = useState<IRegion[]>([]);
  const [wardList, setWardList] = useState<IRegion[]>([]);

  const [provinceSelected, setProvinceSelected] = useState<IRegion | null>(
    null,
  );
  const [districtSelected, setDistrictSelected] = useState<IRegion | null>(
    null,
  );
  const [wardSelected, setWardSelected] = useState<IRegion | null>(null);

  const [regionId, setRegionId] = useState(0);

  const [listEmergencyProgram, setListEmergencyProgram] = useState<
    IEmergencyPrograms[]
  >([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { startLoading, stopLoading } = useLoading();

  useBreadcrumb([
    {
      name: "Khẩn cấp",
    },

    {
      name: "Danh sách khẩn cấp",

      href: PATH.EMERGENCY.SELF,
    },
  ]);

  useEffect(() => {
    getUserInfoService();
    if (currentUser?.userInfo?.region?.levelId === PROVINCE_ID) {
      const provinceId = currentUser?.userInfo?.region?.provinceId;
      getDistrictListService(provinceId);
    }
    if (currentUser?.userInfo?.region?.levelId === DISTRICT_ID) {
      const districtId = currentUser?.userInfo?.region?.districtId;
      getWardListService(districtId);
    }
  }, []);

  useEffect(() => {
    const newRegionId = wardSelected
      ? wardSelected?.id
      : districtSelected
      ? districtSelected?.id
      : provinceSelected
      ? provinceSelected?.id
      : 0;
    setRegionId(newRegionId || 0);
  }, [provinceSelected, districtSelected, wardSelected]);

  useEffect(() => {
    getAllEmergencyProgramConfiguredService();
  }, [
    page,
    sizePerPage,
    searchText,
    sourceTypeSelected,
    startDay,
    endDay,
    regionId,
  ]);

  const getUserInfoService = async () => {
    try {
      const res: any = await axiosClient.get(
        `User/${currentUser?.userInfo?.id}`,
      );
      if (res) {
        setCurrentUser({ ...currentUser, userInfo: res });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllEmergencyProgramConfiguredService = async () => {
    try {
      startLoading(LOAD_DATA);

      const payload: any = {
        sourceType: sourceTypeSelected?.id,
        ...(startDay && {
          fromDate: dayjs(startDay).unix(),
        }),
        ...(endDay && {
          toDate: dayjs(endDay).unix(),
        }),
        page,
        size: sizePerPage,
        searchString: searchText,
        regionId: regionId ? regionId : currentUser?.userInfo?.region?.id,
        excludeRegionId: 1,
      };
      const response: any = await axiosClient.get("/EmergencyProgram", {
        params: payload,
      });
      if (response) {
        setListEmergencyProgram(response.emergencyPrograms);
        setTotalCount(response.totalCount);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading(LOAD_DATA);
    }
  };

  const getDistrictListService = async (id: number) => {
    try {
      const res: any = await axiosClient.get(`Region/${id}/Subregions`);
      if (res) {
        setDistrictList(res.regions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWardListService = async (id: number) => {
    try {
      const res: any = await axiosClient.get(`Region/${id}/Subregions`);
      if (res) {
        setWardList(res.regions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderAction = (record: IEmergencyPrograms) => {
    return (
      <ActionButtons
        buttons={{
          info: {
            DialogContent: props => (
              <Redirect
                to={{
                  pathname: PATH.EMERGENCY.DETAIL.replace(
                    ":id",
                    record.id!,
                  ).replace(":type", "configured"),
                }}
              />
            ),
          },
          ...(record.status === BROADCASTING_ID && {
            cancel: {
              title: "Hủy phát chương trình",
              message: "Bạn có chắc chắn muốn hủy phát chương trình này?",
              onCancel: async () => {
                try {
                  startLoading(CANCEL_DATA);
                  await axiosClient.put(
                    `/EmergencyProgram/${record?.id}/Cancel`,
                  );
                  toast.dark("Hủy phát thành công !", {
                    type: toast.TYPE.SUCCESS,
                  });
                } catch (error) {
                  console.log(error);
                  toast.dark("Hủy phát không thành công !", {
                    type: toast.TYPE.ERROR,
                  });
                } finally {
                  getAllEmergencyProgramConfiguredService();
                  stopLoading(CANCEL_DATA);
                }
              },
            },
          }),
        }}
      />
    );
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên chương trình",
        dataField: "displayName",
      },
      {
        text: "Thời gian",
        dataField: "startTime",
        formatter: (timeStamp: number) => {
          const date = dayjs.unix(timeStamp).format("DD/MM/YYYY");
          const time = dayjs.unix(timeStamp).format("HH:mm:ss");
          return `${date} - ${time}`;
        },
      },
      {
        text: "Thời lượng",
        dataField: "totalDuration",
      },
      {
        text: "Người tạo",
        dataField: "createdByUser.displayName",
      },
      {
        text: "Trạng thái",
        dataField: "status",
        formatter: (status: number) => <EmergencyTag active={status} />,
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: IEmergencyPrograms) =>
          renderAction(record),
      },
    ],
    [page],
  );

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleFetchData = (value: string) => {
    setSearchText(value);
    setPage(1);
  };

  const handleChangeSize = (value: number) => {
    setSizePerPage(value);
    setPage(1);
  };

  return (
    <>
      <TableLayout
        title="Danh sách khẩn cấp đã cấu hình"
        buttonMenu={
          <div className="flex flex-row gap-2 w-full phone:w-auto">
            <Link
              to={PATH.EMERGENCY.EMERGENCY_BROADCAST}
              className="w-full phone:w-auto"
            >
              <TopButton variant="primary">Phát khẩn cấp</TopButton>
            </Link>
            <EmergencyPauseDialog
              ButtonMenu={
                <TopButton variant="danger" className="w-full">
                  Dừng khẩn cấp
                </TopButton>
              }
            />
          </div>
        }
      >
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={() => {}}
        >
          {formik => {
            return (
              <SearchBoxWrapper>
                <div className="w-full">
                  <SearchBoxTable
                    onFetchData={handleFetchData}
                    placeholder="Tìm kiếm theo tên chương trình"
                    className="w-full phone:w-35 mb-2"
                  />
                  <SimpleSelect
                    options={optionSource}
                    optionSelected={sourceTypeSelected}
                    onSelect={value => {
                      setSourceTypeSelected(value);
                    }}
                    placeholder="Nguồn phát"
                    className="w-full phone:w-35"
                    optionTarget="displayName"
                  />
                </div>
                <div className="w-full">
                  <DatePicker
                    dateData={startDay!}
                    onDateChange={value => {
                      setStartDay(value);
                      setEndDay(null);
                    }}
                    name="startDay"
                    placeholder="Từ ngày"
                    className="mb-2"
                  />
                  <DatePicker
                    dateData={endDay!}
                    onDateChange={value => {
                      setEndDay(value);
                    }}
                    name="endDay"
                    disabled={formik.values.startDay === ""}
                    placeholder="Đến ngày"
                    minimumDate={new Date(formik.values.startDay || "")}
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  {currentUser?.userInfo?.region?.levelId === 2 && (
                    <>
                      <SimpleSelect
                        options={districtList}
                        optionSelected={districtSelected}
                        onSelect={value => {
                          setWardSelected(null);
                          if (value) {
                            getWardListService(value?.id!);
                          }
                          setDistrictSelected(value);
                          setPage(1);
                        }}
                        placeholder="Quận/Huyện/Thị Xã"
                        className="w-full phone:max-w-35"
                        optionTarget="displayName"
                      />
                      <SimpleSelect
                        options={wardList}
                        optionSelected={wardSelected}
                        onSelect={value => {
                          setWardSelected(value);
                          setPage(1);
                        }}
                        placeholder="Phường/Xã/Thị Trấn"
                        disabled={districtSelected ? false : true}
                        className="w-full phone:max-w-35"
                        optionTarget="displayName"
                      />
                    </>
                  )}
                  {currentUser?.userInfo?.region?.levelId === 3 && (
                    <SimpleSelect
                      options={wardList}
                      optionSelected={wardSelected}
                      onSelect={value => {
                        setWardSelected(value);
                        setPage(1);
                      }}
                      placeholder="Phường/Xã/Thị Trấn"
                      className="w-full phone:max-w-35"
                      optionTarget="displayName"
                    />
                  )}
                </div>
              </SearchBoxWrapper>
            );
          }}
        </Formik>

        <Table
          data={listEmergencyProgram}
          columns={columns}
          page={page}
          totalSize={totalCount}
          onPageChange={handleChangePage}
          onSizeChange={handleChangeSize}
          isRemote
        />
      </TableLayout>

      <DuplicateDialog />
    </>
  );
};

export default EmergencyConfigured;
