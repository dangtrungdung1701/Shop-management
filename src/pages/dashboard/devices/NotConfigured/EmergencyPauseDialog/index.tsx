import { useState } from "react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import MultipleSelect from "designs/MultipleSelect";

import { IConfiguredDevice, IEmergencyPauseInput } from "typings";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  Form,
  UserDialogContainer,
} from "./styles";

type IDialogProps = {
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
  device?: string;
}

const EmergencyPauseDialog: React.FC<IDialogProps> = ({
  open = false,
  ButtonMenu,
  onClose,
  onSuccess,
}) => {
  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [listDeviceSelected, setListDeviceSelected] = useState<
    IConfiguredDevice[]
  >([]);

  const [initialValues, setInitialValues] = useState<IFormValue>({
    device: "",
  });

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      device: yup.string().required("Vui lòng chọn thiết bị!"),
    });

  const handleSubmit = async (value: FormikValues) => {
    const input: IEmergencyPauseInput = {
      device: listDeviceSelected?.map(device => device?.id || ""),
    };
    console.log(input);
    handleCloseDialog();
    // try {
    //   if () {
    //     setLoading(true);
    //     const payload: IUpdateDistrict = {
    //       id: ?._id!,
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
    onClose?.();
  };

  return (
    <>
      <ElementWrapper onClick={() => setOpen(true)}>
        {ButtonMenu}
      </ElementWrapper>
      <Dialog open={isOpen} onClose={handleCloseDialog} size="md">
        <UserDialogContainer>
          <DialogHeader title="Dừng khẩn cấp" />
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {formik => {
              return (
                <Form onSubmit={formik.handleSubmit}>
                  <MultipleSelect
                    name="device"
                    label="Thiết bị"
                    listOptionsSelected={listDeviceSelected}
                    options={optionDevice}
                    onSelect={value => setListDeviceSelected(value)}
                    className="border rounded border-neutral-4"
                    placeholder="Chọn thiết bị"
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

export default EmergencyPauseDialog;

const optionDevice: IConfiguredDevice[] = [
  {
    id: "1",
    name: "device 1",
  },
  {
    id: "2",
    name: "device 2",
  },
  {
    id: "3",
    name: "device 3",
  },
];
