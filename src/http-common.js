import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseURL = (process.env.REACT_APP_ENV === "dev") ? "http://localhost:8000/api" : "https://trent.uber.space/api";

export default axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json"
    }
});
export const axiosFile = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "multipart/form-data"
    } // I think this is standard
});
