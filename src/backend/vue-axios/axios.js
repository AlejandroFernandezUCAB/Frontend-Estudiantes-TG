/* global localStorage */

import axios from "axios";
import Vue from "vue";

Vue.prototype.$http = axios;
const API_URL = "http://aquilesypedrotesis.host/wp-json";
const token = localStorage.token;
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] =
    "Bearer " + token;
}
export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

