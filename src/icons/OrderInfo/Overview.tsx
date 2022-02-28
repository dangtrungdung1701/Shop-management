/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const OverviewIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.4998 16.875H9.1665C8.82484 16.875 8.5415 16.5917 8.5415 16.25C8.5415 15.9083 8.82484 15.625 9.1665 15.625H17.4998C17.8415 15.625 18.1248 15.9083 18.1248 16.25C18.1248 16.5917 17.8415 16.875 17.4998 16.875Z"
        fill="currentColor"
      />
      <path
        d="M17.4998 11.0417H9.1665C8.82484 11.0417 8.5415 10.7584 8.5415 10.4167C8.5415 10.0751 8.82484 9.79175 9.1665 9.79175H17.4998C17.8415 9.79175 18.1248 10.0751 18.1248 10.4167C18.1248 10.7584 17.8415 11.0417 17.4998 11.0417Z"
        fill="currentColor"
      />
      <path
        d="M17.4998 5.20825H9.1665C8.82484 5.20825 8.5415 4.92492 8.5415 4.58325C8.5415 4.24159 8.82484 3.95825 9.1665 3.95825H17.4998C17.8415 3.95825 18.1248 4.24159 18.1248 4.58325C18.1248 4.92492 17.8415 5.20825 17.4998 5.20825Z"
        fill="currentColor"
      />
      <path
        d="M3.3332 6.04162C3.17487 6.04162 3.01654 5.98328 2.89154 5.85828L2.0582 5.02495C1.81654 4.78328 1.81654 4.38328 2.0582 4.14162C2.29987 3.89995 2.69987 3.89995 2.94154 4.14162L3.3332 4.53328L5.39154 2.47495C5.6332 2.23328 6.0332 2.23328 6.27487 2.47495C6.51654 2.71662 6.51654 3.11662 6.27487 3.35828L3.77487 5.85828C3.64987 5.98328 3.49154 6.04162 3.3332 6.04162Z"
        fill="currentColor"
      />
      <path
        d="M3.3332 11.8751C3.17487 11.8751 3.01654 11.8168 2.89154 11.6918L2.0582 10.8584C1.81654 10.6168 1.81654 10.2168 2.0582 9.97511C2.29987 9.73345 2.69987 9.73345 2.94154 9.97511L3.3332 10.3668L5.39154 8.30845C5.6332 8.06678 6.0332 8.06678 6.27487 8.30845C6.51654 8.55011 6.51654 8.95011 6.27487 9.19178L3.77487 11.6918C3.64987 11.8168 3.49154 11.8751 3.3332 11.8751Z"
        fill="currentColor"
      />
      <path
        d="M3.3332 17.7084C3.17487 17.7084 3.01654 17.65 2.89154 17.525L2.0582 16.6917C1.81654 16.45 1.81654 16.05 2.0582 15.8084C2.29987 15.5667 2.69987 15.5667 2.94154 15.8084L3.3332 16.2L5.39154 14.1417C5.6332 13.9 6.0332 13.9 6.27487 14.1417C6.51654 14.3834 6.51654 14.7834 6.27487 15.025L3.77487 17.525C3.64987 17.65 3.49154 17.7084 3.3332 17.7084Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default OverviewIcon;
