import http from "../http-common";

class TransactionDataService {
    createTransaction(data) {
        return http.post("/transactions/sendRequest", data);
    }

    getById(id) {
        return http.get(`/transactions/transaction/${id}`);
    }

    findByLender(user_id) {
        return http.get(`/transactions/findByLender/${user_id}`);
    }

    findByBorrower(user_id) {
        return http.get(`/transactions/findByBorrower/${user_id}`);
    }

    setTransactionStatus(id, user_uid, granted){
        return http.patch(`transactions/setTransactionStatus/${id}`, {uid: user_uid, granted: granted});
    }
};

export default new TransactionDataService();