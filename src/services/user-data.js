import http from "../http-common";

class UserDataService {
    get(id) {
        return http.get(`/users/user/${id}`);
    }

    createUser(data) {
        return http.post("/users/create", data);
    }
};

export default new UserDataService();
