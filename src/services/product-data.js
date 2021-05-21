import http from "../http-common"; //http is our axios instance to make requests


class ProductDataService {
    getAll(){
        return http.get("/products");
    }

    get(id){
        return http.get(`/products/product/${id}`);
    }
};

export default new ProductDataService();
