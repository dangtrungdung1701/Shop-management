import { useEffect, useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import Input from "designs/Input";

import { IDistrict, IDistrictInput } from "typings";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";
import MultipleSelect from "designs/MultipleSelect";

type IDialogProps = {
  editField?: IDistrict;
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
  userName: string;
  displayName: string;
  password?: string;
  confirmPass?: string;
  permission: string;
}

const AdminDialog: React.FC<IDialogProps> = ({
  open = false,
  editField,
  ButtonMenu,
  onClose,
  onSuccess,
}) => {
  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [selectedPermission, setSelectedPermission] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState<IFormValue>({
    userName: "",
    displayName: "",
    password: undefined,
    confirmPass: undefined,
    permission: "",
  });

  // useEffect(() => {
  //   if (editField) {
  //     setInitialValues({
  //       name: editField?.name,
  //     });
  //     setSelectedProvince(editField?.province || null);
  //   }
  // }, []);

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      userName: yup
        .string()
        .required("Vui lòng nhập tên tài khoản")
        .min(5, "Tên tài khoản phải tối thiểu 5 ký tự"),
      displayName: yup.string().required("Vui lòng nhập tên hiển thị"),
      password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải tối thiểu 6 ký tự"),
      confirmPass: yup
        .string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf(
          [yup.ref("password"), null],
          "Mật khẩu phải trùng với mật khẩu đã nhập",
        ),
      permission: yup.string().required("Vui lòng chọn quyền hạn"),
    });

  useEffect(() => {
    console.log(selectedPermission);
  }, [selectedPermission]);

  const handleSubmit = async (value: FormikValues) => {
    const input: IDistrictInput = {
      name: value?.name,
      province: "",
    };
    console.log(input);
    handleCloseDialog();
    // try {
    //   if (editField) {
    //     setLoading(true);
    //     const payload: IUpdateDistrict = {
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
    setSelectedPermission([]);
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
            title={editField ? "Chỉnh sửa quản trị viên" : "Thêm quản trị viên"}
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
                    name="userName"
                    label="Tài khoản"
                    placeholder="Nhập tên tài khoản"
                    type="text"
                    disabled={editField ? true : false}
                    required
                  />
                  <Input
                    name="displayName"
                    label="Tên hiển thị"
                    placeholder="Nhập tên hiển thị"
                    type="text"
                    required
                  />
                  <Input
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                  <Input
                    name="confirmPass"
                    label="Nhập lại mật khẩu"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    required
                  />
                  <MultipleSelect
                    name="permission"
                    label="Quyền hạn"
                    listOptionsSelected={selectedPermission}
                    options={optionPermission}
                    onSelect={value => setSelectedPermission(value)}
                    placeholder="Chọn quyền hạn"
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

export default AdminDialog;

const optionPermission: any = [
  {
    id: "1",
    name: "Quản lý tài khoản",
  },
  {
    id: "2",
    name: "Quản lý tệp tin",
  },
  {
    id: "3",
    name: "Quản lý nguồn phát",
  },
];
