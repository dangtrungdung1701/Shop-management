import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import Dialog from "components/Dialog";

import Input from "designs/Input";
import Button from "designs/Button";

import { DialogContainer, Title, Form, Other } from "./styles";

import { ITab } from "../index";

interface IDialogProps {
  editDialog: boolean;
  setEditDialog: (value: boolean) => void;
  currentRecord: ITab | null;
  tabs: ITab[];
  setTabs: (value: ITab[]) => void;
}

interface IFormValue {
  name: string;
}

const validationSchema = yup
  .object()
  .shape<{ [key in keyof IFormValue]: any }>({
    name: yup.string().required("Name tab is required!"),
  });

const DialogComponent: React.FC<IDialogProps> = ({
  editDialog,
  setEditDialog,
  currentRecord,
  tabs,
  setTabs,
}) => {
  const [initialValues, setIntitalValues] = useState<IFormValue>({
    name: "",
  });

  const onHandleSubmit = (value: IFormValue) => {
    if (currentRecord) {
      let arrIndex = -1;
      tabs.forEach((record, index) => {
        if (record.id === currentRecord?.id) {
          arrIndex = index;
        }
      });

      tabs[arrIndex].name = value.name;
      setTabs([...tabs]);
      setEditDialog(false);
    }
  };

  const onClickCancle = () => {
    setEditDialog(false);
  };

  useEffect(() => {
    if (currentRecord) {
      setIntitalValues({
        name: currentRecord.name,
      });
    }
  }, [currentRecord]);

  return (
    <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
      <DialogContainer>
        <Title>Edit</Title>

        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onHandleSubmit}
        >
          <Form>
            <Input
              name="name"
              label="Name tab"
              placeholder="Enter your name tab"
              required
            />
            <Other>
              <Button onClick={onClickCancle} variant="secondary">
                Cancle
              </Button>
              <Button type="submit">Submit</Button>
            </Other>
          </Form>
        </Formik>
      </DialogContainer>
    </Dialog>
  );
};

export default DialogComponent;
