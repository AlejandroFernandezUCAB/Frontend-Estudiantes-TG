/* global localStorage */

import axios from "axios";
import Vue from "vue";

Vue.prototype.$http = axios;
const API_URL = process.env.API_URL || "http://192.168.99.100:8000/wp-json";
const token =
  localStorage.token ||
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4Ljk5LjEwMDo4MDAwIiwiaWF0IjoxNTc3OTgxNjA0LCJuYmYiOjE1Nzc5ODE2MDQsImV4cCI6MTU3ODU4NjQwNCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.ij16SpMMvt2eShCXal4ujetVCBsLCd0phJvfDk0OK98";
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
