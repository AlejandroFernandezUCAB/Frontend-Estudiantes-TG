/* global localStorage */

import axios from "axios";
import Vue from "vue";

Vue.prototype.$http = axios;
const API_URL = "http://172.23.0.3/wp-json";
const token = localStorage.token;
if (token) {
  console.log(token);
  Vue.prototype.$http.defaults.headers.common["Authorization"] =
    "Bearer " + token;
}
export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
