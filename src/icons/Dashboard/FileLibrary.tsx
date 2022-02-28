/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const FileLibraryIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clip-path="url(#clip0)">
      <path
        d="M6.24941 19.5001C4.64841 19.5001 3.22441 18.4751 2.70741 16.9491L2.67241 16.8341C2.55041 16.4301 2.49941 16.0901 2.49941 15.7501V8.93213L0.0734114 17.0301C-0.238589 18.2211 0.472411 19.4561 1.66541 19.7851L17.1284 23.9261C17.3214 23.9761 17.5144 24.0001 17.7044 24.0001C18.7004 24.0001 19.6104 23.3391 19.8654 22.3651L20.7664 19.5001H6.24941Z"
        fill="currentColor"
      />
      <path
        d="M9 9.00024C10.103 9.00024 11 8.10324 11 7.00024C11 5.89724 10.103 5.00024 9 5.00024C7.897 5.00024 7 5.89724 7 7.00024C7 8.10324 7.897 9.00024 9 9.00024Z"
        fill="currentColor"
      />
      <path
        d="M21.5 2.00024H6.5C5.122 2.00024 4 3.12224 4 4.50024V15.5002C4 16.8782 5.122 18.0002 6.5 18.0002H21.5C22.878 18.0002 24 16.8782 24 15.5002V4.50024C24 3.12224 22.878 2.00024 21.5 2.00024ZM6.5 4.00024H21.5C21.776 4.00024 22 4.22424 22 4.50024V11.5992L18.841 7.91324C18.506 7.52024 18.021 7.31024 17.5 7.29824C16.982 7.30124 16.496 7.53124 16.164 7.92924L12.45 12.3872L11.24 11.1802C10.556 10.4962 9.443 10.4962 8.76 11.1802L6 13.9392V4.50024C6 4.22424 6.224 4.00024 6.5 4.00024Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default FileLibraryIcon;
