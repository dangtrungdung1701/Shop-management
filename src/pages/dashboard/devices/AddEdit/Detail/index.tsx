import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Formik, FormikProps, FormikValues } from "formik";

import axiosClient from "common/utils/api";
import { PATH } from "common/constants/routes";
import {
  CLASS_LIST,
  CLASS_LIST_OF_DISTRICT,
  INVALID_LOCATION_ID,
} from "common/constants/user";
import { DISTRICT_ID, PROVINCE_ID, WARD_ID } from "common/constants/region";

import AlertDialog from "components/AlertDialog";

import VolumeSlider from "designs/Slider";
import Checkbox from "designs/Checkbox";
import Input from "designs/Input";
import TextArea from "designs/TextArea";
import DatePicker from "designs/DatePicker";
import Select from "designs/Select";

import TableLayout from "layouts/Table";

import { useBreadcrumb } from "hooks/useBreadcrumb";
import useGetLocation from "hooks/useGetLocation";

import { IDevice, IDeviceInput, IRegion } from "typings";

import useStore from "zustand/store";

import {
  Title,
  TopWrapper,
  BottomWrapper,
  FormLeftWrapper,
  Form,
  ButtonWrapper,
  Button,
  FormRightWrapper,
  NoteWrapper,
} from "./styles";

interface IFormValue {
  iMei?: string;
  name?: string;
  long?: number;
  lat?: number;
  class?: string;
  province?: string;
  district?: string;
  ward?: string;
  phoneNumber?: string;
  startDay?: string;
  endDay?: string;
  address?: string;
  description?: string;
  dayLeft?: number;
}

interface IDetailsProps {
  editField: IDevice;
  level: string;
}

