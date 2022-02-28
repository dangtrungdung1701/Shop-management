import withErrorBoundary from "common/HOC/withErrorBoundary";
import React from "react";

interface ISVGProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  /**
   * @description Name of svg file
   * @example
   *  We have a folder tree like this
   *   + assets/svg
   *   |-- dog.svg    --> <SVG name="dog" />
   *   |-- drawer
   *       |-- ant.svg --> <SVG name="animal/ant" />
   */
  name: string;
}

const SVG: React.FC<ISVGProps> = props => {
  const { name = "", ...rest } = props;

  if (!name) return null;

  return (
    <img
      src={require(`assets/svg/${name}.svg`)?.default}
      alt={`${name} icon`}
      width="24"
      height="24"
      {...(rest as any)}
    />
  );
};

export default withErrorBoundary(SVG);
