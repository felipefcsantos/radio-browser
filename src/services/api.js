import axios from "axios";

const api = axios.create({
  baseURL: "https://de1.api.radio-browser.info/json/stations/",
});

export default api;