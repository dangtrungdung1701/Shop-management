import { useEffect, useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

import Input from "designs/Input";
import Dialog from "components/Dialog";
import DialogHeader from "components/Dialog/Header";

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
  username?: string;
  fullName?: string;
}

const UserDialog: React.FC<IUserDialogProps> = props => {
  const { editField, ButtonMenu, onClose, onSuccess, open = false } = props;

  const [isOpen, setIsOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [enabled, setEnabled] = useState<boolean | undefined>(false);

  const [initialValues, setInitialValues] = useState<IFormValue>({
    username: "abc",
    fullName: "",
  });

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      username: yup.string(),
      fullName: yup.string().required("Vui lòng nhập tên hiển thị"),
    });

  useEffect(() => {
    if (editField) {
      setInitialValues({
        // username: editField.username,
        fullName: editField.fullName,
      });
    }
  }, [editField]);

  const handleSubmit = async (values: FormikValues) => {
    const input: any = {
      ...values,
      password: values?.password || undefined,
    };

    // Check field change
    if (input.username === initialValues.username) {
      delete input.email;
    } else {
      const result = true;

      if (result) {
        toast.dark("Your email address already exists, please try again!", {
          type: toast.TYPE.ERROR,
        });
        return;
      }
    }

    try {
      setLoading(true);

      const payload: any = {
        id: editField?._id,
        updateUserInput: input,
      };

      console.log(payload);

      if (enabled !== editField?.enabled) {
        console.log(enabled);
      }

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.dark("Update fail !", {
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
          >
            {formik => {
              return (
                <Form onSubmit={formik.handleSubmit}>
                  <Input
                    name="username"
                    label="Tài khoản"
                    type="text"
                    disabled
                  />
                  <Input
                    name="fullName"
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
