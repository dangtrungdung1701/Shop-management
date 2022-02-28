import { useEffect, useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import Input from "designs/Input";

import { IDistrict, IProvince, IWard, IWardInput } from "typings";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";
import Select from "designs/Select";

type IDialogProps = {
  editField?: IWard;
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
  district?: string;
  province?: string;
  name?: string;
}

const WardDialog: React.FC<IDialogProps> = ({
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
  const [selectedDistrict, setSelectedDistrict] = useState<IDistrict | null>(
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
      setSelectedDistrict(editField?.district || null);
    }
  }, []);

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      name: yup.string().required("Vui lòng nhập tên phường/ xã/ thị trấn"),
      province: yup.string().required("Vui lòng chọn tỉnh/ thành phố"),
      district: yup.string().required("Vui lòng chọn quận/ huyện/ thị xã"),
    });

  const handleSubmit = async (value: FormikValues) => {
    const input: IWardInput = {
      name: value?.name,
      province: selectedProvince?.id || "",
      district: selectedDistrict?.id || "",
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
    setSelectedDistrict(null);
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
                  <Select
                    name="district"
                    label="Tên quận/ huyện/ thị xã"
                    optionSelected={selectedDistrict}
                    options={optionDistrict}
                    onSelect={value => setSelectedDistrict(value)}
                    className="border rounded border-neutral-4"
                    placeholder="Chọn quận/ huyện/ thị xã"
                    disabled={selectedProvince ? false : true}
                    required
                  />
                  <Input
                    name="name"
                    label="Tên phường/ xã/ thị trấn"
                    placeholder="Nhập tên phường/ xã/ thị trấn"
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

export default WardDialog;

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
