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
};

export default new ReviewDataService();
