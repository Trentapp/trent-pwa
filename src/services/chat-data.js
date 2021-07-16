import http from "../http-common";

class ChatDataService {
    getById(id, uid) {
        return http.post(`/chats/chat/${id}`, {uid: uid});
    }

    getByUser(uid) {
        return http.post(`/chats/getChatsOfUser`, {uid: uid});
    }

    sendMessage(data) {
        return http.post(`/chats/sendMessage`, data);
    }

    getByLenderBorrowerProduct(lenderId, borrowerId, productId) {
        return http.get(`/chats/getByLenderBorrowerProduct/${lenderId}/${borrowerId}/${productId}`);
    }
};

export default new ChatDataService();
