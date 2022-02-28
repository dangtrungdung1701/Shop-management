/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const HomeIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.6384 5.782L14.7333 0.945456C12.8511 -0.374693 9.96204 -0.302684 8.15185 1.10147L2.14585 5.794C0.947053 6.73011 0 8.65033 0 10.1625V18.4434C0 21.5038 2.48152 24.0001 5.53846 24.0001H18.4615C21.5185 24.0001 24 21.5158 24 18.4554V10.3185C24 8.69833 22.957 6.70611 21.6384 5.782ZM12.8991 19.1995C12.8991 19.6916 12.4915 20.0996 12 20.0996C11.5085 20.0996 11.1009 19.6916 11.1009 19.1995V15.5991C11.1009 15.1071 11.5085 14.699 12 14.699C12.4915 14.699 12.8991 15.1071 12.8991 15.5991V19.1995Z"
      fill="#B1B1B1"
    />
  </svg>
);

export default HomeIcon;
