import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory, useParams } from "react-router";
import * as yup from "yup";
import { Formik, FormikProps, FormikValues } from "formik";

import { PATH } from "common/constants/routes";
import {
  FILE_SOURCE_ID,
  ISourceType,
  MIC_SOURCE_ID,
  optionSource,
} from "common/constants/source";
import axiosClient from "common/utils/api";
import {
  IRepeatType,
  IDay,
  optionMonth,
  optionWeek,
  repeatType,
} from "common/constants/date";
import {
  CLASS_LIST,
  CLASS_LIST_OF_DISTRICT,
  CLASS_LIST_OF_WARD,
} from "common/constants/user";
import { DISTRICT_ID, PROVINCE_ID, WARD_ID } from "common/constants/region";
import {
  calSecondFromDateTime,
  calSecondFromTimeString,
  formatTime,
  getTheNextDay,
} from "common/functions";

import Input from "designs/Input";
import MultipleSelect from "designs/MultipleSelect";
import Select from "designs/Select";
import DatePicker from "designs/DatePicker";
import TimePicker from "designs/TimePicker";
import SVG from "designs/SVG";

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
  ButtonAddTime,
  ButtonRemove,
} from "./styles";
import { duration } from "@material-ui/core";

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
  repeatDate?: string;
  repeatTime?: string;
  repeatType?: string;
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

  const [listDeviceSelected, setListDeviceSelected] = useState<IDevice[]>([]);
  const [fileSelected, setFileSelected] = useState<
    IFileAudio | ILink | IFM | null
  >(null);

  const [options, setOptions] = useState<IFileAudio[] | ILink[] | IFM[]>([]);
  const [sourceSelected, setSourceSelected] = useState<ISourceType | null>(
    null,
  );

  const [selectedRepeatType, setSelectedRepeatType] = useState<IRepeatType>();
  const [selectedRepeatDate, setSelectedRepeatDate] = useState<IDay[]>([]);

  const [timeEnd, setTimeEnd] = useState<(number | null)[]>([null]);
  const [timeStart, setTimeStart] = useState<(number | null)[]>([null]);

  const [broadcastTime, setBroadcastTime] = useState<
    { startTime: Date | null; endTime: Date | null }[]
  >([{ startTime: null, endTime: null }]);

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
    repeatDate: "",
    repeatTime: "",
    repeatType: "",
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
      name: yup.string().required("Vui lòng nhập tên lịch phát"),
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
        .required("Vui lòng chọn ngày kết thúc")
        .min(
          yup.ref("startDay"),
          "Vui lòng chọn ngày kết thúc muộn hơn ngày bắt đầu!",
        ),
      startTime: yup.string().required("Vui lòng chọn thời điểm bắt đầu"),
      endTime: yup.string().required("Vui lòng chọn thời điểm kết thúc"),
      repeatType: yup.string().required("Vui lòng chọn kiểu lịch"),
      repeatDate: yup.string().required("Vui lòng chọn ngày lặp lại"),
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
    const regionId = selectedWard
      ? selectedWard?.id
      : selectedDistrict
      ? selectedDistrict?.id
      : selectedProvince
      ? selectedProvince?.id
      : undefined;
    const input: any = {
      regionId: regionId,
      audioSourceId: fileSelected?.id,
      sourceType: Number(sourceSelected?.id),
      displayName: value?.name,
      summary: "",
      scheduleType: selectedRepeatType?.uid,
      repeatDate: selectedRepeatDate.map(item => item?.id),
      startDate: new Date(value?.startDay).getTime(),
      endDate: new Date(value?.endDay).getTime(),
      startTime: timeStart,
      endTime: timeEnd,
      fileLoopCount: value?.repeatTime,
      volume: 100,
      deviceIds: listDeviceSelected.map(item => item?.id),
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

  const renderTimePicker = () => {};

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
                    onSelect={value => {
                      setSourceSelected(value);
                      setFileSelected(null);
                      if (value?.id === FILE_SOURCE_ID) {
                        params?.id
                          ? formik?.setFieldValue("repeatTime", 0)
                          : formik?.setFieldValue("repeatTime", undefined);
                        return;
                      }
                      formik?.setFieldValue("repeatTime", 1);
                    }}
                    placeholder="Chọn nguồn phát"
                    required
                  />
                  {sourceSelected?.id !== MIC_SOURCE_ID && (
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
                  )}

                  {sourceSelected && (
                    <Input
                      name="repeatTime"
                      label="Số lần lặp lại tệp tin"
                      placeholder="Nhập số lần lặp (tệp tin)"
                      type="number"
                      required
                      disabled={
                        sourceSelected?.id === FILE_SOURCE_ID ? false : true
                      }
                    />
                  )}
                </FormLeftWrapper>
                <FormRightWrapper>
                  <DatePicker
                    label="Ngày bắt đầu"
                    name="startDay"
                    required
                    onDateChange={newDate => {
                      if (
                        selectedRepeatType &&
                        selectedRepeatType.id === "once"
                      ) {
                        formik.setFieldValue(
                          "endDay",
                          String(getTheNextDay(newDate)),
                        );
                      }
                    }}
                  />
                  {selectedRepeatType?.id !== "once" && (
                    <DatePicker
                      minimumDate={new Date(formik.values.startDay || "")}
                      label="Ngày kết thúc"
                      name="endDay"
                      required
                      disabled={formik.values.startDay ? false : true}
                    />
                  )}

                  {broadcastTime.map((item: any, index: number) => {
                    return (
                      <div className="flex flex-row gap-1 items-end">
                        <div className="flex flex-col tablet:flex-row laptop:flex-col desktop:flex-row gap-1 w-full">
                          <TimePicker
                            name="startTime"
                            label="Thời điểm bắt đầu"
                            placeholder="HH:MM:SS"
                            onTimeChange={time => {
                              const newTimeStart = timeStart.map(
                                (item, indexTime) => {
                                  if (indexTime === index)
                                    return calSecondFromDateTime(time); // startTime
                                  return item;
                                },
                              );
                              const newBroadcastTimeStart = broadcastTime.map(
                                (item: any, indexBroadcastTime: number) => {
                                  if (indexBroadcastTime === index)
                                    return { ...item, startTime: time };
                                  return item;
                                },
                              );
                              setTimeStart(newTimeStart);
                              if (
                                sourceSelected?.id === FILE_SOURCE_ID &&
                                fileSelected &&
                                formik.values.repeatTime
                              ) {
                                const durationOfFile = calSecondFromTimeString(
                                  (fileSelected as IFileAudio)?.duration!,
                                );
                                const repeatTimes = Number(
                                  formik.values.repeatTime,
                                );
                                const startTime = calSecondFromDateTime(time);
                                const startTimeInMilisecond = time.getTime(); //start time in milisecond

                                const newTimeEnd = timeEnd.map(
                                  (item, indexTime) => {
                                    if (indexTime === index) {
                                      return (
                                        startTime + durationOfFile * repeatTimes
                                      );
                                    }
                                    return item;
                                  },
                                );
                                const newBroadcastTimeEnd =
                                  newBroadcastTimeStart.map(
                                    (item: any, indexBroadcastTime: number) => {
                                      if (indexBroadcastTime === index) {
                                        const newTime = new Date(
                                          startTimeInMilisecond +
                                            durationOfFile * 1000 * repeatTimes, // time for 1000 to change unit from second to milisecond
                                        );
                                        return { ...item, endTime: newTime };
                                      }
                                      return item;
                                    },
                                  );
                                setBroadcastTime(newBroadcastTimeEnd);
                                setTimeEnd(newTimeEnd);
                                return;
                              }
                              setBroadcastTime(newBroadcastTimeStart);
                            }}
                            required
                            minTime={
                              index > 0
                                ? formatTime(broadcastTime[index - 1].endTime!)
                                : ""
                            }
                          />
                          {sourceSelected?.id !== FILE_SOURCE_ID && (
                            <TimePicker
                              name="endTime"
                              label="Thời điểm kết thúc"
                              placeholder="HH:MM:SS"
                              minTime={formatTime(
                                broadcastTime[index].startTime!,
                              )}
                              onTimeChange={time => {
                                const newTime = timeEnd.map(
                                  (item, indexTime) => {
                                    if (indexTime === index)
                                      return calSecondFromDateTime(time);
                                    return item;
                                  },
                                );
                                const newBroadcastTime = broadcastTime.map(
                                  (item: any, indexBroadcastTime: number) => {
                                    if (indexBroadcastTime === index)
                                      return { ...item, endTime: time };
                                    return item;
                                  },
                                );
                                setBroadcastTime(newBroadcastTime);
                                setTimeEnd(newTime);
                              }}
                              disabled={timeStart[index] ? false : true}
                              required
                            />
                          )}
                        </div>
                        {index > 0 && (
                          <ButtonRemove
                            type="button"
                            variant="secondary"
                            onClick={() => {
                              const copyAndDelete = (
                                array: any,
                                index: number,
                              ) => {
                                const copyArray = [...array];
                                copyArray.splice(index, 1);
                                return copyArray;
                              };
                              setBroadcastTime(
                                copyAndDelete(broadcastTime, index),
                              );
                              setTimeStart(copyAndDelete(timeStart, index));
                              setTimeEnd(copyAndDelete(timeEnd, index));
                              formik.setFieldValue(
                                "startTime",
                                formatTime(broadcastTime[index - 1].startTime!),
                              );
                              formik.setFieldValue(
                                "endTime",
                                formatTime(broadcastTime[index - 1].endTime!),
                              );
                            }}
                          >
                            <SVG
                              name="product/clear-all"
                              width={20}
                              height={20}
                            />
                          </ButtonRemove>
                        )}
                      </div>
                    );
                  })}

                  <ButtonAddTime
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setBroadcastTime([
                        ...broadcastTime,
                        { startTime: null, endTime: null },
                      ]);
                      setTimeStart([...timeStart, null]);
                      setTimeEnd([...timeEnd, null]);
                      formik.setFieldValue("startTime", "");
                      formik.setFieldValue("endTime", "");
                    }}
                    className="w-full"
                    disabled={(() => {
                      if (timeStart.includes(null) || timeEnd.includes(null))
                        return true;
                      return false;
                    })()}
                  >
                    <SVG name="product/add-row" />
                    Thêm thời gian phát
                  </ButtonAddTime>
                  <Select
                    name="repeatType"
                    label="Kiểu lịch"
                    optionSelected={selectedRepeatType}
                    options={repeatType}
                    onSelect={value => {
                      if (value.id === "once") {
                        formik.setFieldValue("repeatDate", "SELECTED");
                        if (formik.values.startDay) {
                          const theNextDay = new Date(formik.values.startDay!);
                          formik.setFieldValue(
                            "endDay",
                            String(getTheNextDay(theNextDay)),
                          );
                        }
                      } else {
                        formik.setFieldValue("endDay", "");
                      }
                      setSelectedRepeatType(value);
                    }}
                    placeholder="Chọn kiểu lịch"
                    required
                  />
                  {selectedRepeatType && selectedRepeatType.id !== "once" && (
                    <MultipleSelect
                      name="repeatDate"
                      label="Ngày lặp lại"
                      listOptionsSelected={selectedRepeatDate}
                      options={
                        selectedRepeatType.id === "weekly"
                          ? optionWeek
                          : optionMonth()
                      }
                      onSelect={value => setSelectedRepeatDate(value)}
                      placeholder="Chọn thứ trong tuần"
                      required
                    />
                  )}
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
