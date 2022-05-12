import React, { useMemo, useState, lazy, useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { usePage } from "hooks/usePage";
import { useLoading } from "hooks/useLoading";
import { useBreadcrumb } from "hooks/useBreadcrumb";

import SearchBoxTable from "components/SearchBoxTable";
import Table, { IColumns } from "designs/Table";
import ActionButtons from "designs/ActionButtons";
import TableLayout from "layouts/Table";
import * as yup from "yup";

import { PATH } from "common/constants/routes";
import { getQueryFromLocation } from "common/functions";
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

import VolumnSlider from "designs/Slider";
import Checkbox from "designs/Checkbox";
import Input from "designs/Input";
import TextArea from "designs/TextArea";
import DatePicker from "designs/DatePicker";
import Select from "designs/Select";

import { IRegion } from "typings";
import { Formik, FormikProps, FormikValues } from "formik";
import AlertDialog from "components/AlertDialog";

interface IFormValue {
  iMei?: string;
  name?: string;
  long?: string;
  lat?: string;
  class?: string;
  province?: string;
  district?: string;
  ward?: string;
  phoneNumber?: string;
  startDay?: string;
  endDay?: string;
  address?: string;
  description?: string;
}

interface IDetailsProps {
  editField?: any;
  id?: string;
}

const Details: React.FC<IDetailsProps> = ({ id }) => {
  const history = useHistory();

  const [volume, setVolume] = useState<number | number[]>(100);
  const [isFixed, setIsFixed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<IRegion | null>(
    null,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<IRegion | null>(
    null,
  );
  const [selectedWard, setSelectedWard] = useState<IRegion | null>(null);
  const [selectedClass, setSelectedClass] = useState<any | null>({});

  const [initialValues, setInitialValues] = useState<IFormValue>({
    iMei: "abc",
    name: "",
    long: "",
    lat: "",
    class: "",
    province: "",
    district: "",
    ward: "",
    phoneNumber: "",
    startDay: "",
    endDay: "",
    address: "",
    description: "",
  });

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
    if (id) {
      setInitialValues({
        iMei: listDevice?.[parseInt(id) - 1].iMei,
        name: listDevice?.[parseInt(id) - 1].name,
        long: listDevice?.[parseInt(id) - 1].long,
        lat: listDevice?.[parseInt(id) - 1].lat,
        phoneNumber: listDevice?.[parseInt(id) - 1].phoneNumber,
        address: listDevice?.[parseInt(id) - 1].address,
        description: listDevice?.[parseInt(id) - 1].description,
        startDay: listDevice?.[parseInt(id) - 1].startDate,
        endDay: listDevice?.[parseInt(id) - 1].endDate,
      });
      setSelectedClass(listDevice?.[parseInt(id) - 1].class);
      setSelectedDistrict(listDevice?.[parseInt(id) - 1].district);
      setSelectedProvince(listDevice?.[parseInt(id) - 1].province);
      setSelectedWard(listDevice?.[parseInt(id) - 1].ward);
    }
  }, [id]);

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      iMei: yup.string().required("Vui lòng nhập tên tài khoản"),
      name: yup.string().required("Vui lòng nhập tên hiển thị"),
      class: yup.string().required("Vui lòng chọn phân cấp"),
      province: yup.string().required("Vui lòng chọn tỉnh/ thành phố"),
      district: yup.string().required("Vui lòng chọn quận/ huyện/ thị xã"),
      ward: yup.string().required("Vui lòng chọn phường/ xã/ thị trấn"),
      endDay: yup
        .date()
        .min(
          yup.ref("startDay"),
          "Vui lòng chọn ngày kết thúc muộn hơn ngày bắt đầu!",
        ),
    });

  const handleSubmit = async (value: FormikValues) => {
    const input: any = {
      ...value,
      // province: selectedProvince?.id || "",
      // district: selectedDistrict?.id || "",
    };
    console.log(input);
  };

  const resetField = () => {
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleReset = () => {};

  const handleRestart = async (onClose: () => void) => {
    await setTimeout(() => {
      onClose && onClose();
    }, 1000);
  };

  const setFieldValue = (value: any, formik: FormikProps<IFormValue>) => {
    switch (value?.id) {
      case "0":
        formik.setFieldValue("province", "SELECTED");
        formik.setFieldValue("district", "SELECTED");
        formik.setFieldValue("ward", "SELECTED");
        break;
      case "1":
        formik.setFieldValue("province", "");
        formik.setFieldValue("district", "SELECTED");
        formik.setFieldValue("ward", "SELECTED");
        break;
      case "2":
        formik.setFieldValue("province", "");
        formik.setFieldValue("district", "");
        formik.setFieldValue("ward", "SELECTED");
        break;
      case "3":
        formik.setFieldValue("province", "");
        formik.setFieldValue("district", "");
        formik.setFieldValue("ward", "");
        break;
      default:
        break;
    }
  };
  return (
    <TableLayout>
      <Title>Cấu hình thiết bị</Title>
      <TopWrapper>
        <VolumnSlider
          initValue={volume}
          title="Âm lượng"
          onChange={value => setVolume(value)}
        />
        <Checkbox
          initialCheck={false}
          label="Cố định"
          onChange={checked => setIsFixed(checked)}
        />
      </TopWrapper>

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
                    name="phone"
                    label="Số thuê bao"
                    placeholder="Nhập số thuê bao"
                    type="text"
                  />
                  <DatePicker label="Ngày bắt đầu gói cước" name="startDay" />
                  <DatePicker
                    minimumDate={new Date(formik.values.startDay || "")}
                    label="Ngày kết thúc gói cước"
                    name="endDay"
                  />
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
                    options={classList}
                    onSelect={value => {
                      setSelectedClass(value);
                      setFieldValue(value, formik);
                      resetField();
                    }}
                    placeholder="Chọn phân cấp"
                    required
                  />
                  {selectedClass?.id === "1" && (
                    <Select
                      name="province"
                      label="Tên tỉnh/ thành phố"
                      optionSelected={selectedProvince}
                      options={optionProvince}
                      onSelect={value => setSelectedProvince(value)}
                      placeholder="Chọn tỉnh/thành phố"
                      required
                    />
                  )}
                  {selectedClass?.id === "2" && (
                    <>
                      <Select
                        name="province"
                        label="Tên tỉnh/ thành phố"
                        optionSelected={selectedProvince}
                        options={optionProvince}
                        onSelect={value => setSelectedProvince(value)}
                        placeholder="Chọn tỉnh/thành phố"
                        required
                      />
                      <Select
                        name="district"
                        label="Tên quận/ huyện/ thị xã"
                        optionSelected={selectedDistrict}
                        options={optionDistrict}
                        onSelect={value => setSelectedDistrict(value)}
                        placeholder="Chọn quận/ huyện/ thị xã"
                        disabled={selectedProvince ? false : true}
                        required
                      />
                    </>
                  )}
                  {selectedClass?.id === "3" && (
                    <>
                      <Select
                        name="province"
                        label="Tên tỉnh/ thành phố"
                        optionSelected={selectedProvince}
                        options={optionProvince}
                        onSelect={value => setSelectedProvince(value)}
                        placeholder="Chọn tỉnh/ thành phố"
                        required
                      />
                      <Select
                        name="district"
                        label="Tên quận/ huyện/ thị xã"
                        optionSelected={selectedDistrict}
                        options={optionDistrict}
                        onSelect={value => setSelectedDistrict(value)}
                        placeholder="Chọn quận/ huyện/ thị xã"
                        disabled={selectedProvince ? false : true}
                        required
                      />
                      <Select
                        name="ward"
                        label="Tên phường/ xã/ thị trấn"
                        optionSelected={selectedWard}
                        options={optionWard}
                        onSelect={value => setSelectedWard(value)}
                        placeholder="Chọn phường/ xã/ thị trấn"
                        disabled={selectedDistrict ? false : true}
                        required
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
                <Button type="button" variant="secondary" onClick={handleBack}>
                  Quay lại
                </Button>
                {id && (
                  <AlertDialog
                    title="Khởi động lại"
                    message="Bạn có chắc chắn muốn khởi động lại thiết bị này?"
                    ButtonMenu={<Button variant="blue">Khởi động lại</Button>}
                    onConfirm={onClose => handleRestart(onClose)}
                  />
                )}
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

export default Details;

export const listDevice: any[] = [
  {
    id: "1",
    name: "admin1",
    deviceId: "1",
    volume: "100",
    status: true,
    type: 1,
  },
  {
    id: "2",
    name: "admin1",
    deviceId: "1",
    volume: "100",
    status: false,
    type: 2,
  },
  {
    id: "3",
    name: "admin1",
    deviceId: "1",
    volume: "100",
    status: true,
    type: 3,
  },
  {
    id: "4",
    name: "admin1",
    deviceId: "1",
    volume: "100",
    status: true,
    type: 4,
  },
];

const classList: any = [
  {
    id: "0",
    name: "Công ty",
  },
  {
    id: "1",
    name: "Tỉnh/Thành phố",
  },
  {
    id: "2",
    name: "Quận/Huyện/Thị Xã",
  },
  {
    id: "3",
    name: "Phường/Xã/Thị Trấn",
  },
];

const optionProvince: IRegion[] = [
  {
    id: 1,
    displayName: "TP HCM",
  },
  {
    id: 2,
    displayName: "TP HN",
  },
  {
    id: 3,
    displayName: "TP HP",
  },
];

const optionDistrict: IRegion[] = [
  {
    id: 1,
    name: "Quận 1",
  },
  {
    id: 2,
    name: "Quận 2",
  },
  {
    id: 3,
    name: "Quận 3",
  },
];

const optionWard: IRegion[] = [
  {
    id: 1,
    name: "Cao Thắng",
  },
  {
    id: 2,
    name: "Võ Văn Tần",
  },
  {
    id: 3,
    name: "Ngô Quyền",
  },
];
