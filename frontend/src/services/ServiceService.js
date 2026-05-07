import api from "./api.js";

const ServiceService = {
    getAllServices: async (businessId) => {
        return await api.get(`/api/businesses/${businessId}/services`);
    },
    getService: async (businessId,serviceId) => {
        return await api.get(`/api/businesses/${businessId}/services/${serviceId}`);
    },
    createService: async (data) => {
        return await api.post(`/api/businesses/services/create`, data)
    },
    updateService: async (data,serviceId) =>{
        return await api.put(`/api/businesses/update/services/${serviceId}`, data)
    },
    deleteService: async (serviceId) => {
        return await api.delete(`/api/businesses/delete/services/${serviceId}`);
    }
}
export default ServiceService;