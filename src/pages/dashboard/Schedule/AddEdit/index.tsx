import { useBreadcrumb } from "hooks/useBreadcrumb";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory, useParams } from "react-router";
import { PATH } from "common/constants/routes";
import { ISource, optionSource } from "common/constants/source";
import * as yup from "yup";

import Input from "designs/Input";
import TableLayout from "layouts/Table";
import { Formik, FormikValues } from "formik";

import {
  Title,
  BottomWrapper,
  FormLeftWrapper,
  Form,
  ButtonWrapper,
  Button,
  FormRightWrapper,
} from "./styles";
import MultipleSelect from "designs/MultipleSelect";
import { IFileAudio, IFM, ILink } from "typings";
import Select from "designs/Select";
import DatePicker from "designs/DatePicker";
import TimePicker from "designs/TimePicker";

interface IConfigureScheduleProps extends RouteComponentProps {}
interface IParams {
  id: string;
}

interface IFormValue {
  name?: string;
  devices?: string;
  sources?: string;
  link?: string;
  startDay?: string;
  endDay?: string;
  startTime?: string;
  endTime?: string;
  weekDay?: string;
  repeateTime?: string;
}

const ConfigureSchedule: React.FC<IConfigureScheduleProps> = ({ location }) => {
  const params: IParams = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [listDeviceSelected, setListDeviceSelected] = useState<any[]>([]);
  const [fileSelected, setFileSelected] = useState<
    IFileAudio | ILink | IFM | null
  >(null);
  const [options, setOptions] = useState<IFileAudio[] | ILink[] | IFM[]>([]);
  const [sourceSelected, setSourceSelected] = useState<ISource | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<any[]>([]);

  const [initialValues, setInitialValues] = useState<IFormValue>({
    name: "",
    devices: "",
    sources: "",
    link: "",
    startDay: "",
    endDay: "",
    startTime: "",
    endTime: "",
    weekDay: "",
    repeateTime: "",
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
      devices: yup.string().required("Vui lòng chọn thiết bị phát"),
      sources: yup.string().required("Vui lòng chọn nguồn phát"),
      link: yup.string().required("Vui lòng chọn nguồn phát tương ứng"),
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
      repeateTime: yup.string().required("Vui lòng chọn số lần lặp"),
    });

  useEffect(() => {
    getOption();
  }, [sourceSelected]);

  const getOption = () => {
    switch (sourceSelected?.id) {
      case "1":
        return setOptions(optionFileAudio);
      case "2":
        return setOptions(optionLink);
      case "3":
        return setOptions(optionFM);
      default:
        break;
    }
  };

  const handleSubmit = async (value: FormikValues) => {
    const input: any = {
      ...value,
      // province: selectedProvince?.id || "",
      // district: selectedDistrict?.id || "",
    };
    console.log(input);
  };

  const handleBack = () => {
    history.push(PATH.SCHEDULE.SELF);
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
                  <MultipleSelect
                    name="devices"
                    label="Thiết bị"
                    listOptionsSelected={listDeviceSelected}
                    options={optionDevice}
                    onSelect={value => setListDeviceSelected(value)}
                    placeholder="Chọn thiết bị"
                    required
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
                    required
                  />
                  <TimePicker
                    name="endTime"
                    label="Thời gian kết thúc"
                    placeholder="Chọn thời gian kết thúc"
                    minTime={formik.values.startTime}
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
                    name="repeateTime"
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

const optionDevice: any[] = [
  {
    id: "1",
    name: "device 1",
  },
  {
    id: "2",
    name: "device 2",
  },
  {
    id: "3",
    name: "device 3",
  },
];

const optionWeek: any[] = [
  {
    id: "1",
    name: "Thứ 2",
  },
  {
    id: "2",
    name: "Thứ 3",
  },
  {
    id: "3",
    name: "Thứ 4",
  },
  {
    id: "4",
    name: "Thứ 5",
  },
  {
    id: "5",
    name: "Thứ 6",
  },
  {
    id: "6",
    name: "Thứ 7",
  },
  {
    id: "7",
    name: "Chủ nhật",
  },
];

const optionFileAudio: IFileAudio[] = [
  {
    id: "1",
    name: "file 1",
  },
  {
    id: "2",
    name: "file 2",
  },
  {
    id: "3",
    name: "file 3",
  },
];

const optionLink: ILink[] = [
  {
    id: "1",
    name: "Link 1",
  },
  {
    id: "2",
    name: "Link 2",
  },
  {
    id: "3",
    name: "Link 3",
  },
];

const optionFM: IFM[] = [
  {
    id: "1",
    name: "FM 1",
  },
  {
    id: "2",
    name: "FM 2",
  },
  {
    id: "3",
    name: "FM 3",
  },
];
