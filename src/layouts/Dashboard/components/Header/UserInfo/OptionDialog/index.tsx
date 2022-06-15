import { useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";

import Dialog from "components/Dialog";
import DialogHeader from "components/Dialog/Header";

import Select from "designs/Select";
import Input from "designs/Input";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";

interface IOptionDialogProps {
  ButtonMenu?: React.ReactElement;
  editField?: any;
  permission?: string;
  onClose?: () => void;
  onSuccess?: () => void;
  open?: boolean;
}

interface IFormValue {
  dimension?: string;
  volumnQuality?: string;
}

const OptionDialog: React.FC<IOptionDialogProps> = props => {
  const { editField, ButtonMenu, onClose, onSuccess, open = false } = props;

  const [isOpen, setIsOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [selectedQuality, setSelectedQuality] = useState<any | null>({});
  const [initialValues, setInitialValues] = useState<IFormValue>({
    dimension: "",
    volumnQuality: "",
  });

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      dimension: yup.string().required("Vui lòng nhập kích thước bộ đệm"),
      volumnQuality: yup.string().required("Vui lòng chọn chất lượng âm thanh"),
    });

  const handleSubmit = async (values: FormikValues) => {
    const input: any = {
      ...values,
    };

    // try {
    //   setLoading(true);

    //   const payload: any = {
    //     id: editField?._id,
    //     updateUserInput: input,
    //   };

    //   console.log(payload);

    //   onSuccess?.();
    // } catch (err) {
    //   console.error(err);
    //   toast.dark("Update fail !", {
    //     type: toast.TYPE.ERROR,
    //   });
    // } finally {
    //   setLoading(false);
    //   handleCloseDialog();
    // }
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
          <DialogHeader title="Tùy chọn" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {formik => {
              return (
                <Form onSubmit={formik.handleSubmit}>
                  <Input
                    name="dimension"
                    label="Kích thước bộ đêm (ms)"
                    type="text"
                    placeholder="Nhập kích thước bộ đệm"
                    required
                  />
                  <Select
                    name="volumnQuality"
                    label="Chất lượng âm thanh"
                    optionSelected={selectedQuality}
                    options={optionQuality}
                    onSelect={value => setSelectedQuality(value)}
                    placeholder="Chọn chất lượng âm thanh"
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

export default OptionDialog;

const optionQuality: any = [
  {
    id: "1",
    name: "32kbps",
  },
  {
    id: "2",
    name: "64kbps",
  },
  {
    id: "3",
    name: "128kbps",
  },
];
