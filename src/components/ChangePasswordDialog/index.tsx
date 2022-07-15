import { useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

import axiosClient from "common/utils/api";
import { PASSWORD } from "common/constants/validation";

import Dialog from "components/Dialog";
import DialogHeader from "components/Dialog/Header";

import Input from "designs/Input";

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
  oldPass?: string;
  newPass?: string;
  confirmPass?: string;
}

const UserDialog: React.FC<IUserDialogProps> = props => {
  const { editField, ButtonMenu, onClose, onSuccess, open = false } = props;

  const [isOpen, setIsOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState<IFormValue>({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      oldPass: yup
        .string()
        .required("Vui lòng nhập mật khẩu cũ")
        .min(6, "Mật khẩu cũ phải tối thiểu 6 ký tự"),
      newPass: yup
        .string()
        .required("Vui lòng nhập mật khẩu mới")
        .min(6, "Mật khẩu mới phải tối thiểu 6 ký tự")
        .matches(
          PASSWORD,
          "Mật khẩu phải có số, chữ cái thường, chữ cái hoa và ký tự đặc biệt",
        ),
      confirmPass: yup
        .string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf(
          [yup.ref("newPass"), null],
          "Mật khẩu phải trùng với mật khẩu mới đã nhập",
        ),
    });

  const handleSubmit = async (values: FormikValues) => {
    try {
      setLoading(true);

      const payload: any = {
        oldPassword: values?.oldPass,
        newPassword: values?.newPass,
      };

      const response = await axiosClient.put(
        `/User/${editField?.id}/Password`,
        payload,
      );

      if (response) {
        toast.dark("Cập nhật mật khẩu thành công!", {
          type: toast.TYPE.SUCCESS,
        });
      } else {
        toast.dark("Cập nhật mật khẩu không thành công, vui lòng thử lại!", {
          type: toast.TYPE.ERROR,
        });
      }
    } catch (err) {
      console.error(err);
      toast.dark("Cập nhật mật khẩu không thành công, vui lòng thử lại!", {
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
          <DialogHeader title="Chỉnh sửa mật khẩu" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {formik => {
              return (
                <Form onSubmit={formik.handleSubmit}>
                  <Input
                    name="oldPass"
                    label="Mật khẩu cũ"
                    type="password"
                    placeholder="Nhập mật khẩu cũ"
                    required
                  />
                  <Input
                    name="newPass"
                    label="Mật khẩu mới"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    required
                  />
                  <Input
                    name="confirmPass"
                    label="Nhập lại mật khẩu mới"
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
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
