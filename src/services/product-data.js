import http from "../http-common"; //http is our axios instance to make requests


class ProductDataService {
    getAll(){
        return http.get("/products");
    }

    get(id){
        return http.get(`/products/product/${id}`);
    }

    find(filters, page=0){
        let req_str = `/products?page=${page}`;
        for (const [key,value] of Object.entries(filters)){
            req_str += `&${key}=${value}`;
        }
        return http.get(req_str);
    }
};

export default new ProductDataService();
