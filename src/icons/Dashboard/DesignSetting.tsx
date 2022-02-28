/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const DesignSettingIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 19.5V18H4.5C3.95 18 3.45 17.78 3.09 17.41C2.72 17.05 2.5 16.55 2.5 16C2.5 14.97 3.3 14.11 4.31 14.01C4.37 14 4.43 14 4.5 14H19.5C19.57 14 19.63 14 19.69 14.01C20.17 14.05 20.59 14.26 20.91 14.59C21.32 14.99 21.54 15.56 21.49 16.18C21.4 17.23 20.45 18 19.39 18H14.5V19.5C14.5 20.88 13.38 22 12 22C10.62 22 9.5 20.88 9.5 19.5Z"
        fill="currentColor"
      />
      <path
        d="M17.1886 2H13.2486C12.9686 2 12.7486 2.22 12.7486 2.5V4C12.7486 4.41 12.4086 4.75 11.9986 4.75C11.9086 4.75 11.8286 4.73 11.7486 4.7C11.4586 4.6 11.2486 4.32 11.2486 4V2.5C11.2486 2.22 11.0286 2 10.7486 2H9.23862C8.95862 2 8.73862 2.22 8.73862 2.5V7C8.73862 7.41 8.39862 7.75 7.98862 7.75C7.57862 7.75 7.23862 7.41 7.23862 7V4.75V2.5C7.23862 2.23 7.03862 2.02 6.76862 2H6.73862C4.99862 2.04 3.64862 3.55 3.82862 5.3L4.19862 12.05C4.22862 12.58 4.66862 13 5.19862 13H18.7986C19.3286 13 19.7686 12.58 19.7986 12.05L20.1686 5.3C20.3486 3.53 18.9586 2 17.1886 2Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default DesignSettingIcon;
