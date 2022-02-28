/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const DrawerArrowIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.97977 5.3131C3.15729 5.13559 3.43506 5.11945 3.6308 5.26469L3.68688 5.3131L8 9.62599L12.3131 5.3131C12.4906 5.13559 12.7684 5.11945 12.9641 5.26469L13.0202 5.3131C13.1977 5.49061 13.2139 5.76839 13.0686 5.96413L13.0202 6.02021L8.35355 10.6869C8.17604 10.8644 7.89826 10.8805 7.70252 10.7353L7.64644 10.6869L2.97977 6.02021C2.78451 5.82495 2.78451 5.50837 2.97977 5.3131Z"
      fill="currentColor"
    />
  </svg>
);

export default DrawerArrowIcon;
