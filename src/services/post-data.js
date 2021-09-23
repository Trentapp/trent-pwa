import http from "../http-common";

class PostDataService {
    create(uid, typeIds, comment, location) {
        return http.post(`/posts/create`, {uid: uid, typeIds: typeIds, comment: comment, location: location});
    }

    getAroundLocation(location, maxDistance=4) {
        return http.post(`/posts/getAroundLocation`, {location: location, maxDistance: maxDistance});
    }
};

export default new PostDataService();
