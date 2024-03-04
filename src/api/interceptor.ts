import md5 from "md5";
import axios from "axios";
import { getFormattedTimestamp } from "../services/services";

const PASSWORD = "Valantis";
const FORMATTED_TIMESTAMP = getFormattedTimestamp(new Date());

const AUTH_TOKEN = md5(`${PASSWORD}_${FORMATTED_TIMESTAMP}`);

export const $axios_auth = axios.create({
  baseURL: "https://api.valantis.store:41000/",
});

//добавляем запросам авторизационный заголовок
$axios_auth.interceptors.request.use((config) => {
  if (AUTH_TOKEN) {
    config.headers["X-Auth"] = AUTH_TOKEN;
  }
  return config;
});

export default $axios_auth;
