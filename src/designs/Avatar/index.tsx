import SkeletonAvatar from "assets/images/avatar.png";

import { AvatarContainer, Img } from "./styles";

interface IAvatarProps {
  className?: string;
  url?: any;
}

const Avatar: React.FC<IAvatarProps> = props => {
  const { className, url } = props;
  return (
    <AvatarContainer className={className}>
      <Img
        src={url?.default || url?.medium || url?.small || SkeletonAvatar}
        alt="avatar"
      />
    </AvatarContainer>
  );
};

export default Avatar;
