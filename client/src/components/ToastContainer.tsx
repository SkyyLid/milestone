import { ToastContainer as ReactToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContainer = () => {
  return (
    <ReactToastContainer
      position="top-right" // Position of the toast
      autoClose={5000} // Time before toast disappears (5 seconds)
      hideProgressBar={false} // Show or hide the progress bar
      closeOnClick={true} // Close toast when clicked
      pauseOnHover={false} // Pause when the mouse hovers over toast
      draggable={true} // Allow dragging of the toast
      newestOnTop={false} // Show the newest toast at the top
      rtl={false} // Disable RTL (Right to Left)
      theme="dark" // Light theme for the toast
    />
  );
};

export default ToastContainer;
