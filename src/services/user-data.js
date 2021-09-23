import http, {axiosFile} from "../http-common";

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

    setItems(uid, typeIdList) {
        return http.post(`/users/updateItems`, {uid: uid, typeIdList: typeIdList});
    }

    deleteUser(uid) {
        return http.post(`/users/delete`, {uid: uid});
    }

    uploadPicture(data) {
        return axiosFile.post(`/users/uploadPicture`, data);
    }

    deletePicture(uid) {
        return http.post(`/users/deleteProfilePicture`, uid);
    }

    getByTypesAndLocation(typeIds, location) { // actually this route is only needed in Backend // also not tested
        return http.post(`/items/getByTypesAndLocation`, {typeIds: typeIds, location: location});
    }
};

export default new UserDataService();
