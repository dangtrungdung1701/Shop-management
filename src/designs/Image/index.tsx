import React from "react";

import withErrorBoundary from "common/HOC/withErrorBoundary";

/**
 * @example
 *  We have a folder tree like this
 *   + assets/image
 *     |-- dog.png    --> <Image name="dog.png" />
 *     |-- drawer
 *       |-- ant.jpg --> <Image name="animal/ant.jpg" />
 */
type ISVGProps = {
  alt?: string;
  enableDrag?: boolean;
} & (
  | {
      name: string;
      readonly src?: undefined;
    }
  | {
      readonly name?: undefined;
      src: string;
    }
) &
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;

const Image: React.FC<ISVGProps> = props => {
  const {
    name = "",
    alt,
    className = "",
    enableDrag = false,
    src,
    ...rest
  } = props;

  if (!name && !src) return null;

  return (
    <img
      src={src || require(`assets/images/${name}`)?.default}
      alt={alt || `${name} image`}
      className={`object-cover ${
        enableDrag ? "pointer-events-auto " : "pointer-events-none select-none"
      } ${className}`}
      {...(rest as any)}
    />
  );
};

export default withErrorBoundary(Image);
