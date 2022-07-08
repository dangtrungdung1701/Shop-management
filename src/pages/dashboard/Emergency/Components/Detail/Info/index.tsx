import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { PATH } from "common/constants/routes";

import { Formik, FormikValues } from "formik";

import { useBreadcrumb } from "hooks/useBreadcrumb";
import useGetLocation from "hooks/useGetLocation";

import TableLayout from "layouts/Table";

import TimePicker from "designs/TimePicker";
import VolumeSlider from "designs/Slider";
import Input from "designs/Input";
import Select from "designs/Select";
import DatePicker from "designs/DatePicker";

import {
  FILE_SOURCE_ID,
  ISourceOption,
  MIC_SOURCE_ID,
  optionSource,
} from "common/constants/source";
import axiosClient from "common/utils/api";

import { IFileAudio, IEmergencyPrograms, IFM, ILink, IRegion } from "typings";

import {
  Button,
  ButtonWrapper,
  Form,
  FormLeftWrapper,
  FormRightWrapper,
  FormTopWrapper,
} from "./styles";
import { CLASS_LIST, ILevelOption } from "common/constants/user";
import { DISTRICT_ID, PROVINCE_ID, WARD_ID } from "common/constants/region";

interface IFormValue {
  name?: string;
  device?: string;
  source?: string;
  file?: string;
  level?: string;
  province?: string;
  ward?: string;
  district?: string;
  loop?: number;
  startDay?: string;
  endDay?: string;
  startTime?: string;
  endTime?: string;
  createByUser?: string;
  status?: string;
}

interface IInfoProps {
  editField?: IEmergencyPrograms;
  type?: string;
}

enum MediaStatus {
  Broadcasting = 1,
  Ended = 2,
  Canceled = 3,
}

