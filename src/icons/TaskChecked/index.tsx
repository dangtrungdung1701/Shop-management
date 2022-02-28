/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const TaskCheckIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
      fill="currentColor"
    />
    <path
      d="M7.44466 14.5111L12.5866 19.653C16.8453 18.5174 19.9999 14.6372 19.9999 10C19.9999 9.90539 19.9999 9.81075 19.9999 9.71611L15.962 5.99371L7.44466 14.5111Z"
      fill="currentColor"
    />
    <path
      d="M10.2537 12.2397C10.6954 12.6814 10.6954 13.4385 10.2537 13.8801L9.33891 14.7949C8.89727 15.2366 8.14017 15.2366 7.69853 14.7949L3.69223 10.7571C3.25059 10.3154 3.25059 9.55833 3.69223 9.11669L4.60705 8.20187C5.04869 7.76023 5.80579 7.76023 6.24743 8.20187L10.2537 12.2397Z"
      fill="white"
    />
    <path
      d="M13.756 5.26812C14.1977 4.82648 14.9547 4.82648 15.3964 5.26812L16.3112 6.18295C16.7529 6.62459 16.7529 7.38168 16.3112 7.82332L9.37115 14.7318C8.92951 15.1735 8.17242 15.1735 7.73077 14.7318L6.81595 13.817C6.37431 13.3754 6.37431 12.6183 6.81595 12.1766L13.756 5.26812Z"
      fill="white"
    />
  </svg>
);

export default TaskCheckIcon;
