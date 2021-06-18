import http from "../http-common";

class ReviewDataService {
    get(id) {
        return http.get(`/reviews/review/${id}`);
    }

    findByUser(uid) {
        return http.get(`/reviews/user/${uid}`);
    }

    createReview(data) {
        return http.post("/reviews/create", data);
    }

    deleteReview(id) {
        return http.delete(`/reviews/delete/${id}`);
    }

    updateReview(id, data) {
        return http.put(`/reviews/update/${id}`, data);
    }
};

export default new ReviewDataService();
