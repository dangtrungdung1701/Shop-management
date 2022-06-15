import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";

import FormControlLabel from "common/styles/FormControlLabel";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";

import ImageCropper from "components/ImageCropper";

import SVG from "designs/SVG";
import IconButton from "designs/IconButton";

import AddImageIcon from "icons/AddImage";
import ImageUploadLayout from "layouts/ImageUpload";

import { IBase64Image } from "typings";

import {
  MultipleImageUploaderContainer,
  HiddenInput,
  Image,
  SkeletonMessage,
  ImageContainer,
} from "./styles";

interface IMultipleImageUploaderProps {
  className?: string;
  name: string;
  images: File[] | string[] | undefined | null;
  label: string;
  required?: boolean;
  onChange?: (files: File[], base64Images: IBase64Image[]) => void;
  text?: string;
  imageType?: "image/jpeg" | "image/png";
  /**
   * @example aspect={16/9}
   */
  aspect?: number;
}

const MultipleImageUploader: React.FC<IMultipleImageUploaderProps> = props => {
  const {
    images = [],
    name = "",
    label = "",
    text = "Drag your image here",
    aspect = 1,
    required = false,
    onChange,
    className = "",
    imageType = "image/jpeg",
  } = props;
  const [fileSelected, setFileSelected] = useState<File | undefined>();
  const [displayImages, setDisplayImages] = useState<IBase64Image[] | string[]>(
    [],
  );
  const [files, setFiles] = useState<File[]>([]);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [openCropImage, setOpenCropImage] = useState(false);

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const isError = Boolean(!!meta.error && !!meta.touched);

  useEffect(() => {
    if (!croppedFile) {
      setDisplayImages(images as string[]);
      setFieldValue(name, images?.length || "");
    }
  }, [images]);

  const handleUploadRawImage = (files: File[]) => {
    if (!files) return;

    const file = files[0];
    setFileSelected(file);
    setOpenCropImage(true);
  };

  const handleCloseImageCropper = () => {
    setOpenCropImage(false);
  };

  const handleCroppedImage = (file: File, base64File: string) => {
    try {
      const newDisplayImages = [...displayImages, base64File];
      const newFiles = [...files, file];
      setDisplayImages(newDisplayImages);
      setFiles(newFiles);
      setCroppedFile(file);
      setOpenCropImage(false);

      onChange && onChange(newFiles, newDisplayImages);
      setFieldValue(name, newDisplayImages?.length);
    } catch (error) {
      console.error(error);
    }
  };

  const removeImage = (index: number) => {
    const newDisplayImages = displayImages.filter((_, i) => i !== index);
    const newFiles = files.filter((_, i) => i !== index);
    setDisplayImages(newDisplayImages);
    setFiles(newFiles);

    onChange && onChange(newFiles, newDisplayImages);
    setFieldValue(name, newDisplayImages?.length);
  };

  return (
    <>
      <MultipleImageUploaderContainer className={className}>
        <FormControlLabel isError={isError} required={required}>
          {label}
        </FormControlLabel>

        <div className="grid w-full grid-cols-3 gap-1 phone:grid-cols-4 laptop:grid-cols-5">
          {displayImages?.map((image, index) => (
            <div className="relative" key={index}>
              <ImageContainer>
                <Image
                  src={image || ""}
                  alt="Image uploader"
                  width="auto"
                  height="200"
                />
              </ImageContainer>
              <IconButton
                tooltip="Remove"
                className="absolute top-0.5 right-0.5 cursor-pointer w-2.5 h-2.5"
              >
                <SVG
                  name="common/remove-image"
                  width="24"
                  height="24"
                  onClick={() => removeImage(index)}
                />
              </IconButton>
            </div>
          ))}
          <ImageContainer
            className={`border border-dashed ${
              isError ? "border-accent" : "border-neutral-2"
            }`}
          >
            <ImageUploadLayout
              className="absolute inset-0 flex items-center justify-center w-full h-full "
              onUpload={handleUploadRawImage}
            >
              <div
                className={`flex flex-col items-center  ${
                  isError ? "text-accent" : "text-neutral-3"
                }`}
              >
                <AddImageIcon className="w-1/3" />
                <SkeletonMessage>{text}</SkeletonMessage>
              </div>
            </ImageUploadLayout>
          </ImageContainer>
        </div>

        {isError && (
          <FormControlErrorHelper>{meta?.error}</FormControlErrorHelper>
        )}

        <HiddenInput {...field} />
      </MultipleImageUploaderContainer>

      <ImageCropper
        fileType={imageType}
        aspect={aspect}
        image={fileSelected}
        isOpen={openCropImage}
        onClose={handleCloseImageCropper}
        onConfirm={handleCroppedImage}
      />
    </>
  );
};

export default MultipleImageUploader;
