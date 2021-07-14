import http from "../http-common";

class TransactionDataService {
    createTransaction(data) {
        return http.post("/transactions/createTransaction", data);
    }

    getById(id, uid) {
        return http.post(`/transactions/transaction/${id}`, uid);
    }

    findByLender(uid) {
        return http.post(`/transactions/findByLender`, uid);
    }

    findByBorrower(uid) {
        return http.post(`/transactions/findByBorrower`, uid);
    }

    findPastTransactions(uid) {
        return http.post(`/transactions/findPastTransactions`, uid);
    }

    setTransactionStatus(id, uid, status){
        return http.patch(`transactions/setTransactionStatus/${id}`, {uid: uid, status: status});
    }
};

export default new TransactionDataService();
