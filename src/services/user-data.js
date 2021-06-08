import http from "../http-common";

class UserDataService {
    get(uid) {
        return http.get(`/users/user/${uid}`);
    }

    createUser(data) {
        return http.post("/users/create", data);
    }

    updateUser(uid, data) {
        return http.put(`/users/update/${uid}`, data); // still to be implemented in the backend
    }
};

export default new UserDataService();
