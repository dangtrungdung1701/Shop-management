import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IToast {}

const Toast: React.FC<IToast> = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {children}
    </>
  );
};

export default Toast;
