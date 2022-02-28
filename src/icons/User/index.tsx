/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const UserIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.99967 10C12.3009 10 14.1663 8.13452 14.1663 5.83333C14.1663 3.53215 12.3009 1.66667 9.99967 1.66667C7.69849 1.66667 5.83301 3.53215 5.83301 5.83333C5.83301 8.13452 7.69849 10 9.99967 10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.1585 18.3333C17.1585 15.1083 13.9501 12.5 10.0001 12.5C6.05013 12.5 2.8418 15.1083 2.8418 18.3333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default UserIcon;
