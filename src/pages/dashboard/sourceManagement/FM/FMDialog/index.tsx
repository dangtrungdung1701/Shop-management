import { useEffect, useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

import axiosClient from "common/utils/api";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import Input from "designs/Input";

import { IFM } from "typings";

import useStore from "zustand/store";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";

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
  const { currentUser } = useStore();

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
        name: editField?.displayName,
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
      name: yup.string().required("Vui lòng nhập tên kênh FM").trim(),
      frequency: yup.number().required("Vui lòng nhập tần số!"),
      rssi: yup.number().required("Vui lòng nhập thông số RSSI!"),
      c: yup.number().required("Vui lòng nhập thông số C!"),
      g: yup.number().required("Vui lòng nhập thông số G!"),
    });

  const handleSubmit = async (value: FormikValues) => {
    try {
      setLoading(true);
      if (editField) {
        const payload = {
          displayName: value?.name,
          frequency: value?.frequency,
          rssi: value?.rssi,
          c: value?.c,
          g: value?.g,
        };
        console.log(payload);
        const res = await axiosClient.put(
          `/AudioFmSource/${editField?.id}`,
          payload,
        );
        if (res) {
          onSuccess?.();
          handleCloseDialog();
          toast.dark("Cập nhật kênh FM thành công !", {
            type: toast.TYPE.SUCCESS,
          });
        }
        return;
      }
      const payload = {
        displayName: value?.name,
        frequency: value?.frequency,
        rssi: value?.rssi,
        c: value?.c,
        g: value?.g,
        regionId: currentUser?.userInfo?.region?.id,
      };
      const res = await axiosClient.post("/AudioFmSource", payload);

      if (res) {
        onSuccess?.();
        handleCloseDialog();
        toast.dark("Tạo kênh FM thành công !", {
          type: toast.TYPE.SUCCESS,
        });
      }
    } catch (err: any) {
      if (editField) {
        switch (err.response.status) {
          case 409:
            toast.dark(
              "Tên hiển thị kênh FM đã tồn tại trong khu vực này ! Vui lòng thay đổi tên hiển thị",
              {
                type: toast.TYPE.ERROR,
              },
            );
            break;
          default:
            toast.dark("Cập nhật kênh FM không thành công !", {
              type: toast.TYPE.ERROR,
            });
            break;
        }
      } else {
        switch (err.response.status) {
          case 409:
            toast.dark(
              "Tên hiển thị kênh FM đã tồn tại trong khu vực này ! Vui lòng thay đổi tên hiển thị",
              {
                type: toast.TYPE.ERROR,
              },
            );
            break;
          default:
            toast.dark("Tạo kênh FM không thành công !", {
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
                    type="number"
                    required
                  />
                  <Input
                    name="rssi"
                    label="Thông số RSSI"
                    placeholder="Nhập thông số RSSI"
                    type="number"
                    required
                  />
                  <Input
                    name="c"
                    label="Thông số C"
                    placeholder="Nhập thông số C"
                    type="number"
                    required
                  />
                  <Input
                    name="g"
                    label="Thông số G"
                    placeholder="Nhập thông số G"
                    type="number"
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
