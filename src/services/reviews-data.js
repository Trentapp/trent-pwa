import http from "../http-common";

class ReviewDataService {
    get(id) {
        return http.get(`/reviews/review/${id}`);
    }

    createReview(data) {
        return http.post("/reviews/create", data);
    }
};

export default new ReviewDataService();
