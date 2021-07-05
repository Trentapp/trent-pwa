import axios from "axios";

//just returning an axios instance with basic configurations
export default axios.create({
    baseURL: "http://trent.uber.space/api",
    headers: {
        "Content-type": "application/json"
    }
});
export const axiosFile = axios.create({
    baseURL: "http://trent.uber.space/api",
    headers: {
        "Content-type": "miltipart/form-data"
    } // I think this is standard
});
