import { useEffect, useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";

import { SUPPORTED_FORMATS } from "common/constants/file";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import Input from "designs/Input";

import { IFMInput, IFM } from "typings";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";
import { URL } from "common/constants/validation";

type IDialogProps = {
  editField?: IFM;
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
  frequency?: number;
  rssi?: number;
  c?: number;
  g?: number;
}

const LinkDialog: React.FC<IDialogProps> = ({
  open = false,
  editField,
  ButtonMenu,
  onClose,
  onSuccess,
}) => {
  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState<IFormValue>({
    name: "",
    frequency: undefined,
    rssi: undefined,
    c: undefined,
    g: undefined,
  });

  useEffect(() => {
    if (editField) {
      setInitialValues({
        name: editField?.name,
        frequency: editField?.frequency,
        rssi: editField?.rssi,
        c: editField?.c,
        g: editField?.g,
      });
    }
  }, []);

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      name: yup.string().required("Vui lòng nhập tên kênh FM"),
      frequency: yup.number().required("Vui lòng nhập tần số!"),
      rssi: yup.number().required("Vui lòng nhập thông số RSSI!"),
      c: yup.number().required("Vui lòng nhập thông số C!"),
      g: yup.number().required("Vui lòng nhập thông số G!"),
    });

  const handleSubmit = async (value: FormikValues) => {
    const input: IFMInput = {
      name: value?.name,
      frequency: value?.frequency,
      rssi: value?.rssi,
      c: value?.c,
      g: value?.g,
    };
    console.log(input);
    handleCloseDialog();
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

  const handleCloseDialog = () => {
    setOpen(false);
    onClose?.();
  };
  return (
    <>
      <ElementWrapper onClick={() => setOpen(true)}>
        {ButtonMenu}
      </ElementWrapper>
      <Dialog open={isOpen} onClose={handleCloseDialog} size="md">
        <UserDialogContainer>
          <DialogHeader
            title={editField ? "Chỉnh sửa kênh FM" : "Thêm kênh FM"}
          />
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
                    label="Tên kênh FM"
                    placeholder="Nhập tên kênh FM"
                    type="text"
                    required
                  />
                  <Input
                    name="frequency"
                    label="Tần số"
                    placeholder="Nhập tần số"
                    type="text"
                    required
                  />
                  <Input
                    name="rssi"
                    label="Thông số RSSI"
                    placeholder="Nhập thông số RSSI"
                    type="text"
                    required
                  />
                  <Input
                    name="c"
                    label="Thông số C"
                    placeholder="Nhập thông số C"
                    type="text"
                    required
                  />
                  <Input
                    name="g"
                    label="Thông số G"
                    placeholder="Nhập thông số G"
                    type="text"
                    required
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

export default LinkDialog;
