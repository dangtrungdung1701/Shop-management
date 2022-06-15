import { MouseEvent, useEffect, useRef, useState } from "react";
import { useField, useFormikContext } from "formik";

import TransparentBG from "assets/images/product/transparent-pattern.png";

import FormControlLabel from "common/styles/FormControlLabel";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";

type IPosition = {
  x: number;
  y: number;
};

interface ISelectEditAreaProps {
  defaultRect?: any;
  name: string;
  upperImage: string;
  className?: string;
  onDrag: (rect: { x: number; y: number; w: number; h: number }) => void;
  required?: boolean;
  label: string;
}

const SIZE = 500;

const SelectEditArea: React.FC<ISelectEditAreaProps> = ({
  defaultRect,
  name,
  required,
  label,
  className = "",
  upperImage: heatherImage,
  onDrag,
}) => {
  const [pos, setPos] = useState<IPosition>({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState<IPosition>(() => {
    const { x = 0, y = 0 } = defaultRect || {};
    return {
      x: x * SIZE,
      y: y * SIZE,
    };
  });
  const [stopPos, setStopPos] = useState<IPosition>(() => {
    const { x = 0, y = 0, w = 0, h = 0 } = defaultRect || {};
    return {
      x: (x + w) * SIZE,
      y: (y + h) * SIZE,
    };
  });
  const [isSelected, setIsSelected] = useState(
    Object.keys(defaultRect || {})?.length > 0,
  );
  const [isDragging, setIsDragging] = useState(false);
  const rectRef = useRef<HTMLDivElement>(null);
  const { setFieldValue } = useFormikContext();

  const [_, meta] = useField(name);
  const isError = Boolean(!!meta.error && !!meta.touched);

  useEffect(() => {
    const { x = 0, y = 0, w = 0, h = 0 } = defaultRect || {};
    setStartPos({ x: x * SIZE, y: y * SIZE });
    setStopPos({
      x: (x + w) * SIZE,
      y: (y + h) * SIZE,
    });
    setIsSelected(Object.keys(defaultRect || {})?.length > 0);
  }, [defaultRect]);

  useEffect(() => {
    if (isSelected) {
      const xStart = startPos.x / SIZE;
      const yStart = startPos.y / SIZE;
      const xEnd = stopPos.x / SIZE;
      const yEnd = stopPos.y / SIZE;

      const rect = {
        x: xStart,
        y: yStart,
        w: xEnd - xStart,
        h: yEnd - yStart,
      };

      onDrag(rect);
      setFieldValue(name, JSON.stringify(rect));
    }
  }, [isSelected]);

  const getCurrentPosition = (e: MouseEvent<any, any>): IPosition => {
    if (!rectRef.current) return { x: 0, y: 0 };

    const offset = rectRef.current.getBoundingClientRect();

    const pos = {
      x: e.clientX - offset.left,
      y: e.clientY - offset.top,
    };

    return pos;
  };

  return (
    <div className={"relative " + className} style={{ width: SIZE + "px" }}>
      <FormControlLabel isError={isError} required={required}>
        {label}
      </FormControlLabel>
      <div
        style={{
          width: SIZE + "px",
          height: SIZE + "px",
          backgroundImage: `url(${TransparentBG})`,
        }}
      >
        <div
          className="relative bg-cover"
          ref={rectRef}
          style={{
            width: SIZE + "px",
            height: SIZE + "px",
            backgroundImage: `url(${heatherImage})`,
          }}
          onMouseDown={e => {
            setIsDragging(true);
            setIsSelected(false);
            setStartPos(getCurrentPosition(e));
          }}
          onMouseUp={e => {
            setIsDragging(false);
            setIsSelected(true);
            setStopPos(getCurrentPosition(e));
            setPos({ x: 0, y: 0 });
          }}
          onMouseMove={e => {
            if (isDragging) setPos(getCurrentPosition(e));
          }}
        >
          {isDragging && !isSelected && (
            <div
              style={{
                position: "absolute",
                left: startPos.x + "px",
                top: startPos.y + "px",
                width: pos.x - startPos.x + "px",
                height: pos.y - startPos.y + "px",
                background: "rgba(31, 213, 237, .3)",
              }}
            />
          )}
          {isSelected && (
            <div
              style={{
                position: "absolute",
                left: startPos.x + "px",
                top: startPos.y + "px",
                width: stopPos.x - startPos.x + "px",
                height: stopPos.y - startPos.y + "px",
                background: "rgba(61, 161, 204, .15)",
                border: "2px dashed #05e2ff",
              }}
            />
          )}
        </div>
      </div>
      <p className="w-full mt-2 italic text-center text-neutral-2 text-md">
        Please drag and drop your mouse to select the edit area
      </p>
      {isError && <FormControlErrorHelper>{meta.error}</FormControlErrorHelper>}
    </div>
  );
};

export default SelectEditArea;