const Details: React.FC<IDetailsProps> = props => {
  const { children, editField, level } = props;
  const { currentUser } = useStore();

  const history = useHistory();

  const [volume, setVolume] = useState<number | number[]>(
    editField?.volume || 100,
  );
  const [isFixed, setIsFixed] = useState(editField?.isFixedVolume || false);

  const [loading, setLoading] = useState(false);

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
  const [selectedClass, setSelectedClass] = useState<any | null>({});

  const [initialValues, setInitialValues] = useState<IFormValue>({
    iMei: "",
    name: "",
    long: undefined,
    lat: undefined,
    class: "",
    province: "",
    district: "",
    ward: "",
    phoneNumber: "",
    startDay: "",
    endDay: "",
    address: "",
    description: "",
    dayLeft: undefined,
  });
  console.log(initialValues);
  useBreadcrumb([
    {
      name: "Quản lý thiết bị",
      href: "#",
    },
    {
      name: "Cấu hình",
      href: PATH.DEVICE.EDIT_DEVICE,
    },
  ]);

  useEffect(() => {
    if (editField) {
      setInitialValues({
        iMei: editField?.id,
        name: editField?.displayName,
        long: editField?.location?.longitude,
        lat: editField?.location?.longitude,
        phoneNumber: editField?.sim?.number,
        address: editField?.location?.locationDescription,
        description: editField?.note,
        startDay: dayjs.unix(editField.sim?.startDate as number).format(),
        endDay: dayjs.unix(editField.sim?.endDate as number).format(),
        dayLeft: getDayLeft(editField.sim?.endDate as number),
        class: "SELECTED",
        province: "SELECTED",
        district: "SELECTED",
        ward: "SELECTED",
      });
      setVolume(editField?.volume!);
      setIsFixed(editField?.isFixedVolume!);
      setSelectedClass(
        CLASS_LIST.filter(item => item.id === editField?.region?.levelId)[0],
      );
      getProvinceListService();
      if (editField?.region?.levelId === 3) {
        getDistrictListService(editField?.region?.provinceId!);
      }
      if (editField?.region?.levelId === 4) {
        getDistrictListService(editField?.region?.provinceId!);
        getWardListService(editField?.region?.districtId!);
      }
    }
  }, [editField]);

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

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      iMei: yup.string().required("Vui lòng nhập tên tài khoản").trim(),
      name: yup.string().required("Vui lòng nhập tên hiển thị").trim(),
      class: yup.string().required("Vui lòng chọn phân cấp"),
      province: yup.string().required("Vui lòng chọn tỉnh/ thành phố"),
      district: yup.string().required("Vui lòng chọn quận/ huyện/ thị xã"),
      ward: yup.string().required("Vui lòng chọn phường/ xã/ thị trấn"),
      endDay: yup
        .date()
        .when(
          "startDay",
          (startDay, schema) =>
            startDay &&
            schema.min(
              startDay,
              "Vui lòng chọn ngày kết thúc muộn hơn ngày bắt đầu!",
            ),
        ),
    });

  const handleSubmit = async (value: FormikValues) => {
    const regionId = selectedWard
      ? selectedWard?.id
      : selectedDistrict
      ? selectedDistrict?.id
      : selectedProvince
      ? selectedProvince?.id
      : 1;
    const input: IDeviceInput = {
      id: value?.iMei,
      regionId: regionId,
      displayName: value?.name,
      volume: volume as number,
      isFixedVolume: isFixed,
      location: {
        locationDescription: value?.address,
        longitude: value?.long,
        latitude: value?.lat,
      },
      note: value?.description,
      sim: {
        ...(value.startDay && {
          startDate: dayjs(value.startDay).unix(),
        }),
        ...(value.endDay && {
          endDate: dayjs(value.endDay).unix(),
        }),
        number: value?.phoneNumber,
      },
    };
    try {
      setLoading(true);
      const payload: any = {
        ...input,
      };
      const res = await axiosClient.put(`/Device/${editField?.id}`, payload);
      if (res) {
        toast.dark("Cập nhật thiết bị thành công !", {
          type: toast.TYPE.SUCCESS,
        });
      }
    } catch (error) {
      console.log(error);
      toast.dark("Cập nhật thiết bị không thành công !", {
        type: toast.TYPE.ERROR,
      });
    } finally {
      setLoading(false);
      handleBack();
    }
  };

  const handleBack = () => {
    switch (level) {
      case "province":
        history.push(PATH.DEVICE.PROVINCE);
        break;
      case "district":
        history.push(PATH.DEVICE.DISTRICT);
        break;
      case "ward":
        history.push(PATH.DEVICE.WARD);
        break;
      default:
        break;
    }
  };

  const handleRestart = async (onClose: () => void) => {
    await setTimeout(() => {
      onClose && onClose();
    }, 1000);
  };

  const getDayLeft = (endDate: number | Date) => {
    const startDay = new Date();
    let endDay: Date;
    if (typeof endDate === "number") {
      endDay = new Date(dayjs.unix(endDate).format());
    } else {
      endDay = endDate;
    }
    const timeLeft = endDay.getTime() - startDay.getTime();
    const dayLeft = timeLeft / 86400000 > 0 ? timeLeft / 86400000 : 0;
    return Math.round(dayLeft);
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
          : editField?.region?.districtId !== INVALID_LOCATION_ID &&
            getWardListService(editField?.region?.districtId!);
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
      <Title>Cấu hình thiết bị</Title>
      <TopWrapper>
        <VolumeSlider
          initValue={volume}
          title="Âm lượng"
          onChange={value => setVolume(value)}
        />
        <Checkbox
          initialCheck={isFixed}
          label="Cố định"
          onChange={checked => setIsFixed(checked)}
        />
      </TopWrapper>

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
                    name="iMei"
                    label="Mã thiết bị (IMEI)"
                    placeholder="Nhập mã thiết bị"
                    type="text"
                    disabled={initialValues.iMei !== "" ? true : false}
                    required={initialValues.iMei === "" ? true : false}
                  />
                  <Input
                    name="long"
                    label="Kinh độ"
                    placeholder="Nhập kinh độ"
                    type="text"
                  />
                  <Input
                    name="lat"
                    label="Vĩ độ"
                    placeholder="Nhập vĩ độ"
                    type="text"
                  />
                  <Input
                    name="phoneNumber"
                    label="Số thuê bao"
                    placeholder="Nhập số thuê bao"
                    type="text"
                  />
                  <DatePicker label="Ngày bắt đầu gói cước" name="startDay" />
                  <DatePicker
                    minimumDate={new Date(formik.values.startDay || "")}
                    label="Ngày kết thúc gói cước"
                    name="endDay"
                    onDateChange={newDate => {
                      formik.setFieldValue("dayLeft", getDayLeft(newDate));
                    }}
                  />
                  {formik.values.startDay &&
                    formik.values.endDay &&
                    !formik.errors.endDay && (
                      <Input
                        disabled={true}
                        name="dayLeft"
                        label="Số ngày còn lại"
                        type="text"
                      />
                    )}
                </FormLeftWrapper>
                <FormRightWrapper>
                  <Input
                    name="name"
                    label="Tên thiết bị"
                    placeholder="Nhập tên thiết bị"
                    type="text"
                    required
                  />

                  <Select
                    name="class"
                    label="Cấp sở hữu"
                    optionSelected={selectedClass}
                    options={
                      currentUser?.userInfo?.region?.levelId === PROVINCE_ID
                        ? CLASS_LIST
                        : CLASS_LIST_OF_DISTRICT
                    }
                    onSelect={value => {
                      setFieldValue(value, formik);
                      setSelectedClass(value);
                    }}
                    placeholder="Chọn phân cấp"
                    required
                    disabled={
                      currentUser?.userInfo?.region?.levelId === WARD_ID
                        ? true
                        : false
                    }
                  />

                  {selectedClass?.id === PROVINCE_ID && selectedProvince && (
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
                  {selectedClass?.id === DISTRICT_ID && (
                    <>
                      {selectedProvince && (
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
                      <Select
                        name="district"
                        label="Tên quận/ huyện/ thị xã"
                        optionSelected={selectedDistrict}
                        options={districtList}
                        onSelect={value => setSelectedDistrict(value)}
                        placeholder="Chọn quận/ huyện/ thị xã"
                        disabled={
                          currentUser?.userInfo?.region?.levelId > PROVINCE_ID
                            ? true
                            : false
                        }
                        required
                        optionTarget="displayName"
                      />
                    </>
                  )}
                  {selectedClass?.id === WARD_ID && (
                    <>
                      {selectedProvince && (
                        <Select
                          name="province"
                          label="Tên tỉnh/ thành phố"
                          optionSelected={selectedProvince}
                          options={provinceList}
                          onSelect={value => setSelectedProvince(value)}
                          placeholder="Chọn tỉnh/ thành phố"
                          required
                          optionTarget="displayName"
                          disabled
                        />
                      )}
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
                          currentUser?.userInfo?.region?.levelId > PROVINCE_ID
                            ? true
                            : false
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
                        disabled={
                          currentUser?.userInfo?.region?.levelId === WARD_ID
                            ? true
                            : selectedDistrict
                            ? false
                            : true
                        }
                        required
                        optionTarget="displayName"
                      />
                    </>
                  )}
                  <Input
                    name="address"
                    label="Mô tả vị trí"
                    placeholder="Nhập vị trí cụ thể"
                    type="text"
                  />
                </FormRightWrapper>
              </BottomWrapper>
              <NoteWrapper>
                <TextArea
                  name="description"
                  label="Ghi chú"
                  placeholder="Nhập ghi chú"
                />
              </NoteWrapper>
              <ButtonWrapper>
                {editField?.id && (
                  <AlertDialog
                    title="Khởi động lại"
                    message="Bạn có chắc chắn muốn khởi động lại thiết bị này?"
                    ButtonMenu={
                      <Button variant="blue" className="w-full">
                        Khởi động lại
                      </Button>
                    }
                    onConfirm={onClose => handleRestart(onClose)}
                  />
                )}
                <div className="flex flex-row gap-1 w-full phone:w-auto">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                    className="w-full"
                  >
                    Quay lại
                  </Button>
                  <Button loading={loading} type="submit">
                    Lưu
                  </Button>
                </div>
              </ButtonWrapper>
            </Form>
          );
        }}
      </Formik>
    </TableLayout>
  );
};

export default Details;
