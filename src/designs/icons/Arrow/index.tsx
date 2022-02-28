import React from "react";
import cn from "classnames";

interface IArrowIcon {
  direction: "DOWN" | "UP" | "LEFT" | "RIGHT";
  style?: React.CSSProperties;
  className?: string;
}

const DEG_ROTATE = {
  DOWN: 0,
  UP: 180,
  LEFT: 90,
  RIGHT: 270,
};

export default function ArrowIcon(props: IArrowIcon) {
  const { className = "", direction = "DOWN", style = {} } = props;

  return (
    <svg
      className={cn("arrow-icon icon", className)}
      style={{
        transform: `rotate(${DEG_ROTATE[direction]}deg)`,
        transition: "0.3s",
        ...style,
      }}
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.9797 5.31312C3.15721 5.13561 3.43499 5.11947 3.63073 5.26471L3.68681 5.31312L7.99992 9.626L12.313 5.31312C12.4905 5.13561 12.7683 5.11947 12.9641 5.26471L13.0201 5.31312C13.1976 5.49063 13.2138 5.76841 13.0686 5.96415L13.0201 6.02023L8.35347 10.6869C8.17596 10.8644 7.89819 10.8805 7.70244 10.7353L7.64637 10.6869L2.9797 6.02023C2.78444 5.82496 2.78444 5.50838 2.9797 5.31312Z" />
    </svg>
  );
}
