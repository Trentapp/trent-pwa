import http from "../http-common";

class ChatDataService {
    /*get(id) {
        return http.get(`...`);
    }*/

    sendMessage(data) {
        return http.post(`/chats/sendMessage`, data);
    }
};

export default new ChatDataService();
