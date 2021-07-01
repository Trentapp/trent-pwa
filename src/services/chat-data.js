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
};

export default new ChatDataService();
