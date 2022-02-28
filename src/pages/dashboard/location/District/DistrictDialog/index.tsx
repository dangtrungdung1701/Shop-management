import { useEffect, useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import Input from "designs/Input";

import { IDistrict, IDistrictInput, IProvince } from "typings";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";
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
  province?: string;
  name?: string;
}

const DistrictDialog: React.FC<IDialogProps> = ({
  open = false,
  editField,
  ButtonMenu,
  onClose,
  onSuccess,
}) => {
  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<IProvince | null>(
    null,
  );

  const [initialValues, setInitialValues] = useState<IFormValue>({
    name: "",
  });

  useEffect(() => {
    if (editField) {
      setInitialValues({
        name: editField?.name,
      });
      setSelectedProvince(editField?.province || null);
    }
  }, []);

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      name: yup.string().required("Vui lòng nhập tên quận/ huyện/ thị xã"),
      province: yup.string().required("Vui lòng chọn tỉnh/ thành phố"),
    });

  const handleSubmit = async (value: FormikValues) => {
    const input: IDistrictInput = {
      name: value?.name,
      province: selectedProvince?.id || "",
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
    setSelectedProvince(null);
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
              editField
                ? "Chỉnh sửa thông tin tỉnh/ thành phố"
                : "Thêm tỉnh/ thành phố"
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
                  <Select
                    name="province"
                    label="Tên tỉnh/ thành phố"
                    optionSelected={selectedProvince}
                    options={optionProvince}
                    onSelect={value => setSelectedProvince(value)}
                    className="border rounded border-neutral-4"
                    placeholder="Chọn tỉnh/thành phố"
                    required
                  />
                  <Input
                    name="name"
                    label="Tên quận/ huyện/ thị xã"
                    placeholder="Nhập tên quận/ huyện/ thị xã"
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

export default DistrictDialog;

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
