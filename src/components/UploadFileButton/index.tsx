import ImageUploadLayout from "layouts/ImageUpload";

interface IUploadFileButtonProps {
  fileName?: string;
  onUpload: (file: File) => void;
}

const UploadFileButton: React.FC<IUploadFileButtonProps> = ({
  fileName = "",
  onUpload,
}) => {
  return (
    <ImageUploadLayout
      onStartUpload={() => {
        console.log("Start upload");
      }}
      onUpload={files => {
        onUpload(files[0]);
        console.log("End upload");
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <UploadIcon />
        <p className="truncate max-w-12">{fileName || "Upload file"}</p>
      </div>
    </ImageUploadLayout>
  );
};

export default UploadFileButton;

const UploadIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_2360_182800)">
      <path
        d="M10.3097 0.0924074C10.2363 0.0151368 10.1358 -0.03125 10.0315 -0.03125H3.78992C2.63819 -0.03125 1.6875 0.915651 1.6875 2.06726V13.8701C1.6875 15.0219 2.63819 15.9688 3.78992 15.9688H12.2614C13.4131 15.9688 14.3638 15.0219 14.3638 13.8701V4.49818C14.3638 4.39771 14.3174 4.30116 14.2517 4.22767L10.3097 0.0924074ZM10.4218 1.33301L13.0614 4.10401H11.3455C10.8353 4.10401 10.4218 3.69434 10.4218 3.18421V1.33301ZM12.2614 15.1958H3.78992C3.06726 15.1958 2.46045 14.5968 2.46045 13.8701V2.06726C2.46045 1.34461 3.06336 0.741701 3.78992 0.741701H9.64882V3.18421C9.64882 4.1233 10.4064 4.87696 11.3455 4.87696H13.5908V13.8701C13.5908 14.5968 12.9879 15.1958 12.2614 15.1958Z"
        fill="#1B1B1B"
      />
      <path
        d="M11.2058 12.5293H4.84448C4.63196 12.5293 4.45801 12.7031 4.45801 12.9158C4.45801 13.1283 4.63196 13.3023 4.84448 13.3023H11.2097C11.4223 13.3023 11.5962 13.1283 11.5962 12.9158C11.5962 12.7031 11.4223 12.5293 11.2058 12.5293Z"
        fill="#1B1B1B"
      />
      <path
        d="M6.04667 8.37122L7.63895 6.65906V10.8794C7.63895 11.0919 7.8129 11.2659 8.02543 11.2659C8.23808 11.2659 8.4119 11.0919 8.4119 10.8794V6.65906L10.0042 8.37122C10.0815 8.45228 10.182 8.49488 10.2863 8.49488C10.3791 8.49488 10.4757 8.46009 10.5491 8.39051C10.7038 8.24366 10.7154 8.00013 10.5685 7.84559L8.30375 5.41467C8.23026 5.3374 8.1298 5.29102 8.02164 5.29102C7.91337 5.29102 7.8129 5.3374 7.73954 5.41467L5.47477 7.84559C5.32792 8.00013 5.33951 8.24744 5.49406 8.39051C5.65641 8.53736 5.89982 8.52576 6.04667 8.37122Z"
        fill="#1B1B1B"
      />
    </g>
    <defs>
      <clipPath id="clip0_2360_182800">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
