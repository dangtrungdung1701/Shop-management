import React, { useState } from "react";
import { Form, Formik } from "formik";
import TableLayout from "layouts/Table";
import Input from "designs/Input";
import {
  Title,
  FormWrapper,
  FormLeftWrapper,
  FormRightWrapper,
  Button,
  FirmwareWrapper,
} from "./styles";

interface IFirmwareProps {
  editField?: any;
}

interface IFormValue {
  versionFirmware: string;
  versionHardware: string;
  wan: string;
  lan: string;
  wifi: string;
}

const Firmware: React.FC<IFirmwareProps> = ({ editField }) => {
  const [initialValues, setInitialValues] = useState<IFormValue>({
    versionFirmware: "12",
    versionHardware: "12",
    wan: "1.1.0.1",
    lan: "1.1.0.1",
    wifi: "1.1.0.1",
  });

  const handleUpdate = () => {};

  return (
    <TableLayout>
      <Title>Phiên bản</Title>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={() => {}}
      >
        {formik => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <FormWrapper>
                <FormLeftWrapper>
                  <FirmwareWrapper className="">
                    <Input
                      name="versionFirmware"
                      label="Phiên bản Firmware"
                      type="text"
                      disabled
                    />
                    <Button type="button" onClick={handleUpdate}>
                      Cập nhật
                    </Button>
                  </FirmwareWrapper>

                  <Input
                    name="versionHardware"
                    label="Phiên bản Hardware"
                    type="text"
                    disabled
                  />
                </FormLeftWrapper>
                <FormRightWrapper>
                  <Input
                    name="wan"
                    label="Địa chỉ WAN IP"
                    type="text"
                    disabled
                  />
                  <Input
                    name="lan"
                    label="Địa chỉ LAN IP"
                    type="text"
                    disabled
                  />
                  <Input name="wifi" label="Tên wifi" type="text" disabled />
                </FormRightWrapper>
              </FormWrapper>
            </Form>
          );
        }}
      </Formik>
    </TableLayout>
  );
};

export default Firmware;
