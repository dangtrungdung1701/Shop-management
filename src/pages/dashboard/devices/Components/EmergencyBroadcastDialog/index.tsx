import { useEffect, useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";

import { ISource, optionSource } from "common/constants/source";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import Input from "designs/Input";
import MultipleSelect from "designs/MultipleSelect";
import Select from "designs/Select";

import {
  IDevice,
  IEmergencyBroadcastInput,
  IFileAudio,
  IFM,
  ILink,
} from "typings";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";

type IDialogProps = {
  onClose?: () => void;
  onSuccess?: () => void;
} & (
  | {
      ButtonMenu: React.ReactElement;
      readonly open?: boolean;
    }
  | {
      readonly ButtonMenu?: React.ReactElement;
      open: boolean;
    }
);

interface IFormValue {
  name?: string;
  device?: string;
  source?: string;
  file?: string;
}

const EmergencyBroadcastDialog: React.FC<IDialogProps> = ({
  open = false,
  ButtonMenu,
  onClose,
  onSuccess,
}) => {
  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [listDeviceSelected, setListDeviceSelected] = useState<IDevice[]>([]);
  const [sourceSelected, setSourceSelected] = useState<ISource | null>(null);
  const [fileSelected, setFileSelected] = useState<
    IFileAudio | ILink | IFM | null
  >(null);
  const [options, setOptions] = useState<IFileAudio[] | ILink[] | IFM[]>([]);

  const [initialValues, setInitialValues] = useState<IFormValue>({
    name: "",
    device: "",
    source: "",
    file: "",
  });

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      name: yup.string().required("Vui lòng nhập tên chương trình!"),
      device: yup.string().required("Vui lòng chọn thiết bị!"),
      source: yup.string().required("Vui lòng chọn nguồn phát"),
      file: yup.string().required("Vui lòng chọn Tệp tin/Link tiếp sóng/FM!"),
    });

  const handleSubmit = async (value: FormikValues) => {
    const input: IEmergencyBroadcastInput = {
      name: value?.name,
      device: listDeviceSelected?.map(device => device?.id || ""),
      source: sourceSelected?.id || "",
      file: fileSelected?.id || "",
    };
    console.log(input);
    handleCloseDialog();
    // try {
    //   if () {
    //     setLoading(true);
    //     const payload: IUpdateDistrict = {
    //       id: ?._id!,
    //       categoryInput: input,
    //     };
    //     await updateCategoryAPI(payload);
    //     onSuccess?.();
    //     setLoading(false);
    //     handleCloseDialog();
    //     return;
    //   }
    //   setLoading(true);
    //   const payload: ICreateDistrict = {
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

  const handleCloseDialog = () => {
    setOpen(false);
    onClose?.();
  };
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
  return (
    <>
      <ElementWrapper onClick={() => setOpen(true)}>
        {ButtonMenu}
      </ElementWrapper>
      <Dialog open={isOpen} onClose={handleCloseDialog} size="md">
        <UserDialogContainer>
          <DialogHeader title="Phát khẩn cấp" />
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {formik => {
              return (
                <Form onSubmit={formik.handleSubmit}>
                  <Input
                    name="name"
                    label="Tên quận/ huyện/ thị xã"
                    placeholder="Nhập tên quận/ huyện/ thị xã"
                    type="text"
                    required
                  />
                  <MultipleSelect
                    name="device"
                    label="Thiết bị"
                    listOptionsSelected={listDeviceSelected}
                    options={optionDevice}
                    onSelect={value => setListDeviceSelected(value)}
                    className="border rounded border-neutral-4"
                    placeholder="Chọn thiết bị"
                    required
                  />
                  <Select
                    name="source"
                    label="Nguồn phát"
                    optionSelected={sourceSelected}
                    options={optionSource}
                    onSelect={value => setSourceSelected(value)}
                    className="border rounded border-neutral-4"
                    placeholder="Chọn nguồn phát"
                    required
                  />
                  <Select
                    name="file"
                    label="Tệp tin/Link tiếp sóng/FM"
                    optionSelected={fileSelected}
                    options={options}
                    onSelect={value => setFileSelected(value)}
                    className="border rounded border-neutral-4"
                    placeholder="Chọn Tệp tin/Link tiếp sóng/FM"
                    required
                    disabled={sourceSelected ? false : true}
                  />
                  <ButtonWrapper>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCloseDialog}
                    >
                      Hủy
                    </Button>
                    <Button loading={loading} type="submit">
                      Lưu
                    </Button>
                  </ButtonWrapper>
                </Form>
              );
            }}
          </Formik>
        </UserDialogContainer>
      </Dialog>
    </>
  );
};

export default EmergencyBroadcastDialog;

const optionDevice: IDevice[] = [
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
