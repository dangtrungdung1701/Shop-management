/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const SettingIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3335 6.04175H13.3335C12.9918 6.04175 12.7085 5.75842 12.7085 5.41675C12.7085 5.07508 12.9918 4.79175 13.3335 4.79175H18.3335C18.6752 4.79175 18.9585 5.07508 18.9585 5.41675C18.9585 5.75842 18.6752 6.04175 18.3335 6.04175Z"
        fill="currentColor"
      />
      <path
        d="M4.99984 6.04175H1.6665C1.32484 6.04175 1.0415 5.75842 1.0415 5.41675C1.0415 5.07508 1.32484 4.79175 1.6665 4.79175H4.99984C5.3415 4.79175 5.62484 5.07508 5.62484 5.41675C5.62484 5.75842 5.3415 6.04175 4.99984 6.04175Z"
        fill="currentColor"
      />
      <path
        d="M8.33317 8.95833C6.38317 8.95833 4.7915 7.36667 4.7915 5.41667C4.7915 3.46667 6.38317 1.875 8.33317 1.875C10.2832 1.875 11.8748 3.46667 11.8748 5.41667C11.8748 7.36667 10.2832 8.95833 8.33317 8.95833ZM8.33317 3.125C7.0665 3.125 6.0415 4.15 6.0415 5.41667C6.0415 6.68333 7.0665 7.70833 8.33317 7.70833C9.59984 7.70833 10.6248 6.68333 10.6248 5.41667C10.6248 4.15 9.59984 3.125 8.33317 3.125Z"
        fill="currentColor"
      />
      <path
        d="M18.3333 15.2083H15C14.6583 15.2083 14.375 14.9249 14.375 14.5833C14.375 14.2416 14.6583 13.9583 15 13.9583H18.3333C18.675 13.9583 18.9583 14.2416 18.9583 14.5833C18.9583 14.9249 18.675 15.2083 18.3333 15.2083Z"
        fill="currentColor"
      />
      <path
        d="M6.6665 15.2083H1.6665C1.32484 15.2083 1.0415 14.9249 1.0415 14.5833C1.0415 14.2416 1.32484 13.9583 1.6665 13.9583H6.6665C7.00817 13.9583 7.2915 14.2416 7.2915 14.5833C7.2915 14.9249 7.00817 15.2083 6.6665 15.2083Z"
        fill="currentColor"
      />
      <path
        d="M11.6667 18.1251C9.71667 18.1251 8.125 16.5334 8.125 14.5834C8.125 12.6334 9.71667 11.0417 11.6667 11.0417C13.6167 11.0417 15.2083 12.6334 15.2083 14.5834C15.2083 16.5334 13.6167 18.1251 11.6667 18.1251ZM11.6667 12.2917C10.4 12.2917 9.375 13.3167 9.375 14.5834C9.375 15.8501 10.4 16.8751 11.6667 16.8751C12.9333 16.8751 13.9583 15.8501 13.9583 14.5834C13.9583 13.3167 12.9333 12.2917 11.6667 12.2917Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SettingIcon;
