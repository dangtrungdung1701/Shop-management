import { useEffect, useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

import axiosClient from "common/utils/api";

import Dialog from "components/Dialog";
import DialogHeader from "components/Dialog/Header";

import Input from "designs/Input";

import useStore from "zustand/store";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";

interface IUserDialogProps {
  ButtonMenu?: React.ReactElement;
  editField?: any;
  permission?: string;
  onClose?: () => void;
  onSuccess?: () => void;
  open?: boolean;
}

interface IFormValue {
  userName?: string;
  displayName?: string;
}

const UserDialog: React.FC<IUserDialogProps> = props => {
  const { editField, ButtonMenu, onClose, onSuccess, open = false } = props;
  const { currentUser, setCurrentUser } = useStore();
  const [isOpen, setIsOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [enabled, setEnabled] = useState<boolean | undefined>(false);

  const [initialValues, setInitialValues] = useState<IFormValue>({
    userName: "",
    displayName: "",
  });

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      userName: yup.string(),
      displayName: yup.string().required("Vui lòng nhập tên hiển thị"),
    });

  useEffect(() => {
    if (editField) {
      setInitialValues({
        userName: editField?.userName,
        displayName: editField?.displayName,
      });
    }
  }, [editField]);

  const handleSubmit = async (values: FormikValues) => {
    try {
      setLoading(true);

      const payload: any = {
        displayName: values?.displayName,
      };
      const response = await axiosClient.put(`/User/${editField?.id}`, payload);
      if (response) {
        const newCurrentUser = { ...currentUser, userInfo: response };
        setCurrentUser(newCurrentUser);
        toast.dark("Cập nhật tên hiển thị thành công!", {
          type: toast.TYPE.SUCCESS,
        });
        onSuccess && onSuccess();
      } else {
        toast.dark("Xảy ra lỗi khi cập nhật !", {
          type: toast.TYPE.ERROR,
        });
      }
    } catch (err) {
      console.error(err);
      toast.dark("Xảy ra lỗi khi cập nhật !", {
        type: toast.TYPE.ERROR,
      });
    } finally {
      setLoading(false);
      handleCloseDialog();
    }
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      <ElementWrapper onClick={() => setIsOpen(true)}>
        {ButtonMenu}
      </ElementWrapper>
      <Dialog open={isOpen} onClose={handleCloseDialog}>
        <UserDialogContainer>
          <DialogHeader title="Chỉnh sửa thông tin tài khoản" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {formik => {
              return (
                <Form onSubmit={formik.handleSubmit}>
                  <Input
                    name="userName"
                    label="Tài khoản"
                    type="text"
                    disabled
                  />
                  <Input
                    name="displayName"
                    type="text"
                    label="Tên hiển thị"
                    placeholder="Nhập tên hiển thị"
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

export default UserDialog;
