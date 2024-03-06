import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Обертка для контейнера toastify (используется для визуального отображения ошибок Api, помимо консоли)

const AppNotificationContainer = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      pauseOnHover
      theme="colored"
      style={{ fontSize: "16px" }}
    />
  );
};

export default AppNotificationContainer;
