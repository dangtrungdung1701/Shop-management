/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const LocationIcon: React.FC<IIconSVGProps> = props => {
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
        d="M3 10.3178C3 5.71789 6.84388 2 11.4934 2C16.1561 2 20 5.71789 20 10.3178C20 12.6357 19.157 14.7876 17.7695 16.6116C16.2388 18.6235 14.3522 20.3765 12.2285 21.7524C11.7425 22.0704 11.3039 22.0944 10.7704 21.7524C8.63474 20.3765 6.74809 18.6235 5.2305 16.6116C3.84198 14.7876 3 12.6357 3 10.3178ZM8.69423 10.5768C8.69423 12.1177 9.95166 13.3297 11.4934 13.3297C13.0362 13.3297 14.3058 12.1177 14.3058 10.5768C14.3058 9.0478 13.0362 7.77683 11.4934 7.77683C9.95166 7.77683 8.69423 9.0478 8.69423 10.5768Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default LocationIcon;
