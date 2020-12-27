import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-574e1-default-rtdb.firebaseio.com/",
});

export default instance;
