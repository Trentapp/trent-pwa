import http from "../http-common";

class ItemDataService {
    getByTypeAndLocation(typeId, location) { //not currently used (today is 23.9.)
        return http.post(`/items/getByTypeAndLocation`, {typeId: typeId, location: location});
    }
};

export default new ItemDataService();
