import React, { useMemo, useState, lazy, useCallback, useEffect } from "react";
import { RouteComponentProps } from "react-router";

import { usePage } from "hooks/usePage";
import { useLoading } from "hooks/useLoading";
import { useBreadcrumb } from "hooks/useBreadcrumb";

import SearchBoxTable from "components/SearchBoxTable";
import Table, { IColumns } from "designs/Table";
import ActionButtons from "designs/ActionButtons";
import TableLayout from "layouts/Table";

import { PATH } from "common/constants/routes";
import { getQueryFromLocation } from "common/functions";

import { ButtonAdd, SearchBoxWrapper } from "./styles";
import { IRegion, IUser } from "typings";
import SimpleSelect from "designs/SimpleSelect";
import axiosClient from "common/utils/api";
import useStore from "zustand/store";
import { toast } from "react-toastify";
import { userInfo } from "os";
import useCheckPermission from "hooks/useCheckPermission";

const NormalDialog = lazy(() => import("./UserDialog"));
const UserProfileDialog = lazy(() => import("components/UserProfileDialog"));
const ChangePasswordDialog = lazy(
  () => import("components/ChangePasswordDialog"),
);

const LOAD_DATA = "LOAD_DATA";
const DELETE_DATA = "DELETE_DATA";

interface IAdminProps extends RouteComponentProps {}

const NormalUsers: React.FC<IAdminProps> = ({ location }) => {
  const { currentUser, setCurrentUser } = useStore();

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");
  const [currentAccount, setCurrentAccount] = useState<boolean>(true);

  const [listUsers, setListUsers] = useState<IUser[]>([]);
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

  const [totalCount, setTotalCount] = useState<number>(listUsers.length);
  const { startLoading, stopLoading } = useLoading();
  const [regionId, setRegionId] = useState(0);

  useBreadcrumb([
    {
      name: "Quản lý người dùng",
      href: "#",
    },
    {
      name: "Người dùng",
      href: PATH.USER,
    },
  ]);

  useEffect(() => {
    getAllUserService();
  }, [page, sizePerPage, searchText, regionId]);

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
    getUserInfoService();
    if (currentUser?.userInfo?.region?.levelId === 2) {
      const provinceId = currentUser?.userInfo?.region?.provinceId;
      getDistrictListService(provinceId);
    }
    if (currentUser?.userInfo?.region?.levelId === 3) {
      const districtId = currentUser?.userInfo?.region?.districtId;
      getWardListService(districtId);
    }
  }, []);

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

  const getAllUserService = async () => {
    try {
      startLoading(LOAD_DATA);
      const payload: any = {
        page,
        size: sizePerPage,
        searchString: searchText,
        excludeAdmin: true,
        regionId: regionId ? regionId : currentUser?.userInfo?.region?.id,
      };
      const response: any = await axiosClient.get("/User", {
        params: payload,
      });

      if (response) {
        setListUsers(response.users);
        setTotalCount(response.totalCount);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading(LOAD_DATA);
    }
  };

  const renderAction = (record: IUser) => {
    const isCurrentAccount = currentUser?.userInfo?.id === record?.id;
    return (
      <ActionButtons
        buttons={{
          edit: {
            DialogContent: props =>
              isCurrentAccount ? (
                <UserProfileDialog
                  editField={record}
                  onSuccess={() => {
                    getAllUserService();
                  }}
                  open
                  {...props}
                />
              ) : (
                <NormalDialog
                  onSuccess={() => {
                    getAllUserService();
                  }}
                  open
                  editField={record}
                  {...props}
                />
              ),
          },
          ...(!isCurrentAccount && {
            delete: {
              title: "Xóa người dùng",
              message: `Bạn có chắc chắn muốn xóa người dùng này?`,
              onDelete: async () => {
                try {
                  startLoading(DELETE_DATA);
                  const res = await axiosClient.delete(`/User/${record?.id}`);
                  if (res) {
                    toast.dark("Xóa người dùng thành công!", {
                      type: toast.TYPE.SUCCESS,
                    });
                    getAllUserService();
                  }
                } catch (error) {
                  console.log(error);
                  toast.dark("Xóa người dùng không thành công!", {
                    type: toast.TYPE.ERROR,
                  });
                } finally {
                  stopLoading(DELETE_DATA);
                }
              },
            },
          }),
          ...(isCurrentAccount && {
            update: {
              DialogContent: props => (
                <ChangePasswordDialog
                  editField={record}
                  onSuccess={() => {}}
                  open
                  {...props}
                />
              ),
            },
          }),
        }}
      />
    );
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên tài khoản",
        dataField: "userName",
        headerStyle: () => ({
          width: "30%",
        }),
      },
      {
        text: "Tên hiển thị",
        dataField: "displayName",
        headerStyle: () => ({
          width: "30%",
        }),
      },
      {
        text: "Phân cấp",
        dataField: "region",
        formatter: (region: IRegion) => {
          switch (region.levelId) {
            case 2:
              return <div>Cấp Tỉnh/Thành phố</div>;
              break;
            case 3:
              return <div>Cấp Quận/Huyện/Thị Xã</div>;
              break;
            case 4:
              return <div>Cấp Phường/Xã/Thị Trấn</div>;
              break;
            default:
              return <></>;
              break;
          }
        },
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: IUser) => renderAction(record),
      },
    ],
    [page, searchText, regionId, sizePerPage, listUsers],
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
    <TableLayout
      title="Người dùng"
      buttonMenu={
        <NormalDialog
          ButtonMenu={<ButtonAdd>Thêm người dùng</ButtonAdd>}
          onSuccess={() => {
            getAllUserService();
          }}
        />
      }
    >
      <SearchBoxWrapper>
        <SearchBoxTable
          onFetchData={handleFetchData}
          placeholder="Tìm kiếm theo tên tài khoản"
          className="w-full phone:max-w-35"
        />
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
      </SearchBoxWrapper>

      <Table
        data={listUsers}
        columns={columns}
        page={page}
        totalSize={totalCount}
        onPageChange={handleChangePage}
        onSizeChange={handleChangeSize}
        isRemote
      />
    </TableLayout>
  );
};

export default NormalUsers;
