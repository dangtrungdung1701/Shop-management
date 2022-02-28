import { useEffect, useState } from "react";
import { Formik, FormikProps, FormikValues } from "formik";
import * as yup from "yup";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import Input from "designs/Input";

import { IDistrict, IDistrictInput, IProvince, IWard } from "typings";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
  FormLeftWrapper,
  FormRightWrapper,
  FormTopWrapper,
} from "./styles";
import MultipleSelect from "designs/MultipleSelect";
import Select from "designs/Select";

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
  district?: string;
  province?: string;
  ward?: string;
  class?: string;
}

const NormalDialog: React.FC<IDialogProps> = ({
  open = false,
  editField,
  ButtonMenu,
  onClose,
  onSuccess,
}) => {
  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [selectedPermission, setSelectedPermission] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<IProvince | null>(
    null,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<IDistrict | null>(
    null,
  );
  const [selectedWard, setSelectedWard] = useState<IWard | null>(null);
  const [selectedClass, setSelectedClass] = useState<any | null>({});

  const [initialValues, setInitialValues] = useState<IFormValue>({
    userName: "",
    displayName: "",
    password: undefined,
    confirmPass: undefined,
    permission: "",
    province: "",
    district: "",
    ward: "",
    class: "",
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
      class: yup.string().required("Vui lòng chọn phân cấp"),
      permission: yup.string().required("Vui lòng chọn quyền hạn"),
      province: yup.string().required("Vui lòng chọn tỉnh/ thành phố"),
      district: yup.string().required("Vui lòng chọn quận/ huyện/ thị xã"),
      ward: yup.string().required("Vui lòng chọn phường/ xã/ thị trấn"),
    });

  useEffect(() => {
    console.log(selectedPermission);
  }, [selectedPermission]);

  const resetField = () => {
    setSelectedClass(null);
    setSelectedPermission([]);
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const handleSubmit = async (value: FormikValues) => {
    const input: any = {
      userName: value?.userName || "",
      displayName: value?.displayName,
      password: value?.password || "",
      province: selectedProvince?.id || "",
      district: selectedDistrict?.id || "",
      ward: selectedWard?.id || "",
      class: selectedClass?.id || "",
      listPermission: selectedPermission.map(
        permission => permission?.id || "",
      ),
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
    setSelectedClass(null);
    setSelectedPermission([]);
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedWard(null);
    onClose?.();
  };

  const setFieldValue = (value: any, formik: FormikProps<IFormValue>) => {
    switch (value?.id) {
      case "0":
        formik.setFieldValue("province", "SELECTED");
        formik.setFieldValue("district", "SELECTED");
        formik.setFieldValue("ward", "SELECTED");
        break;
      case "1":
        formik.setFieldValue("province", "");
        formik.setFieldValue("district", "SELECTED");
        formik.setFieldValue("ward", "SELECTED");
        break;
      case "2":
        formik.setFieldValue("province", "");
        formik.setFieldValue("district", "");
        formik.setFieldValue("ward", "SELECTED");
        break;
      case "3":
        formik.setFieldValue("province", "");
        formik.setFieldValue("district", "");
        formik.setFieldValue("ward", "");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ElementWrapper onClick={() => setOpen(true)}>
        {ButtonMenu}
      </ElementWrapper>
      <Dialog open={isOpen} onClose={handleCloseDialog} size="lg">
        <UserDialogContainer>
          <DialogHeader
            title={editField ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
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
                  <FormTopWrapper>
                    <FormLeftWrapper>
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
                    </FormLeftWrapper>
                    <FormRightWrapper>
                      <Select
                        name="class"
                        label="Phân cấp"
                        optionSelected={selectedClass}
                        options={classList}
                        onSelect={value => {
                          setSelectedClass(value);
                          setFieldValue(value, formik);
                          resetField();
                        }}
                        placeholder="Chọn phân cấp"
                        required
                      />
                      {selectedClass.id === "1" && (
                        <Select
                          name="province"
                          label="Tên tỉnh/ thành phố"
                          optionSelected={selectedProvince}
                          options={optionProvince}
                          onSelect={value => setSelectedProvince(value)}
                          placeholder="Chọn tỉnh/thành phố"
                          required
                        />
                      )}
                      {selectedClass.id === "2" && (
                        <>
                          <Select
                            name="province"
                            label="Tên tỉnh/ thành phố"
                            optionSelected={selectedProvince}
                            options={optionProvince}
                            onSelect={value => setSelectedProvince(value)}
                            placeholder="Chọn tỉnh/thành phố"
                            required
                          />
                          <Select
                            name="district"
                            label="Tên quận/ huyện/ thị xã"
                            optionSelected={selectedDistrict}
                            options={optionDistrict}
                            onSelect={value => setSelectedDistrict(value)}
                            placeholder="Chọn quận/ huyện/ thị xã"
                            disabled={selectedProvince ? false : true}
                            required
                          />
                        </>
                      )}
                      {selectedClass.id === "3" && (
                        <>
                          <Select
                            name="province"
                            label="Tên tỉnh/ thành phố"
                            optionSelected={selectedProvince}
                            options={optionProvince}
                            onSelect={value => setSelectedProvince(value)}
                            placeholder="Chọn tỉnh/ thành phố"
                            required
                          />
                          <Select
                            name="district"
                            label="Tên quận/ huyện/ thị xã"
                            optionSelected={selectedDistrict}
                            options={optionDistrict}
                            onSelect={value => setSelectedDistrict(value)}
                            placeholder="Chọn quận/ huyện/ thị xã"
                            disabled={selectedProvince ? false : true}
                            required
                          />
                          <Select
                            name="ward"
                            label="Tên phường/ xã/ thị trấn"
                            optionSelected={selectedWard}
                            options={optionWard}
                            onSelect={value => setSelectedWard(value)}
                            placeholder="Chọn phường/ xã/ thị trấn"
                            disabled={selectedDistrict ? false : true}
                            required
                          />
                        </>
                      )}

                      <MultipleSelect
                        name="permission"
                        label="Quyền hạn"
                        listOptionsSelected={selectedPermission}
                        options={optionPermission}
                        onSelect={value => setSelectedPermission(value)}
                        placeholder="Chọn quyền hạn"
                        required
                      />
                    </FormRightWrapper>
                  </FormTopWrapper>
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

export default NormalDialog;

const classList: any = [
  {
    id: "1",
    name: "Tỉnh/Thành phố",
  },
  {
    id: "2",
    name: "Quận/Huyện/Thị Xã",
  },
  {
    id: "3",
    name: "Phường/Xã/Thị Trấn",
  },
];

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

const optionProvince: IProvince[] = [
  {
    id: "1",
    name: "TP HCM",
  },
  {
    id: "2",
    name: "TP HN",
  },
  {
    id: "3",
    name: "TP HP",
  },
];

const optionDistrict: IDistrict[] = [
  {
    id: "1",
    name: "Quận 1",
  },
  {
    id: "2",
    name: "Quận 2",
  },
  {
    id: "3",
    name: "Quận 3",
  },
];

const optionWard: IWard[] = [
  {
    id: "1",
    name: "Cao Thắng",
  },
  {
    id: "2",
    name: "Võ Văn Tần",
  },
  {
    id: "3",
    name: "Ngô Quyền",
  },
];
