interface IColorPickerProps {
  className?: string;
  hex: string;
  onChange: (hex: string) => void;
}

const ColorPicker: React.FC<IColorPickerProps> = ({
  onChange,
  hex,
  className = "",
}) => {
  return (
    <input
      value={hex}
      type="color"
      className={className}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default ColorPicker;
