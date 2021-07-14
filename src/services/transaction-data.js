import http from "../http-common";

class TransactionDataService {
    createTransaction(data) {
        return http.post("/transactions/createTransaction", data);
    }

    getById(id) {
        return http.get(`/transactions/transaction/${id}`);
    }

    findByLender(userId) {
        return http.get(`/transactions/findByLender/${userId}`);
    }

    findByBorrower(userId) {
        return http.get(`/transactions/findByBorrower/${userId}`);
    }

    findPastTransactions(userId) {
        return http.get(`/transactions/findPastTransactions/${userId}`);
    }

    setTransactionStatus(id, uid, status){
        return http.patch(`transactions/setTransactionStatus/${id}`, {uid: uid, status: status});
    }
};

export default new TransactionDataService();
