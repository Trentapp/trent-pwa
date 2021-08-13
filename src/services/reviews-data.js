import http from "../http-common";

class ReviewDataService {
    get(id) {
        return http.get(`/reviews/review/${id}`);
    }

    findByUser(id) {
        return http.get(`/reviews/user/${id}`);
    }

    createReview(data) {
        return http.post("/reviews/create", data);
    }

    deleteReview(id, _uid) {
        return http.delete(`/reviews/delete/${id}`, {data: {uid: _uid}});
    }

    updateReview(id, data) {//data includes uid of user
        return http.put(`/reviews/update/${id}`, data);
    }
};

export default new ReviewDataService();
