import React, { useState, memo } from "react";
import { useField, useFormikContext } from "formik";
import ReactQuill, { Quill } from "react-quill";

import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import FormControlLabel from "common/styles/FormControlLabel";
import HiddenInput from "common/styles/HiddenInput";

import { TextEditorContainer } from "./styles";

import Popup from "./Popup";

import "react-quill/dist/quill.snow.css";

const quillTable = require("quill-table");
const ImageResize = require("@deedmob/quill-image-resize-alt-module");

const Size = Quill.import("attributors/style/size");

const sizes = ["14px", "16px", "18px", "20px", "24px", "30px"];

Quill.register("modules/imageResize", ImageResize);
Quill.register(Size, true);
Quill.register(quillTable.TableCell);
Quill.register(quillTable.TableRow);
Quill.register(quillTable.Table);
Quill.register(quillTable.Contain);
Quill.register("modules/table", quillTable.TableModule);

const maxRows = 10;
const maxCols = 5;

let tableOptions: string[] = [];
for (let r = 1; r <= maxRows; r++) {
  for (let c = 1; c <= maxCols; c++) {
    tableOptions.push("newtable_" + r + "_" + c);
  }
}

const modules = {
  table: true,
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["clean"], // remove formatting button
      ["link", "image", "video"],
      [
        { table: tableOptions },
        { table: "append-row" },
        { table: "append-col" },
      ],
      ["spanblock"],
    ],
  },
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
export interface IVisible {
  enable: boolean;
  editField: HTMLImageElement | null;
}
const RichTextEditorV2: React.FC<IRichEditorProps> = props => {
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

  const [visible, setVisible] = useState<IVisible>({
    enable: false,
    editField: null,
  });

  const handleChange = (value: string) => {
    onChange && onChange(value);
    setFieldValue(name, value);
  };

  const onHandleClick = (e: any) => {
    if (e.target.tagName.toUpperCase() === "IMG") {
      setVisible({
        enable: true,
        editField: e.target,
      });
    }
  };

  return (
    <>
      <TextEditorContainer
        sizes={sizes}
        className={className}
        onClick={e => onHandleClick(e)}
      >
        <FormControlLabel isError={isError} required={required}>
          {label}
        </FormControlLabel>
        <ReactQuill
          modules={modules}
          value={field.value || ""}
          onChange={handleChange}
          theme="snow"
          placeholder={placeholder}
        />
        {isError && (
          <FormControlErrorHelper>{meta.error}</FormControlErrorHelper>
        )}
        <HiddenInput {...field} />
      </TextEditorContainer>
      <Popup {...visible} setVisible={setVisible} />
    </>
  );
};

export default memo(RichTextEditorV2);
