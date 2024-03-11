import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toaster = () => {
  return (
    <>
      <style>{`.Toastify__progress-bar{border-radius: 0}`}</style>
      <ToastContainer
        toastStyle={{
          borderRadius: '0',
          backgroundColor: '#171d25',
        }}
        theme="dark"
        transition={Slide}
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Toaster;