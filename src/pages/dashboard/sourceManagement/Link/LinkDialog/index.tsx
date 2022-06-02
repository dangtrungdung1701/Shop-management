import { useEffect, useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

import { URL } from "common/constants/validation";
import axiosClient from "common/utils/api";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import Input from "designs/Input";

import { ILink } from "typings";

import useStore from "zustand/store";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";

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
  const { currentUser } = useStore();

  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState<IFormValue>({
    name: "",
    url: "",
  });

  useEffect(() => {
    if (editField) {
      setInitialValues({
        name: editField?.displayName,
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
    try {
      setLoading(true);
      if (editField) {
        const payload = {
          displayName: value?.name,
          url: value?.url,
        };
        console.log(payload);
        const res = await axiosClient.put(
          `/AudioLinkSource/${editField?.id}`,
          payload,
        );
        if (res) {
          onSuccess?.();
          handleCloseDialog();
          toast.dark("Cập nhật link tiếp sóng thành công !", {
            type: toast.TYPE.SUCCESS,
          });
        }
        return;
      }
      const payload = {
        displayName: value?.name,
        regionId: currentUser?.userInfo?.region?.id,
        url: value?.url,
      };
      const res = await axiosClient.post("/AudioLinkSource", payload);

      if (res) {
        onSuccess?.();
        handleCloseDialog();
        toast.dark("Tạo link tiếp sóng thành công !", {
          type: toast.TYPE.SUCCESS,
        });
      }
    } catch (err: any) {
      if (editField) {
        switch (err.response.status) {
          case 409:
            toast.dark(
              "Tên hiển thị link tiếp sóng đã tồn tại trong khu vực này ! Vui lòng thay đổi tên hiển thị",
              {
                type: toast.TYPE.ERROR,
              },
            );
            break;
          default:
            toast.dark("Cập nhật link tiếp sóng không thành công !", {
              type: toast.TYPE.ERROR,
            });
            break;
        }
      } else {
        switch (err.response.status) {
          case 409:
            toast.dark(
              "Tên hiển thị link tiếp sóng đã tồn tại trong khu vực này ! Vui lòng thay đổi tên hiển thị",
              {
                type: toast.TYPE.ERROR,
              },
            );
            break;
          default:
            toast.dark("Tạo link tiếp sóng không thành công !", {
              type: toast.TYPE.ERROR,
            });
            break;
        }
      }
    } finally {
      setLoading(false);
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
                  {!editField && (
                    <Input
                      name="url"
                      label="Đường dẫn link tiếp sóng"
                      placeholder="Nhập đường dẫn link tiếp sóng"
                      type="text"
                      required
                    />
                  )}
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
