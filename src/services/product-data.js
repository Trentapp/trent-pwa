import http from "../http-common"; //http is our axios instance to make requests


class ProductDataService {
    getAll(){
        return http.get("/products");
    }
};

export default new ProductDataService();
