import http from "../http-common";

class UserDataService {
    get(uid) {
        return http.post(`/users/user`, {uid: uid});
    }

    getProfile(id){
        return http.get(`/users/user-profile/${id}`);
    }

    createUser(data) {
        return http.post("/users/create", data);
    }

    updateUser(data) {
        return http.put(`/users/update`, data); // still to be implemented in the backend
    }

    deleteUser(uid) {
        return http.delete(`/users/delete`, uid);
    }
};

export default new UserDataService();
