import axios from "axios";


const request = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

export default request;