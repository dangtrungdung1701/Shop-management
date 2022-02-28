import { ThumbnailContainer, Image } from "./styles";

interface IThumbnailProps {
  src: string | undefined;
  className?: string;
}

const Thumbnail: React.FC<IThumbnailProps> = ({ src, className = "" }) => {
  return (
    <ThumbnailContainer className={className}>
      <Image src={src} alt="" height="auto" />
    </ThumbnailContainer>
  );
};

export default Thumbnail;
