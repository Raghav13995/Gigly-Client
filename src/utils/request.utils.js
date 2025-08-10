import axios from "axios";


const request = axios.create({
    baseURL: "https://gigly-server.onrender.com",
    withCredentials: true,
});

export default request;
