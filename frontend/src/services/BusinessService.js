import api from "./api.js";

const BusinessService = {
    myDetails: async () => {
        return await api.get(`/api/businesses/me`);
    },
    findAllBusinesses: async () => {
        return await api.get(`/api/businesses`)
    }
}
export default BusinessService;