const Info: React.FC<IInfoProps> = ({ editField, type }) => {
  const history = useHistory();

  const [volume, setVolume] = useState<number | undefined>(100);

  const [sourceSelected, setSourceSelected] = useState<ISourceOption | null>(
    null,
  );
  const [fileSelected, setFileSelected] = useState<
    IFileAudio | ILink | IFM | null
  >(null);
  const [options, setOptions] = useState<IFileAudio[] | ILink[] | IFM[]>([]);

  const [timeStart, setTimeStart] = useState<Date | null>(null);
  const [timeEnd, setTimeEnd] = useState<Date | null>(null);

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

  const [initialValues, setInitialValues] = useState<IFormValue>({
    name: "",
    device: "",
    source: "",
    file: "",
    province: "",
    district: "",
    ward: "",
    level: "",
    startDay: "",
    endDay: "",
    startTime: "",
    endTime: "",
    createByUser: "",
    status: "",
    loop: 1,
  });

  useBreadcrumb([
    {
      name: "Khẩn cấp",
      href: "#",
    },
    {
      name: "Chi tiết chương trình",
      href: PATH.EMERGENCY.DETAIL,
    },
  ]);

  useEffect(() => {
    getProvinceListService();
    if (editField) {
      setInitialValues({
        name: editField.displayName,
        startDay: dayjs.unix(editField.startTime).format(),
        endDay: dayjs.unix(editField.endTime).format(),
        loop: editField.fileLoopCount,
        createByUser: editField.createdByUser.displayName,
        status: handleEmergencyStatus(editField.status),
      });
      setTimeStart(new Date(editField.startTime * 1000));
      setTimeEnd(new Date(editField.endTime * 1000));
      setVolume(editField.volume);
      setSourceSelected(
        optionSource.filter(
          item => Number(item.id) === editField?.sourceType,
        )[0],
      );
      setSelectedLevel(
        CLASS_LIST.filter(item => item.id === editField?.region?.levelId)[0],
      );
      if (editField?.region?.levelId === 3) {
        getDistrictListService(editField?.region?.provinceId!);
      }
      if (editField?.region?.levelId === 4) {
        getDistrictListService(editField?.region?.provinceId!);
        getWardListService(editField?.region?.districtId!);
      }
    }
  }, [editField]);

  const handleEmergencyStatus = (status: number) => {
    switch (true) {
      case status === MediaStatus.Broadcasting:
        return "Đang phát";
      case status === MediaStatus.Ended:
        return "Đã phát";
      default:
        return "Đã hủy";
    }
  };

  const getProvinceListService = async () => {
    try {
      const res: any = await axiosClient.get("Region", {
        params: { level: 2 },
      });
      if (res) {
        setProvinceList(res.regions);
        setSelectedProvince(
          useGetLocation(editField?.region?.provinceId!, res.regions),
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
          useGetLocation(editField?.region?.districtId!, res.regions),
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
        setSelectedWard(
          useGetLocation(editField?.region?.wardId!, res.regions),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (value: FormikValues) => {};

  const handleBack = () => {
    history.push(PATH.EMERGENCY.SELF);
  };

  return (
    <TableLayout title="Chi tiết chương trình">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {formik => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <FormTopWrapper>
                <FormLeftWrapper>
                  <Input
                    name="name"
                    label="Tên chương trình"
                    placeholder="Nhập tên chương trình"
                    type="text"
                    disabled
                  />
                  <Select
                    name="level"
                    label="Phân cấp"
                    optionSelected={selectedLevel}
                    options={CLASS_LIST}
                    placeholder="Chọn phân cấp"
                    disabled
                    onSelect={value => {
                      setSelectedLevel(value);
                    }}
                  />
                  {selectedLevel?.id === PROVINCE_ID && (
                    <Select
                      name="province"
                      label="Tên tỉnh/ thành phố"
                      optionSelected={selectedProvince}
                      options={provinceList}
                      placeholder="Chọn tỉnh/thành phố"
                      optionTarget="displayName"
                      disabled
                      onSelect={value => {
                        setSelectedProvince(value);
                      }}
                    />
                  )}
                  {selectedLevel?.id === DISTRICT_ID && (
                    <>
                      <Select
                        name="province"
                        label="Tên tỉnh/ thành phố"
                        optionSelected={selectedProvince}
                        options={provinceList}
                        placeholder="Chọn tỉnh/thành phố"
                        optionTarget="displayName"
                        disabled
                        onSelect={value => {
                          setSelectedProvince(value);
                        }}
                      />
                      <Select
                        name="district"
                        label="Tên quận/ huyện/ thị xã"
                        optionSelected={selectedDistrict}
                        options={districtList}
                        placeholder="Chọn quận/ huyện/ thị xã"
                        disabled
                        optionTarget="displayName"
                        onSelect={value => {
                          setSelectedDistrict(value);
                        }}
                      />
                    </>
                  )}
                  {selectedLevel?.id === WARD_ID && (
                    <>
                      <Select
                        name="province"
                        label="Tên tỉnh/ thành phố"
                        optionSelected={selectedProvince}
                        options={provinceList}
                        placeholder="Chọn tỉnh/ thành phố"
                        optionTarget="displayName"
                        disabled
                        onSelect={value => {
                          setSelectedProvince(value);
                        }}
                      />
                      <Select
                        name="district"
                        label="Tên quận/ huyện/ thị xã"
                        optionSelected={selectedDistrict}
                        options={districtList}
                        placeholder="Chọn quận/ huyện/ thị xã"
                        disabled
                        optionTarget="displayName"
                        onSelect={value => {
                          setSelectedDistrict(value);
                        }}
                      />
                      <Select
                        name="ward"
                        label="Tên phường/ xã/ thị trấn"
                        optionSelected={selectedWard}
                        options={wardList}
                        placeholder="Chọn phường/ xã/ thị trấn"
                        optionTarget="displayName"
                        disabled
                        onSelect={value => {
                          setSelectedWard(value);
                        }}
                      />
                    </>
                  )}
                  <Input
                    name="createByUser"
                    label="Người tạo"
                    placeholder="Người tạo"
                    type="text"
                    disabled
                  />
                  <Input
                    name="status"
                    label="Trạng thái"
                    placeholder="Trạng thái"
                    type="text"
                    disabled
                  />
                </FormLeftWrapper>
                <FormRightWrapper>
                  <Select
                    name="source"
                    label="Nguồn phát"
                    optionSelected={sourceSelected}
                    options={optionSource}
                    className="border rounded border-neutral-4"
                    placeholder="Chọn nguồn phát"
                    optionTarget="displayName"
                    disabled
                    onSelect={value => {
                      setSourceSelected(value);
                    }}
                  />
                  {sourceSelected?.id !== MIC_SOURCE_ID && (
                    <Select
                      name="file"
                      label="Nguồn phát tương ứng"
                      optionSelected={fileSelected}
                      options={options}
                      className="border rounded border-neutral-4"
                      placeholder="Chọn nguồn phát tương ứng"
                      disabled
                      optionTarget="displayName"
                      onSelect={value => {
                        setFileSelected(value);
                      }}
                    />
                  )}

                  {sourceSelected?.id === FILE_SOURCE_ID && (
                    <Input
                      name="loop"
                      label="Số lần lặp"
                      placeholder="Nhập số lần lặp"
                      type="number"
                      disabled
                    />
                  )}

                  <DatePicker label="Ngày bắt đầu" name="startDay" disabled />
                  <DatePicker label="Ngày kết thúc" name="endDay" disabled />
                  <TimePicker
                    name="startTime"
                    initValue={timeStart!}
                    label="Thời điểm bắt đầu"
                    placeholder="HH:MM:SS"
                    disabled
                  />
                  <TimePicker
                    name="endTime"
                    initValue={timeEnd!}
                    label="Thời điểm kết thúc"
                    placeholder="HH:MM:SS"
                    disabled
                  />
                  <VolumeSlider
                    initValue={volume as number}
                    title="Âm lượng"
                    className="pointer-events-none max-w-full"
                  />
                </FormRightWrapper>
              </FormTopWrapper>
              <ButtonWrapper>
                <Button type="button" variant="secondary" onClick={handleBack}>
                  Quay lại
                </Button>
              </ButtonWrapper>
            </Form>
          );
        }}
      </Formik>
    </TableLayout>
  );
};

export default Info;
