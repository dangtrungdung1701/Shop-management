/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const DeviceIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 16.3421V7.6579C2 6.92002 2.51111 6.02322 3.14444 5.67131L10.9222 1.25542C11.5111 0.914861 12.4889 0.914861 13.0778 1.25542L20.8556 5.67131C21.4889 6.03457 22 6.92002 22 7.6579V16.3421C22 17.08 21.4889 17.9768 20.8556 18.3287L13.0778 22.7446C12.4889 23.0851 11.5111 23.0851 10.9222 22.7446L3.14444 18.3287C2.51111 17.9654 2 17.08 2 16.3421ZM14.9446 11.9938C14.9446 13.7037 13.5961 15.0346 12.0001 15.0346C10.4041 15.0346 9.05566 13.7037 9.05566 11.9938C9.05566 10.284 10.4041 8.95307 12.0001 8.95307C13.5961 8.95307 14.9446 10.284 14.9446 11.9938ZM16.4446 11.9938C16.4446 14.5016 14.4547 16.5346 12.0001 16.5346C9.54551 16.5346 7.55566 14.5016 7.55566 11.9938C7.55566 9.48604 9.54551 7.45307 12.0001 7.45307C14.4547 7.45307 16.4446 9.48604 16.4446 11.9938Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default DeviceIcon;
