import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import InputRange from "react-input-range";
import { Point, Area } from "react-easy-crop/types";

import { getCroppedImg, readFile } from "common/functions";

import TransparentBG from "assets/images/product/transparent-pattern.png";

import Button from "designs/Button";
import Dialog from "components/Dialog";

import {
  ActionButtons,
  RangeContainer,
  DialogContainer,
  Content,
  CropperImageContainer,
} from "./styles";

import "react-input-range/lib/css/index.css";

interface IImageCropper {
  image: File | undefined;
  /**
   * @example
   *  aspect = 1/2
   *  aspect = 19/6
   * @default value = 1
   */
  aspect?: number;
  onClose: () => void;
  onConfirm: (file: File, base64File: string) => void;
  isOpen: boolean;
  shape?: "rect" | "round";
  fileType?: "image/jpeg" | "image/png";
}

const ImageCropper: React.FC<IImageCropper> = props => {
  const {
    image,
    aspect = 1,
    onConfirm,
    onClose,
    isOpen = false,
    shape = "rect",
    fileType = "image/jpeg",
  } = props;
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    loadImage();
  }, [image]);

  useEffect(() => {
    if (!isOpen) {
      setZoom(1);
      setImageSrc("");
    }
  }, [isOpen]);

  const loadImage = async () => {
    const imageSrc = await readFile(image);
    setImageSrc(imageSrc as string);
  };

  const handleCropComplete = useCallback(
    (croppedArea: Area, _croppedAreaPixels: Area) => {
      setCroppedAreaPixels(_croppedAreaPixels);
    },
    [],
  );

  const handleConfirm = async () => {
    const croppedImage = await getCroppedImg(
      imageSrc as any,
      croppedAreaPixels,
      fileType,
    );
    onConfirm && onConfirm(croppedImage.file, croppedImage.base64File);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="w-full max-w-phone">
      <DialogContainer
        tabIndex={0}
        onKeyDown={e => e.key === "Enter" && handleConfirm()}
      >
        <Content>
          <CropperImageContainer
            style={{
              background: `url(${TransparentBG})`,
            }}
          >
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              onZoomChange={setZoom}
              cropShape={shape}
            />
          </CropperImageContainer>
          <RangeContainer>
            <InputRange
              value={Number(zoom.toFixed(2))}
              minValue={0.5}
              maxValue={3}
              step={0.01}
              formatLabel={value => `${Math.ceil(value * 100)}%`}
              onChange={value => {
                setZoom(value as number);
              }}
            />
          </RangeContainer>
        </Content>
        <ActionButtons>
          <Button variant="secondary" onClick={handleClose}>
            Discard
          </Button>
          <Button variant="primary" onClick={handleConfirm} type="submit">
            Accept
          </Button>
        </ActionButtons>
      </DialogContainer>
    </Dialog>
  );
};

export default ImageCropper;
