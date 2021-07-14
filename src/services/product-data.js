import http, {axiosFile} from "../http-common"; //http is our axios instance to make requests


class ProductDataService {
    get(id){
        return http.get(`/products/product/${id}`);
    }

    find(filters, page=0){
        let reqStr = `/products?page=${page}`;
        for (const [key,value] of Object.entries(filters)){
            if (value){
                reqStr += `&${key}=${value}`;
            }
        }
        return http.get(reqStr);
    }

    createProduct(data){
        return http.post("/products/create", data); 
    }

    createProduct2(data){
        return axiosFile.post("/products/create2", data); //not sure if that with headers works

    }

    updateProduct(productId, data){
        return http.put(`/products/product/update/${productId}`, data);
    }

    deleteProduct(productId, uid){
        return http.delete(`/products/product/delete/${productId}`, {data: {uid: uid}});
    }
};

export default new ProductDataService();
