import http from "../http-common";

class UserDataService {
    createUser(data) {
        return http.post("/users/create", data);
    }
};

export default new UserDataService();
