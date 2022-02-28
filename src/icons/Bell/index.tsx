/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const BellIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.0165 2.42501C7.25816 2.42501 5.0165 4.66668 5.0165 7.42501V9.83335C5.0165 10.3417 4.79983 11.1167 4.5415 11.55L3.58316 13.1417C2.9915 14.125 3.39983 15.2167 4.48316 15.5833C8.07483 16.7833 11.9498 16.7833 15.5415 15.5833C16.5498 15.25 16.9915 14.0583 16.4415 13.1417L15.4832 11.55C15.2332 11.1167 15.0165 10.3417 15.0165 9.83335V7.42501C15.0165 4.67501 12.7665 2.42501 10.0165 2.42501Z"
      stroke="currentColor"
      strokeWidth="1.5"
      stroke-miterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M11.5579 2.66668C11.2996 2.59168 11.0329 2.53334 10.7579 2.50001C9.95794 2.40001 9.19128 2.45834 8.47461 2.66668C8.71628 2.05001 9.31628 1.61668 10.0163 1.61668C10.7163 1.61668 11.3163 2.05001 11.5579 2.66668Z"
      stroke="currentColor"
      strokeWidth="1.5"
      stroke-miterlimit="10"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.5166 15.8833C12.5166 17.2583 11.3916 18.3833 10.0166 18.3833C9.33327 18.3833 8.69993 18.1 8.24993 17.65C7.79993 17.2 7.5166 16.5667 7.5166 15.8833"
      stroke="currentColor"
      strokeWidth="1.5"
      stroke-miterlimit="10"
    />
  </svg>
);

export default BellIcon;
