import http from "../http-common";

class TransactionDataService {
    createTransaction(data) {
        return http.post("/transactions/createTransaction", data);
    }

    getById(id, uid) {
        return http.post(`/transactions/transaction/${id}`, {uid: uid});
    }

    getNewRequests(uid) {
        return http.post(`/transactions/getNewRequests`, {uid: uid});
    }

    getUpcoming(uid) {
        return http.post(`/transactions/getUpcoming`, {uid: uid});
    }

    findByUser(uid) {
        return http.post(`/transactions/findByUser`, {uid: uid});
    }

    findByLender(uid) {
        return http.post(`/transactions/findByLender`, {uid: uid});
    }

    findByBorrower(uid) {
        return http.post(`/transactions/findByBorrower`, {uid: uid});
    }

    findPastTransactions(uid) {
        return http.post(`/transactions/findPastTransactions`, {uid: uid});
    }

    setTransactionStatus(id, uid, status){
        return http.patch(`transactions/setTransactionStatus/${id}`, {uid: uid, status: status});
    }
};

export default new TransactionDataService();
