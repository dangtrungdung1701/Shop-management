import { SVGProps } from "react";

interface IUploadImageIconProps extends SVGProps<SVGSVGElement> {}

const UploadImageIcon: React.FC<IUploadImageIconProps> = props => {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <path
          d="M18 22C14.96 22 12.5 19.54 12.5 16.5C12.5 13.46 14.96 11 18 11C21.04 11 23.5 13.46 23.5 16.5C23.5 19.54 21.04 22 18 22ZM18 14C16.62 14 15.5 15.12 15.5 16.5C15.5 17.88 16.62 19 18 19C19.38 19 20.5 17.88 20.5 16.5C20.5 15.12 19.38 14 18 14Z"
          fill="currentColor"
        />
        <path
          d="M30 46H18C7.14 46 2.5 41.36 2.5 30.5V18.5C2.5 7.64 7.14 3 18 3H26C26.82 3 27.5 3.68 27.5 4.5C27.5 5.32 26.82 6 26 6H18C8.78 6 5.5 9.28 5.5 18.5V30.5C5.5 39.72 8.78 43 18 43H30C39.22 43 42.5 39.72 42.5 30.5V20.5C42.5 19.68 43.18 19 44 19C44.82 19 45.5 19.68 45.5 20.5V30.5C45.5 41.36 40.86 46 30 46Z"
          fill="currentColor"
        />
        <path
          d="M36 17.9999C35.18 17.9999 34.5 17.3199 34.5 16.4999V4.49988C34.5 3.89988 34.86 3.33988 35.42 3.11988C35.98 2.89988 36.62 3.01988 37.06 3.43988L41.06 7.43988C41.64 8.01988 41.64 8.97988 41.06 9.55988C40.48 10.1399 39.52 10.1399 38.94 9.55988L37.5 8.11988V16.4999C37.5 17.3199 36.82 17.9999 36 17.9999Z"
          fill="currentColor"
        />
        <path
          d="M32.0009 9.99988C31.6209 9.99988 31.2409 9.85988 30.9409 9.55988C30.3609 8.97988 30.3609 8.01988 30.9409 7.43988L34.9409 3.43988C35.5209 2.85988 36.4809 2.85988 37.0609 3.43988C37.6409 4.01988 37.6409 4.97988 37.0609 5.55988L33.0609 9.55988C32.7609 9.85988 32.3809 9.99988 32.0009 9.99988Z"
          fill="currentColor"
        />
        <path
          d="M5.34059 39.9001C4.86059 39.9001 4.38059 39.6601 4.10059 39.2401C3.64059 38.5601 3.82059 37.6201 4.50059 37.1601L14.3606 30.5401C16.5206 29.1001 19.5006 29.2601 21.4606 30.9201L22.1206 31.5001C23.1206 32.3601 24.8206 32.3601 25.8006 31.5001L34.1206 24.3601C36.2406 22.5401 39.5806 22.5401 41.7206 24.3601L44.9806 27.1601C45.6006 27.7001 45.6806 28.6401 45.1406 29.2801C44.6006 29.9001 43.6406 29.9801 43.0206 29.4401L39.7606 26.6401C38.7606 25.7801 37.0806 25.7801 36.0806 26.6401L27.7606 33.7801C25.6406 35.6001 22.3006 35.6001 20.1606 33.7801L19.5006 33.2001C18.5806 32.4201 17.0606 32.3401 16.0406 33.0401L6.20059 39.6601C5.92059 39.8201 5.62059 39.9001 5.34059 39.9001Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width={48} height={48} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UploadImageIcon;
