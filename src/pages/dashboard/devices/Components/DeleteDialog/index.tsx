import { useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import Input from "designs/Input";

import { IDevice, IDeleteDeviceInput } from "typings";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";
import axiosClient from "common/utils/api";
import useStore from "zustand/store";
import { toast } from "react-toastify";

type IDialogProps = {
  editField?: IDevice;
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
  password?: string;
}

const DeleteDialog: React.FC<IDialogProps> = ({
  open = false,
  ButtonMenu,
  onClose,
  onSuccess,
  editField,
}) => {
  const { currentUser } = useStore();
  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [listDeviceSelected, setListDeviceSelected] = useState<IDevice[]>([]);

  const [initialValues, setInitialValues] = useState<IFormValue>({
    password: "",
  });

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      password: yup
        .string()
        .required("Vui lòng nhập mật khẩu!")
        .min(6, "Mật khẩu tối thiểu 6 ký tự!"),
    });

  const handleSubmit = async (value: FormikValues) => {
    const input: IDeleteDeviceInput = {
      userId: currentUser?.userInfo?.id,
      password: value?.password,
    };
    try {
      const payload: any = {
        ...input,
      };
      const res = await axiosClient.delete(`/Device/${editField?.id}`, payload);
      if (res) {
        onSuccess?.();
        setLoading(false);
        handleCloseDialog();
        toast.dark("Xóa thiết bị thành công !", {
          type: toast.TYPE.SUCCESS,
        });
      }
    } catch (err) {
      setLoading(false);
      handleCloseDialog();
      toast.dark("Xóa thiết bị không thành công !", {
        type: toast.TYPE.ERROR,
      });
    }
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
          <DialogHeader title="Xóa thiết bị" />
          <div className="text-neutral-2 mb-2">
            Bạn có chắc chắn muốn xóa thiết bị này?
          </div>
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
                    name="password"
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    type="password"
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

export default DeleteDialog;
