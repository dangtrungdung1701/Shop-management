/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const ShowPasswordIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.25 9.64999C18.94 6.01999 15.56 3.92999 12 3.92999C10.22 3.92999 8.49 4.44999 6.91 5.41999C5.33 6.39999 3.91 7.82999 2.75 9.64999C1.75 11.22 1.75 13.77 2.75 15.34C5.06 18.98 8.44 21.06 12 21.06C13.78 21.06 15.51 20.54 17.09 19.57C18.67 18.59 20.09 17.16 21.25 15.34C22.25 13.78 22.25 11.22 21.25 9.64999ZM12 16.54C9.76 16.54 7.96 14.73 7.96 12.5C7.96 10.27 9.76 8.45999 12 8.45999C14.24 8.45999 16.04 10.27 16.04 12.5C16.04 14.73 14.24 16.54 12 16.54Z"
      fill="currentColor"
    />
    <path
      d="M12.0004 9.64001C10.4304 9.64001 9.15039 10.92 9.15039 12.5C9.15039 14.07 10.4304 15.35 12.0004 15.35C13.5704 15.35 14.8604 14.07 14.8604 12.5C14.8604 10.93 13.5704 9.64001 12.0004 9.64001Z"
      fill="currentColor"
    />
  </svg>
);

export default ShowPasswordIcon;
