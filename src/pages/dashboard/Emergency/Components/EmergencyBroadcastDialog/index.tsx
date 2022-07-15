import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps, useHistory, useParams } from "react-router";
import * as yup from "yup";
import { Formik, FormikProps, FormikValues } from "formik";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import AudioPlayer from "material-ui-audio-player";
import ReactHlsPlayer from "react-hls-player/dist";

import { PATH } from "common/constants/routes";
import {
  FILE_SOURCE_ID,
  FM_SOURCE_ID,
  ISourceOption,
  LINK_SOURCE_ID,
  MIC_SOURCE_ID,
  optionSource,
} from "common/constants/source";
import axiosClient from "common/utils/api";

import {
  CLASS_LIST,
  CLASS_LIST_OF_DISTRICT,
  CLASS_LIST_OF_WARD,
  ILevelOption,
} from "common/constants/user";
import { DISTRICT_ID, PROVINCE_ID, WARD_ID } from "common/constants/region";
import {
  calDateFromSecond,
  calSecondFromDateTime,
  calSecondFromTimeString,
  formatTime,
} from "common/functions";

import Input from "designs/Input";
import MultipleSelect from "designs/MultipleSelect";
import Select from "designs/Select";
import DatePicker from "designs/DatePicker";
import TimePicker from "designs/TimePicker";
import VolumeSlider from "designs/Slider";

import TableLayout from "layouts/Table";

import useGetLocation from "hooks/useGetLocation";
import { useBreadcrumb } from "hooks/useBreadcrumb";

import {
  IDevice,
  IEmergencyProgramInput,
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
  AudioWrapper,
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
  repeatTime?: number;
}

