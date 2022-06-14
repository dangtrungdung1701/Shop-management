import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory, useParams } from "react-router";
import * as yup from "yup";
import { Formik, FormikProps, FormikValues } from "formik";

import { PATH } from "common/constants/routes";
import { ISource, optionSource } from "common/constants/source";
import axiosClient from "common/utils/api";
import { optionWeek } from "common/constants/date";
import {
  CLASS_LIST,
  CLASS_LIST_OF_DISTRICT,
  CLASS_LIST_OF_WARD,
} from "common/constants/user";
import { DISTRICT_ID, PROVINCE_ID, WARD_ID } from "common/constants/region";

import Input from "designs/Input";
import MultipleSelect from "designs/MultipleSelect";
import Select from "designs/Select";
import DatePicker from "designs/DatePicker";
import TimePicker from "designs/TimePicker";

import TableLayout from "layouts/Table";

import useGetLocation from "hooks/useGetLocation";
import { useBreadcrumb } from "hooks/useBreadcrumb";

import {
  IDevice,
  IFileAudio,
  IFM,
  IGetAllDevice,
  IGetAllSource,
  ILink,
  IRegion,
} from "typings";

import useStore from "zustand/store";

import {
  Title,
  BottomWrapper,
  FormLeftWrapper,
  Form,
  ButtonWrapper,
  Button,
  FormRightWrapper,
} from "./styles";

interface IConfigureScheduleProps extends RouteComponentProps {}
interface IParams {
  id: string;
}

interface IFormValue {
  name?: string;
  level?: string;
  province?: string;
  district?: string;
  ward?: string;
  devices?: string;
  sources?: string;
  file?: string;
  startDay?: string;
  endDay?: string;
  startTime?: string;
  endTime?: string;
  weekDay?: string;
  repeatTime?: string;
}

