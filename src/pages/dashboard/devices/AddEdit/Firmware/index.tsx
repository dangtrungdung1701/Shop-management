import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";

import Input from "designs/Input";

import TableLayout from "layouts/Table";

import { IDevice } from "typings";

import {
  Title,
  FormWrapper,
  FormLeftWrapper,
  FormRightWrapper,
  Button,
  FirmwareWrapper,
} from "./styles";

interface IFirmwareProps {
  editField?: IDevice;
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
    versionFirmware: "",
    versionHardware: "",
    wan: "",
    lan: "",
    wifi: "",
  });

  useEffect(() => {
    if (editField) {
      setInitialValues({
        versionFirmware: editField?.firmware || "",
        versionHardware: editField?.hardware || "",
        wan: editField?.connectionStatus?.WanIpAddress || "",
        lan: editField?.connectionStatus?.LanIpAddress || "",
        wifi: editField?.connectionStatus?.WiFiName || "",
      });
    }
  }, [editField]);

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
