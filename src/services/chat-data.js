import http from "../http-common";

class ChatDataService {
    getById(id, uid) {
        return http.post(`/chats/chat/${id}`, {uid: uid});
    }

    getByUser(uid) {
        return http.post(`/chats/getChatsOfUser`, {uid: uid});
    }

    getNewMessages(uid) {
        return http.post(`/chats/getNewMessages`, {uid: uid});
    }

    sendMessage(data) {
        return http.post(`/chats/sendMessage`, data);
    }
};

export default new ChatDataService();
