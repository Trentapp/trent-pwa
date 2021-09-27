import http from "../http-common";

class PostDataService {
    create(uid, typeIds, comment, location) {
        return http.post(`/posts/create`, {uid: uid, typeIds: typeIds, comment: comment, location: location});
    }

    update(postId, uid, typeIds, comment, location) {
        return http.put(`/posts/update/${postId}`, {uid: uid, typeIds: typeIds, comment: comment, location: location});
    }

    getAroundLocation(location, maxDistance=4) {
        return http.post(`/posts/getAroundLocation`, {location: location, maxDistance: maxDistance});
    }

    setStatus(postId, uid, status) {
        return http.put(`/posts/setStatus/${postId}`, {uid: uid, status: status});
    }

    getById(postId) {
        return http.get(`/posts/post/${postId}`);
    }

    deletePost(postId, uid) {
        return http.post(`/posts/delete/${postId}`, {uid: uid});
    }
};

export default new PostDataService();
