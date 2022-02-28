import { IIconSVGProps } from "typings";

const TrashIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z"
        fill="#EEEEEE"
      />
      <path
        d="M12 25C12 26.1 12.9 27 14 27H22C23.1 27 24 26.1 24 25V15C24 13.9 23.1 13 22 13H14C12.9 13 12 13.9 12 15V25ZM24 10H21.5L20.79 9.29C20.61 9.11 20.35 9 20.09 9H15.91C15.65 9 15.39 9.11 15.21 9.29L14.5 10H12C11.45 10 11 10.45 11 11C11 11.55 11.45 12 12 12H24C24.55 12 25 11.55 25 11C25 10.45 24.55 10 24 10Z"
        fill="#B1B1B1"
      />
    </svg>
  );
};

export default TrashIcon;
