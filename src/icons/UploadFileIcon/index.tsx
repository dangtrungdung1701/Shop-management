import { SVGProps } from "react";

interface IUploadImageIconProps extends SVGProps<SVGSVGElement> {}

const UploadFileIcon: React.FC<IUploadImageIconProps> = props => {
  return (
    <svg
      width="26"
      height="35"
      viewBox="0 0 26 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_4050_199957)">
        <path
          d="M15.0833 9.68749V0.833328H2.0625C1.19661 0.833328 0.5 1.52994 0.5 2.39583V32.6042C0.5 33.47 1.19661 34.1667 2.0625 34.1667H23.9375C24.8034 34.1667 25.5 33.47 25.5 32.6042V11.25H16.6458C15.7865 11.25 15.0833 10.5469 15.0833 9.68749ZM19.3268 23.7506H15.0833V28.959C15.0833 29.5345 14.6172 30.0006 14.0417 30.0006H11.9583C11.3828 30.0006 10.9167 29.5345 10.9167 28.959V23.7506H6.67318C5.74349 23.7506 5.2793 22.625 5.93945 21.9694L12.2168 15.7389C12.6497 15.3086 13.349 15.3086 13.7819 15.7389L20.0592 21.9694C20.7201 22.625 20.2565 23.7506 19.3268 23.7506ZM25.0443 7.66927L18.6706 1.28906C18.3776 0.996089 17.9805 0.833328 17.5638 0.833328H17.1667V9.16666H25.5V8.76953C25.5 8.35937 25.3372 7.96223 25.0443 7.66927Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_4050_199957">
          <rect
            width="25"
            height="33.3333"
            fill="transparent"
            transform="translate(0.5 0.833328)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UploadFileIcon;
