import md5 from "md5";
import axios from "axios";
import { getFormattedTimestamp } from "../services/getFormattedTimestamp";
import { API_PASSWORD, API_SERVER_URL } from "../consts/consts";

const FORMATTED_TIMESTAMP = getFormattedTimestamp();
const AUTH_TOKEN = md5(`${API_PASSWORD}_${FORMATTED_TIMESTAMP}`);

export const $axios_auth = axios.create({
  baseURL: API_SERVER_URL,
});

$axios_auth.interceptors.request.use((config) => {
  if (AUTH_TOKEN) {
    config.headers["X-Auth"] = AUTH_TOKEN;
  }
  return config;
});

export default $axios_auth;
