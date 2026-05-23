import api from "./api.js";

const BusinessService = {
    myDetails: async () => {
        return await api.get(`/api/businesses/me`);
    },
    findAllBusinesses: async () => {
        return await api.get(`/api/businesses`)
    },
    findBookedAppointments: async () =>{
      return await api.get(`/api/businesses/bookedAppointments`)
    },
    editBusinesses: async (data) => {
        return await api.put(`/api/businesses/edit`,data)
    },
    deleteBusiness: async (id) =>{
        return await api.delete(`/api/businesses/delete/${id}`)
    }
}
export default BusinessService;