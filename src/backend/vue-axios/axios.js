/* global localStorage */

import axios from "axios";
import Vue from "vue";

Vue.prototype.$http = axios;
const API_URL = process.env.API_URL || "http://192.168.99.100:8000/wp-json";
const token =
  localStorage.token ||
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4Ljk5LjEwMDo4MDAwIiwiaWF0IjoxNTc4Njc3MTAzLCJuYmYiOjE1Nzg2NzcxMDMsImV4cCI6MTU3OTI4MTkwMywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.PNczObBpZCKPDIlpam8HFKM4NiCaM3t445HB2ME-rqU";
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