const EmergencyBroadcastDialog: React.FC<IConfigureScheduleProps> = ({
  location,
}) => {
  const params: IParams = useParams();
  const history = useHistory();

  const { currentUser, setDuplicateList, setDuplicateDialog } = useStore();

  const [loading, setLoading] = useState(false);

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
  const [selectedLevel, setSelectedLevel] = useState<ILevelOption | null>(null);

  const [listDeviceSelected, setListDeviceSelected] = useState<IDevice[]>([]);
  const [fileSelected, setFileSelected] = useState<
    IFileAudio | ILink | IFM | null
  >(null);

  const [options, setOptions] = useState<IFileAudio[] | ILink[] | IFM[]>([]);
  const [sourceSelected, setSourceSelected] = useState<ISourceOption | null>(
    null,
  );

  const [timeStart, setTimeStart] = useState<Date | null>(null);
  const [timeEnd, setTimeEnd] = useState<Date | null>(null);

  const [loop, setLoop] = useState<number>();

  const [volume, setVolume] = useState<number>(100);

  const [initialValues] = useState<IFormValue>({
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
    repeatTime: 1,
  });

  const playerRef = useRef<any>(null);

  useBreadcrumb([
    {
      name: "Quản lý khẩn cấp",
      href: "#",
    },
    {
      name: "Phát khẩn cấp",
      href: PATH.EMERGENCY.EMERGENCY_BROADCAST,
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
      repeatTime: yup.number().required("Vui lòng chọn số lần lặp"),
    });

  useEffect(() => {
    getProvinceListService();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStart(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timer: any;
    if (sourceSelected?.id === FILE_SOURCE_ID) {
      if (fileSelected) {
        const hms = (fileSelected as any).duration?.split(":");
        timer = setInterval(() => {
          if (hms) {
            const seconds = +hms[0] * 60 * 60 + +hms[1] * 60 + +hms[2];
            const endTime = dayjs().unix() + seconds * +loop!;
            setTimeEnd(new Date(endTime * 1000));
          }
        }, 1000);
      }
    }
    return () => clearInterval(timer);
  }, [fileSelected, loop]);

  // get device options
  useEffect(() => {
    if (selectedWard || selectedDistrict || selectedProvince) {
      getAllDeviceService();
    }
  }, [selectedProvince, selectedDistrict, selectedWard]);

  // get region option
  const getProvinceListService = async () => {
    try {
      const res: any = await axiosClient.get("Region", {
        params: { level: PROVINCE_ID },
      });
      if (res) {
        setProvinceList(res.regions);
        setSelectedProvince(
          useGetLocation(
            currentUser?.userInfo?.region?.provinceId,
            res.regions,
          ),
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
  //

  const getAllDeviceService = async () => {
    const regionId = selectedWard
      ? selectedWard?.id
      : selectedDistrict
      ? selectedDistrict?.id
      : selectedProvince
      ? selectedProvince?.id
      : undefined;
    try {
      const payload: any = {
        mediaStatusCodes: [0, 1, 2],
        regionId,
      };
      const response: any = await axiosClient.get("/Device", {
        params: payload,
      });
      if (response) {
        setListDevices(response.devices);
      }
    } catch (error) {
      console.log(error);
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
      case FILE_SOURCE_ID:
        getAllFileService();
        break;
      case LINK_SOURCE_ID:
        getAllLinkService();
        break;
      case FM_SOURCE_ID:
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
    let audioTime = 0;
    if (fileSelected) {
      const hms = (fileSelected as any).duration?.split(":");
      if (hms) {
        audioTime = +hms[0] * 60 * 60 + +hms[1] * 60 + +hms[2];
      }
    }

    let endTime =
      sourceSelected?.id === FILE_SOURCE_ID
        ? dayjs(timeStart).unix() + audioTime * value?.repeatTime
        : new Date(value?.endDay).setHours(
            dayjs(timeEnd).get("hour"),
            dayjs(timeEnd).get("minute"),
            dayjs(timeEnd).get("second"),
          ) / 1000;
    const input: IEmergencyProgramInput = {
      displayName: value?.name,
      deviceIds: listDeviceSelected?.map(device => device?.id),
      sourceType: Number(sourceSelected?.id),
      audioSourceId: fileSelected?.id,
      fileLoopCount: value?.repeatTime,
      startTime: dayjs(timeStart).unix(),
      endTime,
      volume,
      regionId,
    };
    try {
      setLoading(true);
      const res = await axiosClient.post("/EmergencyProgram", input);
      if (res) {
        toast.dark("Phát khẩn cấp thành công!", {
          type: toast.TYPE.SUCCESS,
        });
      }
    } catch (err: any) {
      if (err?.response.status === 409) {
        toast.dark(
          "Các chương trình đã tạo trước đó trùng về mặt thời gian, thiết bị với chương trình mới",
          {
            type: toast.TYPE.ERROR,
          },
        );
        setDuplicateDialog(true);
        setDuplicateList(err?.response.data.emergencyPrograms);
      } else {
        toast.dark("Phát khẩn cấp không thành công!", {
          type: toast.TYPE.ERROR,
        });
      }
    } finally {
      setLoading(false);
      handleBack();
    }
  };

  const handleBack = () => {
    history.push(PATH.EMERGENCY.SELF);
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
        !ward && district && getWardListService(district?.id!);
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
      <Title>Phát khẩn cấp</Title>

      <Formik
        initialValues={initialValues}
        enableReinitialize
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
                    label="Tên chương trình"
                    placeholder="Nhập tên chương trình"
                    type="text"
                    required
                  />
                  <Select
                    name="level"
                    label="Phân cấp"
                    optionSelected={selectedLevel}
                    options={
                      currentUser?.userInfo?.region?.levelId === PROVINCE_ID
                        ? CLASS_LIST
                        : currentUser?.userInfo?.region?.levelId === DISTRICT_ID
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
                  {selectedLevel?.id === PROVINCE_ID && (
                    <Select
                      name="province"
                      label="Tên tỉnh/thành phố"
                      optionSelected={selectedProvince}
                      options={provinceList}
                      onSelect={value => setSelectedProvince(value)}
                      placeholder="Chọn tỉnh/thành phố"
                      required
                      optionTarget="displayName"
                      disabled
                    />
                  )}
                  {selectedLevel?.id === DISTRICT_ID && (
                    <>
                      <Select
                        name="province"
                        label="Tên tỉnh/thành phố"
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
                        label="Tên quận/huyện/thị xã"
                        optionSelected={selectedDistrict}
                        options={districtList}
                        onSelect={value => {
                          setSelectedDistrict(value);
                        }}
                        placeholder="Chọn quận/huyện/thị xã"
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
                  {selectedLevel?.id === WARD_ID && (
                    <>
                      <Select
                        name="province"
                        label="Tên tỉnh/thành phố"
                        optionSelected={selectedProvince}
                        options={provinceList}
                        onSelect={value => {
                          getDistrictListService(value?.id!);
                          setSelectedDistrict(null);
                          setSelectedWard(null);
                          setSelectedProvince(value);
                        }}
                        placeholder="Chọn tỉnh/thành phố"
                        required
                        optionTarget="displayName"
                        disabled
                      />
                      <Select
                        name="district"
                        label="Tên quận/huyện/thị xã"
                        optionSelected={selectedDistrict}
                        options={districtList}
                        onSelect={value => {
                          getWardListService(value?.id!);
                          setSelectedWard(null);
                          setSelectedDistrict(value);
                        }}
                        placeholder="Chọn quận/huyện/thị xã"
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
                        label="Tên phường/xã/thị trấn"
                        optionSelected={selectedWard}
                        options={wardList}
                        onSelect={value => setSelectedWard(value)}
                        placeholder="Chọn phường/xã/thị trấn"
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
                </FormLeftWrapper>
                <FormRightWrapper>
                  <Select
                    name="sources"
                    label="Nguồn phát"
                    optionSelected={sourceSelected}
                    options={optionSource}
                    onSelect={value => {
                      setSourceSelected(value);
                      setFileSelected(null);
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
                      onSelect={value => {
                        setFileSelected(value);
                      }}
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
                      onKeyDown={e => {
                        if (e.key === ".") {
                          e.preventDefault();
                        }
                      }}
                      onChangeValue={value => {
                        setLoop(value as number);
                      }}
                      disabled={
                        sourceSelected?.id === FILE_SOURCE_ID ? false : true
                      }
                    />
                  )}
                  <DatePicker label="Ngày bắt đầu" name="startDay" required />
                  <DatePicker
                    minimumDate={new Date(formik.values.startDay || "")}
                    label="Ngày kết thúc"
                    name="endDay"
                    required
                    disabled={formik.values.startDay ? false : true}
                  />

                  <TimePicker
                    name="startTime"
                    label="Thời điểm bắt đầu"
                    initValue={timeStart as Date}
                    placeholder="HH:MM:SS"
                    disabled
                    required
                  />
                  <TimePicker
                    name="endTime"
                    label="Thời điểm kết thúc"
                    placeholder="HH:MM:SS"
                    minTime={formik.values.startTime}
                    onTimeChange={time => setTimeEnd(time)}
                    disabled={
                      !timeStart || sourceSelected?.id === FILE_SOURCE_ID
                    }
                    initValue={
                      sourceSelected?.id === FILE_SOURCE_ID
                        ? (timeEnd as Date)
                        : null
                    }
                    required
                  />
                </FormRightWrapper>
              </BottomWrapper>
              <AudioWrapper>
                <VolumeSlider
                  title="Âm lượng"
                  initValue={volume}
                  onChange={value => setVolume(value)}
                />
                {fileSelected &&
                  (fileSelected as any)?.url &&
                  (() => {
                    if (sourceSelected?.id === LINK_SOURCE_ID) {
                      if ((fileSelected as any)?.url.includes(".m3u8")) {
                        return (
                          <div className="custom-hls-player">
                            <ReactHlsPlayer
                              src={(fileSelected as any)?.url}
                              autoPlay={false}
                              controls={true}
                              width="100%"
                              height={100}
                              playerRef={playerRef}
                            />
                          </div>
                        );
                      }
                      if ((fileSelected as any)?.url.includes(".mp3")) {
                        return (
                          <div className="custom-audio-player">
                            <AudioPlayer
                              elevation={1}
                              width="100%"
                              variation="primary"
                              debug={false}
                              src={(fileSelected as any)?.url}
                            />
                          </div>
                        );
                      }
                      return <div>Chưa hỗ trợ định dạng audio này</div>;
                    }
                    return (
                      <div className="custom-audio-player">
                        <AudioPlayer
                          elevation={1}
                          width="100%"
                          variation="primary"
                          debug={false}
                          src={(fileSelected as any)?.url}
                        />
                      </div>
                    );
                  })()}
              </AudioWrapper>
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

export default EmergencyBroadcastDialog;
