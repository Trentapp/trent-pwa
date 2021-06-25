import http from "../http-common";

class TransactionDataService {
    createTransaction(data) {
        return http.post("/transactions/sendRequest", data);
    }
};

export default new TransactionDataService();
