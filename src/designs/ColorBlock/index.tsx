import { ColorBlockContainer, SubColorBlock } from "./styles";

interface IColorBlockProps {
  hex: string | undefined;
  size?: number;
}

const ColorBlock: React.FC<IColorBlockProps> = ({ hex, size = 24 }) => {
  const hexes = hex?.split("/") || [];
  const colorDisplay = hexes[0];

  return (
    <ColorBlockContainer size={size} style={{ background: colorDisplay }}>
      {hexes.length === 2 && <SubColorBlock style={{ background: hexes[1] }} />}
    </ColorBlockContainer>
  );
};

export default ColorBlock;
