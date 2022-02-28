/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.htm
 *  [ ] replace all fill="..." to  fill="currentColor"
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const DashboardIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.24994 0H1.74994C0.784973 0 0 0.784973 0 1.74994V6.24994C0 7.21509 0.784973 8.00006 1.74994 8.00006H9.24994C10.2151 8.00006 11.0001 7.21509 11.0001 6.24994V1.74994C11.0001 0.784973 10.2151 0 9.24994 0Z"
      fill="currentColor"
    />
    <path
      d="M9.24994 10H1.74994C0.784973 10 0 10.785 0 11.7501V22.2501C0 23.2151 0.784973 24.0001 1.74994 24.0001H9.24994C10.2151 24.0001 11.0001 23.2151 11.0001 22.2501V11.7501C11.0001 10.785 10.2151 10 9.24994 10Z"
      fill="currentColor"
    />
    <path
      d="M22.2501 16H14.7501C13.785 16 13 16.785 13 17.7501V22.2501C13 23.2151 13.785 24.0001 14.7501 24.0001H22.2501C23.2151 24.0001 24.0001 23.2151 24.0001 22.2501V17.7501C24.0001 16.785 23.2151 16 22.2501 16Z"
      fill="currentColor"
    />
    <path
      d="M22.2501 0H14.7501C13.785 0 13 0.784973 13 1.74994V12.2499C13 13.2151 13.785 14.0001 14.7501 14.0001H22.2501C23.2151 14.0001 24.0001 13.2151 24.0001 12.2499V1.74994C24.0001 0.784973 23.2151 0 22.2501 0V0Z"
      fill="currentColor"
    />
  </svg>
);

export default DashboardIcon;
