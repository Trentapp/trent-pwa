import http from "../http-common";

class ChatDataService {
    getById(id) {
        return http.get(`/chats/chat/${id}`);
    }

    getByUser(user_uid) {
        return http.get(`/chats/chatsOfUser/${user_uid}`);
    }

    sendMessage(data) {
        return http.post(`/chats/sendMessage`, data);
    }

    getByLenderBorrowerProduct(lenderId, borrowerId, productId) {
        return http.get(`/chats/getByLenderBorrowerProduct/${lenderId}/${borrowerId}/${productId}`);
    }
};

export default new ChatDataService();
