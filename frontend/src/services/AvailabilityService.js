import api from "./api.js";

const AvailabilityService = {
    findAllAvailabilityByBusinessId: async ({businessId}) => {
        return await api.get(`/api/availability/${businessId}`)
    },
    updateAvailability: async (data) => {
        return await api.put(`/api/availability/edit`,data)
    }

}
export default AvailabilityService;