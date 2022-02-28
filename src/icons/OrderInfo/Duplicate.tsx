/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const DiplicateIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.24984 18.9584H5.74984C2.4915 18.9584 1.0415 17.5084 1.0415 14.2501V10.7501C1.0415 7.49175 2.4915 6.04175 5.74984 6.04175H9.24984C12.5082 6.04175 13.9582 7.49175 13.9582 10.7501V14.2501C13.9582 17.5084 12.5082 18.9584 9.24984 18.9584ZM5.74984 7.29175C3.1665 7.29175 2.2915 8.16675 2.2915 10.7501V14.2501C2.2915 16.8334 3.1665 17.7084 5.74984 17.7084H9.24984C11.8332 17.7084 12.7082 16.8334 12.7082 14.2501V10.7501C12.7082 8.16675 11.8332 7.29175 9.24984 7.29175H5.74984Z"
        fill="currentColor"
      />
      <path
        d="M14.2498 13.9584H13.3332C12.9915 13.9584 12.7082 13.6751 12.7082 13.3334V10.7501C12.7082 8.16675 11.8332 7.29175 9.24984 7.29175H6.6665C6.32484 7.29175 6.0415 7.00842 6.0415 6.66675V5.75008C6.0415 2.49175 7.4915 1.04175 10.7498 1.04175H14.2498C17.5082 1.04175 18.9582 2.49175 18.9582 5.75008V9.25008C18.9582 12.5084 17.5082 13.9584 14.2498 13.9584ZM13.9582 12.7084H14.2498C16.8332 12.7084 17.7082 11.8334 17.7082 9.25008V5.75008C17.7082 3.16675 16.8332 2.29175 14.2498 2.29175H10.7498C8.1665 2.29175 7.2915 3.16675 7.2915 5.75008V6.04175H9.24984C12.5082 6.04175 13.9582 7.49175 13.9582 10.7501V12.7084Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default DiplicateIcon;
