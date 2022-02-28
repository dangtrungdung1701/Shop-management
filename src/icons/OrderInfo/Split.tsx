/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const SplitIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5033 18.9567H7.50326C2.97826 18.9567 1.04492 17.0234 1.04492 12.4984V7.49837C1.04492 2.97337 2.97826 1.04004 7.50326 1.04004H12.5033C17.0283 1.04004 18.9616 2.97337 18.9616 7.49837V12.4984C18.9616 17.0234 17.0283 18.9567 12.5033 18.9567ZM7.50326 2.29004C3.66159 2.29004 2.29492 3.65671 2.29492 7.49837V12.4984C2.29492 16.34 3.66159 17.7067 7.50326 17.7067H12.5033C16.3449 17.7067 17.7116 16.34 17.7116 12.4984V7.49837C17.7116 3.65671 16.3449 2.29004 12.5033 2.29004H7.50326Z"
        fill="currentColor"
      />
      <path
        d="M10 18.9567C9.65833 18.9567 9.375 18.6734 9.375 18.3317V1.66504C9.375 1.32337 9.65833 1.04004 10 1.04004C10.3417 1.04004 10.625 1.32337 10.625 1.66504V18.3317C10.625 18.6734 10.3417 18.9567 10 18.9567Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SplitIcon;
