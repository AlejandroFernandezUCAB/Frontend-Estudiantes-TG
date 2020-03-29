/* global localStorage */

import axios from "axios";
import Vue from "vue";

Vue.prototype.$http = axios;
//const API_URL = "https://aquilesypedrotesis.host/wp-json"; //Produccion
const API_URL = "http://172.23.0.3/wp-json";
//const API_URL = process.env.URI_API_WORDPRESS;

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

