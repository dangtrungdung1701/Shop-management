import { useCallback, useState } from "react";
import { randomId } from "common/functions";
import { getFilesFromFileList } from "common/functions";
import { useDropzone } from "react-dropzone";
import { ImageUploadLayoutContainer, Overlay, Label } from "./styles";

interface IImageUploadLayoutProps {
  className?: string;
  onStartUpload?: () => void;
  onUpload?: (files: File[]) => void;
  disabled?: boolean;
}

const ImageUploadLayout: React.FC<IImageUploadLayoutProps> = props => {
  const {
    disabled = false,
    className = "",
    children,
    onUpload,
    onStartUpload,
  } = props;
  const [id] = useState(randomId());

  const onDrop = useCallback(fileList => {
    if (!fileList?.length) return;
    const files = getFilesFromFileList(fileList);
    onUpload && onUpload(files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropAccepted: onStartUpload,
  });

  return (
    <ImageUploadLayoutContainer disabled={disabled} className={className}>
      <Label htmlFor={id} className={className}>
        <div
          {...getRootProps({ className: "dropzone" })}
          className="relative flex items-center justify-center w-full h-full focus:outline-none"
        >
          {children}
          <input {...getInputProps()} />
          {isDragActive && <Overlay />}
        </div>
      </Label>
    </ImageUploadLayoutContainer>
  );
};

export default ImageUploadLayout;
