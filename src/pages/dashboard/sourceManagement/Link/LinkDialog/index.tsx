import { useEffect, useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";

import { SUPPORTED_FORMATS } from "common/constants/file";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import Input from "designs/Input";

import { ILinkInput, ILink } from "typings";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";
import { URL } from "common/constants/validation";

type IDialogProps = {
  editField?: ILink;
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
  url?: string;
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
    url: "",
  });

  useEffect(() => {
    if (editField) {
      setInitialValues({
        name: editField?.name,
        url: editField?.url,
      });
    }
  }, []);

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      name: yup.string().required("Vui lòng nhập tên tệp tin"),
      url: yup
        .string()
        .required("Vui lòng nhập đường dẫn!")
        .matches(URL, "Đường dẫn chưa đúng định dạng, vui lòng thử lại!"),
    });

  const handleSubmit = async (value: FormikValues) => {
    const input: ILinkInput = {
      name: value?.name,
      url: value?.url,
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
            title={
              editField ? "Chỉnh sửa link tiếp sóng" : "Thêm link tiếp sóng"
            }
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
                    label="Tên link tiếp sóng"
                    placeholder="Nhập tên link tiếp sóng"
                    type="text"
                    required
                  />
                  <Input
                    name="url"
                    label="Đường dẫn link tiếp sóng"
                    placeholder="Nhập đường dẫn link tiếp sóng"
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
