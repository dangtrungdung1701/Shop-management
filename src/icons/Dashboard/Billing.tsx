/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const BillingIcon: React.FC<IIconSVGProps> = props => (
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
        d="M5.6067 4.86644L15.1744 2.25487L14.6677 1.23073C14.3362 0.565033 13.5276 0.290132 12.8619 0.621631L4.29688 4.86644H5.6067Z"
        fill="currentColor"
      />
      <path
        d="M18.1476 2.33032C18.0291 2.33032 17.9105 2.34649 17.7919 2.37883L15.5442 2.99332L8.67969 4.86642H16.4713H19.8671L19.4467 3.32482C19.285 2.72381 18.7406 2.33032 18.1476 2.33032Z"
        fill="currentColor"
      />
      <path
        d="M21.2698 5.80957H20.9626H20.5449H20.1271H16.9388H5.22313H3.68692H2.39326H2.1534H1.35025C0.924424 5.80957 0.544413 6.00631 0.296463 6.31625C0.183268 6.45909 0.0970242 6.6235 0.0485121 6.80407C0.0188658 6.91726 0 7.03585 0 7.15713V7.31883V8.85505V22.1716C0 22.9155 0.603706 23.5192 1.34756 23.5192H21.2672C22.011 23.5192 22.6147 22.9155 22.6147 22.1716V18.4119H14.6183C13.3543 18.4119 12.3275 17.3851 12.3275 16.1211V14.8867V14.469V14.0512V13.1241C12.3275 12.5042 12.5754 11.941 12.977 11.5286C13.3327 11.1621 13.8098 10.9141 14.3434 10.8521C14.4323 10.8414 14.524 10.836 14.6156 10.836H21.4935H21.9113H22.329H22.6147V7.15713C22.6174 6.41328 22.0137 5.80957 21.2698 5.80957Z"
        fill="currentColor"
      />
      <path
        d="M23.5595 12.1245C23.4248 12.0005 23.2658 11.9062 23.0879 11.8442C22.9504 11.7984 22.8049 11.7715 22.6513 11.7715H22.6162H22.5893H22.1715H20.665H14.6171C13.8732 11.7715 13.2695 12.3752 13.2695 13.119V13.7901V14.2078V14.6256V16.1187C13.2695 16.8625 13.8732 17.4662 14.6171 17.4662H22.6162H22.6513C22.8049 17.4662 22.9504 17.4393 23.0879 17.3935C23.2658 17.3342 23.4248 17.2372 23.5595 17.1132C23.8291 16.8679 23.9988 16.5122 23.9988 16.1187V13.119C23.9988 12.7255 23.8291 12.3697 23.5595 12.1245ZM17.4308 14.887C17.4308 15.2589 17.129 15.5608 16.757 15.5608H16.3096C15.9377 15.5608 15.6359 15.2589 15.6359 14.887V14.4396C15.6359 14.224 15.7356 14.0326 15.8946 13.9114C16.0105 13.8224 16.1533 13.7658 16.3096 13.7658H16.4228H16.757C17.129 13.7658 17.4308 14.0677 17.4308 14.4396V14.887Z"
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

export default BillingIcon;
