import http, {axiosFile} from "../http-common"; //http is our axios instance to make requests


class ProductDataService {
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

    createProduct(data){
        return axiosFile.post("/products/create", data); //not sure if that with headers works
    }

    updateProduct(productId, data){
        return http.put(`/products/product/update/${productId}`, data);
    }

    deleteProduct(productId){
        return http.delete(`/products/product/delete/${productId}`);
    }
};

export default new ProductDataService();
