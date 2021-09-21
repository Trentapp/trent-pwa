import http from "../http-common";

class ItemDataService {
    getByTypeAndLocation(typeId, location) {
        return http.post(`/items/getByTypeAndLocation`, {typeId: typeId, location: location});
    }
};

export default new ItemDataService();
