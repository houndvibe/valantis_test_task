import { toast } from "react-toastify";
import productsStore from "../store/productsStore";

//Функция, которая выводит ошибку в консоль + в виде нотификации
export const showError = (error: unknown) => {
  console.error(error);

  if (!productsStore.isError) {
    toast.error(`${error}`);
    productsStore.setisError(true);
    setTimeout(() => {
      productsStore.setisError(false);
    }, 3000);
  }
};
