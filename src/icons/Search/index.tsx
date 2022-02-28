import { IIconSVGProps } from "typings";

const SearchIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5391 13.9413L11.0966 10.5538C11.9981 9.57442 12.552 8.27913 12.552 6.85379C12.5516 3.80473 10.0401 1.33333 6.94179 1.33333C3.8435 1.33333 1.33203 3.80473 1.33203 6.85379C1.33203 9.90285 3.8435 12.3742 6.94179 12.3742C8.28047 12.3742 9.50827 11.9112 10.4727 11.1415L13.9286 14.5423C14.097 14.7081 14.3703 14.7081 14.5387 14.5423C14.7075 14.3764 14.7075 14.1072 14.5391 13.9413ZM6.94179 11.5249C4.3203 11.5249 2.19517 9.43357 2.19517 6.85379C2.19517 4.274 4.3203 2.18268 6.94179 2.18268C9.56331 2.18268 11.6884 4.274 11.6884 6.85379C11.6884 9.43357 9.56331 11.5249 6.94179 11.5249Z"
        fill="#B1B1B1"
      />
    </svg>
  );
};

export default SearchIcon;