const ConfigureSchedule: React.FC<IConfigureScheduleProps> = ({ location }) => {
  const params: IParams = useParams();
  const history = useHistory();

  const { currentUser } = useStore();

  const [loading, setLoading] = useState(false);

  const [schedule, setSchedule] = useState<any | null>(null);

  const [listDevices, setListDevices] = useState<IDevice[]>([]);
  const [provinceList, setProvinceList] = useState<IRegion[]>([]);
  const [districtList, setDistrictList] = useState<IRegion[]>([]);
  const [wardList, setWardList] = useState<IRegion[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<IRegion | null>(
    null,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<IRegion | null>(
    null,
  );
  const [selectedWard, setSelectedWard] = useState<IRegion | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<any | null>(null);

  const [listDeviceSelected, setListDeviceSelected] = useState<any[]>([]);
  const [fileSelected, setFileSelected] = useState<
    IFileAudio | ILink | IFM | null
  >(null);
  const [options, setOptions] = useState<IFileAudio[] | ILink[] | IFM[]>([]);
  const [sourceSelected, setSourceSelected] = useState<ISource | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<any[]>([]);
  const [timeEnd, setTimeEnd] = useState<Date>();
  const [timeStart, setTimeStart] = useState<Date>();

  const [initialValues, setInitialValues] = useState<IFormValue>({
    name: "",
    level: "",
    province: "",
    district: "",
    ward: "",
    devices: "",
    sources: "",
    file: "",
    startDay: "",
    endDay: "",
    startTime: "",
    endTime: "",
    weekDay: "",
    repeatTime: "",
  });

  useBreadcrumb([
    {
      name: "Quản lý lịch phát",
      href: "#",
    },
    {
      name: params.id ? "Chỉnh sửa lịch phát" : "Thêm lịch phát",
      href: params.id ? PATH.SCHEDULE.EDIT : PATH.SCHEDULE.CREATE,
    },
  ]);

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      name: yup.string().required("Vui lòng nhập tên lịch phát").trim(),
      level: yup.string().required("Vui lòng chọn cấp độ"),
      province: yup.string().required("Vui lòng chọn Tỉnh/Thành phố"),
      district: yup.string().required("Vui lòng chọn Quận/Huyện/Thị xã"),
      ward: yup.string().required("Vui lòng chọn Phường/Xã/Thị trấn"),
      devices: yup.string().required("Vui lòng chọn thiết bị phát"),
      sources: yup.string().required("Vui lòng chọn nguồn phát"),
      file: yup.string().required("Vui lòng chọn nguồn phát tương ứng"),
      startDay: yup.date().required("Vui lòng chọn ngày bắt đầu"),
      endDay: yup
        .date()
        .min(
          yup.ref("startDay"),
          "Vui lòng chọn ngày kết thúc muộn hơn ngày bắt đầu!",
        ),
      startTime: yup.string().required("Vui lòng chọn thời gian bắt đầu"),
      endTime: yup.string().required("Vui lòng chọn thời gian kết thúc"),
      weekDay: yup.string().required("Vui lòng chọn thứ trong tuần"),
      repeatTime: yup.number().required("Vui lòng chọn số lần lặp"),
    });

  // const getScheduleService = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axiosClient.get(`/Schedule/${params.id}`);
  //     if (res) {
  //       setSchedule(res);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    getProvinceListService();
    currentUser?.userInfo?.region?.provinceId !== -1 &&
      getDistrictListService(currentUser?.userInfo?.region?.provinceId);
    currentUser?.userInfo?.region?.districtId !== -1 &&
      getWardListService(currentUser?.userInfo?.region?.districtId);
  }, []);

  useEffect(() => {
    const regionId = selectedWard
      ? selectedWard?.id
      : selectedDistrict
      ? selectedDistrict?.id
      : selectedProvince
      ? selectedProvince?.id
      : undefined;
    if (regionId) {
      getAllDeviceService();
    }
  }, [selectedProvince, selectedDistrict, selectedWard]);

  // get region option
  const getProvinceListService = async () => {
    try {
      const res: any = await axiosClient.get("Region", {
        params: { level: 2 },
      });
      if (res) {
        setProvinceList(res.regions);
        setSelectedProvince(
          useGetLocation(schedule?.region?.provinceId!, res.regions),
        );
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
        setSelectedDistrict(
          useGetLocation(schedule?.region?.districtId!, res.regions),
        );
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
        setSelectedWard(useGetLocation(schedule?.region?.wardId!, res.regions));
      }
    } catch (error) {
      console.log(error);
    }
  };
  //

  const getAllDeviceService = async () => {
    const regionId = selectedWard
      ? selectedWard?.id
      : selectedDistrict
      ? selectedDistrict?.id
      : selectedProvince
      ? selectedProvince?.id
      : undefined;
    const input: IGetAllDevice = {
      regionId: regionId,
      excludeRegionId: 1,
      level: selectedLevel?.id,
    };
    try {
      setLoading(true);
      const payload: any = {
        ...input,
      };
      const response: any = await axiosClient.get("/Device", {
        params: payload,
      });
      if (response) {
        setListDevices(response.devices);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllFileService = async () => {
    const payload: IGetAllSource = {
      level: currentUser?.userInfo?.region?.levelId,
      regionId: currentUser?.userInfo?.region?.id,
    };
    try {
      setLoading(true);
      const res: any = await axiosClient.get("/AudioFileSource", {
        params: payload,
      });
      if (res) {
        setOptions(res.files);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllLinkService = async () => {
    const payload: IGetAllSource = {
      level: currentUser?.userInfo?.region?.levelId,
      regionId: currentUser?.userInfo?.region?.id,
    };
    try {
      setLoading(true);
      const res: any = await axiosClient.get("/AudioLinkSource", {
        params: payload,
      });
      if (res) {
        setOptions(res.links);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllFmService = async () => {
    const payload: IGetAllSource = {
      level: currentUser?.userInfo?.region?.levelId,
      regionId: currentUser?.userInfo?.region?.id,
    };
    try {
      setLoading(true);
      const res: any = await axiosClient.get("/AudioFmSource", {
        params: payload,
      });
      if (res) {
        setOptions(res.fms);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOption();
  }, [sourceSelected]);

  const getOption = () => {
    switch (sourceSelected?.id) {
      case "1":
        getAllFileService();
        break;
      case "2":
        getAllLinkService();
        break;
      case "3":
        getAllFmService();
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (value: FormikValues) => {
    const input: any = {
      ...value,
    };
    console.log(input);
  };

  const handleBack = () => {
    history.push(PATH.SCHEDULE.SELF);
  };

  const setFieldValue = (value: any, formik: FormikProps<IFormValue>) => {
    const province = provinceList.filter(
      item => item.id === currentUser?.userInfo?.region?.provinceId,
    )[0];
    const district = districtList.filter(
      item => item.id === currentUser?.userInfo?.region?.districtId,
    )[0];
    const ward = wardList.filter(
      item => item.id === currentUser?.userInfo?.region?.wardId,
    )[0];
    switch (value?.id) {
      case 2:
        setSelectedProvince(province);
        formik.setFieldValue("province", "SELECTED");
        formik.setFieldValue("district", "SELECTED");
        formik.setFieldValue("ward", "SELECTED");
        break;
      case 3:
        setSelectedProvince(province);
        setSelectedDistrict(district);
        !district && getDistrictListService(province?.id!);
        formik.setFieldValue("province", "SELECTED");
        district
          ? formik.setFieldValue("district", "SELECTED")
          : formik.setFieldValue("district", "");
        formik.setFieldValue("ward", "SELECTED");
        break;
      case 4:
        setSelectedProvince(province);
        setSelectedDistrict(district);
        setSelectedWard(ward);
        !district && getDistrictListService(province?.id!);
        !ward && district
          ? getWardListService(district?.id!)
          : getWardListService(schedule?.region?.districtId!);
        formik.setFieldValue("province", "SELECTED");
        district
          ? formik.setFieldValue("district", "SELECTED")
          : formik.setFieldValue("district", "");
        ward
          ? formik.setFieldValue("ward", "SELECT")
          : formik.setFieldValue("ward", "");
        break;
      default:
        formik.setFieldValue("province", "SELECTED");
        formik.setFieldValue("district", "SELECTED");
        formik.setFieldValue("ward", "SELECTED");
        break;
    }
  };

  return (
    <TableLayout>
      <Title>{params.id ? "Chỉnh sửa lịch phát" : "Thêm lịch phát"}</Title>

      <Formik
        initialValues={initialValues}
        // enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formik => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <BottomWrapper>
                <FormLeftWrapper>
                  <Input
                    name="name"
                    label="Tên lịch phát"
                    placeholder="Nhập tên lịch phát"
                    type="text"
                    required
                  />
                  <Select
                    name="level"
                    label="Phân cấp"
                    optionSelected={selectedLevel}
                    options={
                      currentUser?.userInfo?.region?.levelId === 2
                        ? CLASS_LIST
                        : currentUser?.userInfo?.region?.levelId === 3
                        ? CLASS_LIST_OF_DISTRICT
                        : CLASS_LIST_OF_WARD
                    }
                    onSelect={value => {
                      setFieldValue(value, formik);
                      setSelectedLevel(value);
                    }}
                    placeholder="Chọn phân cấp"
                    required
                  />
                  {selectedLevel?.id === 2 && (
                    <Select
                      name="province"
                      label="Tên tỉnh/ thành phố"
                      optionSelected={selectedProvince}
                      options={provinceList}
                      onSelect={value => setSelectedProvince(value)}
                      placeholder="Chọn tỉnh/thành phố"
                      required
                      optionTarget="displayName"
                      disabled
                    />
                  )}
                  {selectedLevel?.id === 3 && (
                    <>
                      <Select
                        name="province"
                        label="Tên tỉnh/ thành phố"
                        optionSelected={selectedProvince}
                        options={provinceList}
                        onSelect={value => {
                          getDistrictListService(value?.id!);
                          setSelectedDistrict(null);
                          setSelectedProvince(value);
                        }}
                        placeholder="Chọn tỉnh/thành phố"
                        required
                        optionTarget="displayName"
                        disabled
                      />
                      <Select
                        name="district"
                        label="Tên quận/ huyện/ thị xã"
                        optionSelected={selectedDistrict}
                        options={districtList}
                        onSelect={value => {
                          setSelectedDistrict(value);
                        }}
                        placeholder="Chọn quận/ huyện/ thị xã"
                        disabled={
                          currentUser?.userInfo?.region?.districtId === -1
                            ? false
                            : true
                        }
                        required
                        optionTarget="displayName"
                      />
                    </>
                  )}
                  {selectedLevel?.id === 4 && (
                    <>
                      <Select
                        name="province"
                        label="Tên tỉnh/ thành phố"
                        optionSelected={selectedProvince}
                        options={provinceList}
                        onSelect={value => {
                          getDistrictListService(value?.id!);
                          setSelectedDistrict(null);
                          setSelectedWard(null);
                          setSelectedProvince(value);
                        }}
                        placeholder="Chọn tỉnh/ thành phố"
                        required
                        optionTarget="displayName"
                        disabled
                      />
                      <Select
                        name="district"
                        label="Tên quận/ huyện/ thị xã"
                        optionSelected={selectedDistrict}
                        options={districtList}
                        onSelect={value => {
                          getWardListService(value?.id!);
                          setSelectedWard(null);
                          setSelectedDistrict(value);
                        }}
                        placeholder="Chọn quận/ huyện/ thị xã"
                        disabled={
                          currentUser?.userInfo?.region?.districtId === -1
                            ? false
                            : true
                        }
                        required
                        optionTarget="displayName"
                      />
                      <Select
                        name="ward"
                        label="Tên phường/ xã/ thị trấn"
                        optionSelected={selectedWard}
                        options={wardList}
                        onSelect={value => setSelectedWard(value)}
                        placeholder="Chọn phường/ xã/ thị trấn"
                        disabled={(() => {
                          if (currentUser?.userInfo?.region?.wardId !== -1) {
                            return true;
                          } else {
                            if (!selectedDistrict) {
                              return true;
                            }
                          }
                          return false;
                        })()}
                        required
                        optionTarget="displayName"
                      />
                    </>
                  )}
                  <MultipleSelect
                    name="devices"
                    label="Thiết bị"
                    listOptionsSelected={listDeviceSelected}
                    options={listDevices}
                    onSelect={value => setListDeviceSelected(value)}
                    placeholder="Chọn thiết bị"
                    required
                    disabled={(() => {
                      if (!selectedLevel) {
                        return true;
                      }
                      const regionId = () => {
                        if (selectedLevel?.id === WARD_ID && selectedWard) {
                          return selectedWard?.id;
                        }
                        if (
                          selectedLevel?.id === DISTRICT_ID &&
                          selectedDistrict
                        ) {
                          return selectedDistrict?.id;
                        }
                        if (
                          selectedLevel?.id === PROVINCE_ID &&
                          selectedProvince
                        ) {
                          return selectedProvince?.id;
                        }
                        return undefined;
                      };
                      if (!regionId()) {
                        return true;
                      }
                      return false;
                    })()}
                  />
                  <Select
                    name="sources"
                    label="Nguồn phát"
                    optionSelected={sourceSelected}
                    options={optionSource}
                    onSelect={value => setSourceSelected(value)}
                    placeholder="Chọn nguồn phát"
                    required
                  />
                  <Select
                    name="file"
                    label="Nguồn phát tương ứng"
                    optionSelected={fileSelected}
                    options={options}
                    onSelect={value => setFileSelected(value)}
                    placeholder="Chọn Tệp tin/Link tiếp sóng/FM"
                    required
                    disabled={sourceSelected ? false : true}
                  />
                </FormLeftWrapper>
                <FormRightWrapper>
                  <DatePicker
                    label="Ngày bắt đầu gói cước"
                    name="startDay"
                    required
                  />
                  <DatePicker
                    minimumDate={new Date(formik.values.startDay || "")}
                    label="Ngày kết thúc gói cước"
                    name="endDay"
                    required
                  />
                  <TimePicker
                    name="startTime"
                    label="Thời gian bắt đầu"
                    placeholder="Chọn thời gian bắt đầu"
                    onTimeChange={time => setTimeStart(time)}
                    required
                  />
                  <TimePicker
                    name="endTime"
                    label="Thời gian kết thúc"
                    placeholder="Chọn thời gian kết thúc"
                    minTime={formik.values.startTime}
                    onTimeChange={time => setTimeEnd(time)}
                    disabled={timeStart ? false : true}
                    required
                  />
                  <MultipleSelect
                    name="weekDay"
                    label="Thứ trong tuần"
                    listOptionsSelected={selectedWeek}
                    options={optionWeek}
                    onSelect={value => setSelectedWeek(value)}
                    placeholder="Chọn thứ trong tuần"
                    required
                  />
                  <Input
                    name="repeatTime"
                    label="Số lần lặp"
                    placeholder="Nhập số lần lặp (tệp tin)"
                    type="number"
                    required
                  />
                </FormRightWrapper>
              </BottomWrapper>
              <ButtonWrapper>
                <Button type="button" variant="secondary" onClick={handleBack}>
                  Quay lại
                </Button>
                <Button loading={loading} type="submit">
                  Lưu
                </Button>
              </ButtonWrapper>
            </Form>
          );
        }}
      </Formik>
    </TableLayout>
  );
};

export default ConfigureSchedule;
