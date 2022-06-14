/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="#..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const EmergencyIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 22H22"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M12 6C7.03 6 3 10.03 3 15V22H21V15C21 10.03 16.97 6 12 6Z"
      fill="currentColor"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M12 2V3"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M4 4L5 5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M20 4L19 5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
);

export default EmergencyIcon;
