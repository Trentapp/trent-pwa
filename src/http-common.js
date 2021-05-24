import axios from "axios";

//just returning an axios instance with basic configurations
export default axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-type": "application/json"
    }
});