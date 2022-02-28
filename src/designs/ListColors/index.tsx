import ColorBlock from "designs/ColorBlock";
import { ColorSelectorContainer } from "./styles";

export type ISize = "md" | "sm";

type IListColorsProps<T> = {
  className?: string;
  colors: T[];
  // This will help us know what is hex or rgb string of each T
  // ex:  return "#000" | "rbg(0, 0, 0)"
  getColor: (option: T | undefined) => string | undefined;
  size?: ISize;
};

const ListColors = <T,>({
  colors,
  getColor,
  className = "",
  size = "md",
}: IListColorsProps<T>) => {
  return (
    <ColorSelectorContainer className={className}>
      {colors?.map(item => {
        const color = getColor(item);
        if (!color) return null;

        return <ColorBlock size={size === "md" ? 20 : 15} hex={color} />;
      })}
    </ColorSelectorContainer>
  );
};

export default ListColors;
