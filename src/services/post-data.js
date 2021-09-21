import http from "../http-common";

class PostDataService {
    create(uid, typeId, desc, location) {
        return http.post(`/posts/create`, {uid: uid, typeId: typeId, desc: desc, location: location});
    }

    getAroundLocation(location, maxDistance=4) {
        return http.post(`/posts/getAroundLocation`, {location: location, maxDistance: maxDistance});
    }
};

export default new PostDataService();
