import React, { useState, useEffect, ReactNode } from "react";
import { useField, useFormikContext } from "formik";
import { SingleImageUploaderContainer, HiddenInput } from "./styles";
import { readFile } from "common/functions";
import ImageCropper from "components/ImageCropper";
import { IBase64Image } from "typings";
import ImageUploadLayout from "layouts/ImageUpload";
import FormControlLabel from "common/styles/FormControlLabel";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";

interface IUpperImageUploaderProps {
  className?: string;
  ButtonMenu: ReactNode;
  name: string;
  image: File | string | undefined | null;
  label: string;
  subLabel?: string;
  required?: boolean;
  onChange?: (file: File, base64Image: IBase64Image) => void;
  text?: string;
  isCropImage?: boolean;
}

const UpperImageButton: React.FC<IUpperImageUploaderProps> = props => {
  const {
    image,
    name = "",
    label = "",
    subLabel = "File must be png!",
    required = false,
    onChange,
    isCropImage = true,
    ButtonMenu,
    className = "",
  } = props;

  const [fileSelected, setFileSelected] = useState<File | undefined>();
  const [displayImage, setDisplayImage] = useState<IBase64Image | string>("");
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [openCropImage, setOpenCropImage] = useState(false);

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const isError = Boolean(!!meta.error && !!meta.touched);

  useEffect(() => {
    if (!croppedFile) {
      const imageUrl: string = image as string;
      setDisplayImage(imageUrl);
    }
  }, [image]);

  const handleUploadRawImage = (files: File[]) => {
    if (!files) return;

    const file = files[0];
    setFileSelected(file);
    if (!isCropImage) {
      loadImage(file);
    } else {
      setOpenCropImage(true);
    }
  };

  const handleCloseImageCropper = () => {
    setOpenCropImage(false);
  };
  const loadImage = async (image: File) => {
    const imageSrc = await readFile(image);
    setDisplayImage(imageSrc as string);
    onChange && onChange(image, imageSrc as IBase64Image);
  };
  const handleCroppedImage = (file: File, base64File: string) => {
    setDisplayImage(base64File);
    setCroppedFile(file);
    onChange && onChange(file, base64File);
    setOpenCropImage(false);
    setFieldValue(name, "UPLOADED");
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
        <ImageUploadLayout className="w-full" onUpload={handleUploadRawImage}>
          {ButtonMenu}
        </ImageUploadLayout>

        {isError && (
          <FormControlErrorHelper>{meta.error}</FormControlErrorHelper>
        )}

        <HiddenInput {...field} />
      </SingleImageUploaderContainer>
      <ImageCropper
        aspect={1 / 1}
        image={fileSelected}
        isOpen={openCropImage}
        onClose={handleCloseImageCropper}
        onConfirm={handleCroppedImage}
        fileType="image/png"
      />
    </>
  );
};

export default UpperImageButton;
