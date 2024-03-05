import { ToastContainer } from "react-toastify";

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
      draggable
      pauseOnHover
      theme="colored"
      style={{ fontSize: "20px" }}
    />
  );
};

export default AppNotificationContainer;
