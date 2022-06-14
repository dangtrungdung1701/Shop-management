import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import * as yup from "yup";
import { Formik, FormikValues } from "formik";
import AudioPlayer from "material-ui-audio-player";

import { PATH } from "common/constants/routes";
import {
  ISpeed,
  IVoice,
  optionSpeed,
  optionVoice,
} from "common/constants/convert";

import Input from "designs/Input";
import Select from "designs/Select";
import TextArea from "designs/TextArea";

import TableLayout from "layouts/Table";

import { useBreadcrumb } from "hooks/useBreadcrumb";

import { IConvertInput } from "typings";

import {
  Button,
  ButtonWrapper,
  FieldWrapper,
  Form,
  SliderWrapper,
  Title,
} from "./styles";

interface IRegionProps extends RouteComponentProps {}

interface IFormValue {
  title?: string;
  voice?: string;
  speed?: number;
  paragraph?: string;
}

const FM: React.FC<IRegionProps> = ({ location }) => {
  const [loading, setLoading] = useState(false);

  useBreadcrumb([
    {
      name: "Quản lý nguồn phát",
      href: "#",
    },
    {
      name: "FM",
      href: PATH.SOURCE_MANAGEMENT.FM,
    },
  ]);

  const [selectedVoice, setSelectedVoice] = useState<IVoice>();
  const [selectedSpeed, setSelectedSpeed] = useState<ISpeed>();

  const [initialValues, setInitialValues] = useState<IFormValue>({
    title: "",
    voice: "",
    speed: undefined,
    paragraph: "",
  });

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      title: yup.string().required("Vui lòng nhập tiêu đề!").trim(),
      voice: yup.string().required("Vui lòng chọn giọng nói!"),
      speed: yup.string().required("Vui lòng chọn tốc độ!"),
      paragraph: yup.string().required("Vui lòng nhập văn bản!").trim(),
    });

  const handleSubmit = async (value: FormikValues) => {
    const input: IConvertInput = {
      title: value?.title,
      voice: selectedVoice?.name,
      speed: parseInt(selectedSpeed?.name!),
      paragraph: value?.paragraph,
    };
    console.log(input);
    // try {
    //   if (editField) {
    //     setLoading(true);
    //     const payload: IUpdateProvince = {
    //       id: editField?._id!,
    //       categoryInput: input,
    //     };
    //     await updateCategoryAPI(payload);
    //     onSuccess?.();
    //     setLoading(false);
    //     handleCloseDialog();
    //     return;
    //   }
    //   setLoading(true);
    //   const payload: ICreateProvince = {
    //     categoryInput: input,
    //   };
    //   await createCategoryAPI(payload);
    //   onSuccess?.();
    //   setLoading(false);
    //   handleCloseDialog();
    // } catch (err) {
    //   setLoading(false);
    //   handleCloseDialog();
    // }
  };
  return (
    <TableLayout title="Công cụ chuyển đổi">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formik => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <Title>Chuyển đổi văn bản thành giọng nói</Title>
              <FieldWrapper>
                <Input
                  name="title"
                  label="Tiêu đề"
                  placeholder="Nhập tiêu đề"
                  type="text"
                  required
                />
                <Select
                  name="voice"
                  label="Giọng nói"
                  optionSelected={selectedVoice}
                  options={optionVoice}
                  onSelect={value => setSelectedVoice(value)}
                  className="border rounded border-neutral-4"
                  placeholder="Chọn giọng nói"
                  required
                />
                <Select
                  name="speed"
                  label="Tốc độ"
                  optionSelected={selectedSpeed}
                  options={optionSpeed}
                  onSelect={value => setSelectedSpeed(value)}
                  className="border rounded border-neutral-4"
                  placeholder="Chọn tốc độ"
                  required
                />
                <TextArea
                  name="paragraph"
                  label="Văn bản"
                  placeholder="Nhập văn bản"
                  required
                />
              </FieldWrapper>
              <SliderWrapper>
                <ButtonWrapper>
                  <Button
                    className="whitespace-nowrap"
                    type="button"
                    variant="blue"
                    onClick={() => {}}
                  >
                    Tải xuống
                  </Button>
                  <Button
                    className="whitespace-nowrap"
                    loading={loading}
                    type="submit"
                  >
                    Chuyển đổi
                  </Button>
                </ButtonWrapper>
                <div className="custom-audio-player w-full">
                  <AudioPlayer
                    elevation={1}
                    width="500px"
                    variation="primary"
                    debug={false}
                    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                  />
                </div>
              </SliderWrapper>
            </Form>
          );
        }}
      </Formik>
    </TableLayout>
  );
};

export default FM;
