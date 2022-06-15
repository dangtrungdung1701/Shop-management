import { useField, useFormikContext } from "formik";
import React, { memo } from "react";
import ReactQuill, { Quill } from "react-quill";

import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import FormControlLabel from "common/styles/FormControlLabel";
import HiddenInput from "common/styles/HiddenInput";

import { TextEditorContainer } from "./styles";

import "react-quill/dist/quill.snow.css";

const Size = Quill.import("attributors/style/size");
const sizes = ["14px", "16px", "18px", "20px", "24px", "30px"];

Quill.register(Size, true);

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: sizes }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
    [{ font: [] }],
    ["link", "image", "video"],
  ],
};

interface IRichEditorProps {
  name: string;
  className?: string;
  label?: string;
  /**
   * @Note Be careful when use this callback.
   * I prefer you use useRef to up date the value
   * */
  onChange?: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

const RichTextEditor: React.FC<IRichEditorProps> = props => {
  const {
    name,
    label = "",
    className = "",
    required = false,
    onChange,
    placeholder = "",
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const isError = Boolean(!!meta.error && !!meta.touched);

  const handleChange = (value: string) => {
    onChange && onChange(value);
    setFieldValue(name, value);
  };

  return (
    <TextEditorContainer sizes={sizes} className={className}>
      <FormControlLabel isError={isError} required={required}>
        {label}
      </FormControlLabel>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={field.value || ""}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {isError && <FormControlErrorHelper>{meta.error}</FormControlErrorHelper>}
      <HiddenInput {...field} />
    </TextEditorContainer>
  );
};

export default memo(RichTextEditor);
