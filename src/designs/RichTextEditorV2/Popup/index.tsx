import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Quill } from "react-quill";

import Dialog from "components/Dialog";
import DialogHeader from "components/Dialog/Header";

import Input from "designs/Input";
import Button from "designs/Button";

import { DialogContainer, Form } from "./styles";

import { IVisible } from "../index";

const Parchment = Quill.import("parchment");
export interface IPopupProps {
  enable: boolean;
  editField: HTMLImageElement | null;
  setVisible: (value: IVisible) => void;
}

interface IFormValue {
  alt: string;
}

const validationSchema = yup
  .object()
  .shape<{ [key in keyof IFormValue]: any }>({
    alt: yup.string().required("Please enter alt image"),
  });

const Popup: React.FC<IPopupProps> = props => {
  const { enable, editField, setVisible } = props;
  const [initialValues, setInitialValues] = useState<IFormValue>({
    alt: "",
  });

  useEffect(() => {
    if (editField && editField.alt) {
      setInitialValues({
        alt: editField.alt,
      });
    } else {
      setInitialValues({
        alt: "",
      });
    }
  }, [editField]);

  const onHandleClose = () => {
    setVisible({
      enable: false,
      editField: null,
    });
  };

  const onHandleSubmit = (value: IFormValue) => {
    if (editField) {
      let blot = Parchment.find(editField);
      blot.format("alt", value.alt);
      onHandleClose();
    }
  };
  return (
    <Dialog onClose={onHandleClose} open={enable}>
      <DialogContainer>
        <DialogHeader title={editField && editField.alt ? "Edit" : "Create"} />
        <Formik
          initialValues={initialValues}
          onSubmit={onHandleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Input name="alt" label="Alt image" required />
            <div className="flex justify-end gap-1">
              <Button onClick={onHandleClose} variant="secondary">
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Formik>
      </DialogContainer>
    </Dialog>
  );
};

export default Popup;
