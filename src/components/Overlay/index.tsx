import { OverlayContainer } from "./style";

interface IOverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

const Overlay: React.FC<IOverlayProps> = ({ isOpen, onClick }) => {
  return (
    <OverlayContainer onClick={onClick} className={isOpen ? "show" : ""} />
  );
};

export default Overlay;
