import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7008/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Token")}`,
  },
});
