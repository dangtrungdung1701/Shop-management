import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";

import FormControlLabel from "common/styles/FormControlLabel";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";

import LinearProgressWithLabel from "components/LinearProgressWithLabel";

import UploadFileIcon from "icons/UploadFileIcon";
import ImageUploadLayout from "layouts/ImageUpload";

import {
  SingleImageUploaderContainer,
  HiddenInput,
  ImageUploadContainer,
  SkeletonContainer,
  SkeletonMessage,
} from "./styles";

interface ISingleFileUploaderProps {
  className?: string;
  name: string;
  file?: File | string | undefined;
  label: string;
  subLabel?: string;
  required?: boolean;
  onChange?: (file: File, fileName: string, base64AudioFile: string) => void;
  text?: string;
  /**
   * @example aspect={16/9}
   */
  aspect?: number;
  isCropImage?: boolean;
}

const SingleFileUploader: React.FC<ISingleFileUploaderProps> = props => {
  const {
    file = "",
    name = "",
    label = "",
    text = "Kéo và thả tệp tin ở đây",
    subLabel = "(Định dạng file .mp3, .m4a, .wav, .ogg)",
    required = false,
    onChange,
    className = "",
  } = props;

  const [fileSelected, setFileSelected] = useState<File | undefined>();
  const [displayFile, setDisplayFile] = useState<string>("");

  const [progress, setProgress] = useState<number>(0);

  const [field, meta] = useField(name);
  const isError = Boolean(!!meta.error && !!meta.touched);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (file) {
      setDisplayFile(file as string);
    }
  }, [file]);

  const readProjectFile = (readFile?: File) => {
    if (!readFile) return;

    return new Promise<string | null>(resolve => {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          setProgress(0);
          resolve(reader.result as any);
        },
        false,
      );
      reader.readAsDataURL(readFile);
      reader.addEventListener("progress", e => {
        const progressFile = Math.floor((100 * e.loaded) / e.total);
        setProgress(progressFile);
      });
    });
  };

  const loadFile = async (fileUpload: File) => {
    const base64AudioFile = await readProjectFile(fileUpload);
    setDisplayFile(fileUpload?.name);
    onChange &&
      onChange(fileUpload, fileUpload?.name as string, base64AudioFile!);
    setFieldValue(name, "UPLOADED");
  };

  const handleUploadFile = (files: File[]) => {
    if (!files) return;
    const newFile = files[0];
    setFileSelected(newFile);
    loadFile(newFile);
  };

  return (
    <>
      <SingleImageUploaderContainer className={className}>
        <FormControlLabel
          subTitle={subLabel}
          isError={isError}
          required={required}
        >
          {label}
        </FormControlLabel>
        <ImageUploadLayout onUpload={handleUploadFile}>
          <ImageUploadContainer isError={isError}>
            {displayFile ? (
              <p className="font-medium leading-none">{displayFile}</p>
            ) : (
              <SkeletonContainer>
                <UploadFileIcon />
                <SkeletonMessage>{text}</SkeletonMessage>
              </SkeletonContainer>
            )}
          </ImageUploadContainer>
        </ImageUploadLayout>

        {isError && (
          <FormControlErrorHelper>{meta.error}</FormControlErrorHelper>
        )}

        <HiddenInput {...field} />
      </SingleImageUploaderContainer>
      {progress > 0 && progress < 100 && (
        <LinearProgressWithLabel value={progress} />
      )}
    </>
  );
};

export default SingleFileUploader;
