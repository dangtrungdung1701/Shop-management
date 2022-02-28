import { IIconSVGProps } from "typings";

const DropdownArrowIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.8805 9.79006L12.0005 13.6701L8.12047 9.79006C7.73047 9.40006 7.10047 9.40006 6.71047 9.79006C6.32047 10.1801 6.32047 10.8101 6.71047 11.2001L11.3005 15.7901C11.6905 16.1801 12.3205 16.1801 12.7105 15.7901L17.3005 11.2001C17.6905 10.8101 17.6905 10.1801 17.3005 9.79006C16.9105 9.41006 16.2705 9.40006 15.8805 9.79006Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default DropdownArrowIcon;
