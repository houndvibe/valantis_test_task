import md5 from "md5";
import axios from "axios";
import { getFormattedTimestamp } from "../services/services";

const PASSWORD = "Valantis";
const FORMATTED_TIMESTAMP = getFormattedTimestamp(new Date());

const authToken = md5(`${PASSWORD}_${FORMATTED_TIMESTAMP}`);

export const $axios_auth = axios.create({
  baseURL: "http://api.valantis.store:40000/",
});

$axios_auth.interceptors.request.use((config) => {
  if (authToken) {
    config.headers["X-Auth"] = authToken;
  }
  return config;
});

export default $axios_auth;
