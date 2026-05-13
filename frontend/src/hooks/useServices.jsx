import {useCallback, useEffect, useState} from "react";
import serviceService from "../services/ServiceService.js";

const useServices = (businessId) => {
    const [state, setState] = useState({services: [], loading: true})
    const fetchServices = useCallback(() => {
        serviceService
            .getAllServices(businessId)
            .then(res => setState({
                services: res.data,
                loading: false
            }))
            .catch(err => console.log(err));
    }, [businessId])
    const createService = useCallback((data) => {
        serviceService
            .createService(data)
            .then(res => {
                console.log(res)
                setState(prev => ({
                    ...prev,
                    services: [...prev.services, res.data],
                    loading: false
                }))
            })
            .catch(err => console.error(err));
    }, [])
    const updateService = useCallback((data, serviceId) => {
        serviceService
            .updateService(data, serviceId)
            .then((res) => {
                console.log(res)
                setState(prev => ({
                    ...prev,
                    services: prev.services.map(s => s.id === serviceId ? res.data : s),
                    loading: false
                }))
            })
    }, [])

    const deleteService = useCallback((serviceId) => {
        serviceService
            .deleteService(serviceId)
            .then(() => {
                setState(prev => ({
                    ...prev,
                    services: prev.services.filter(s => s.id !== serviceId),
                    loading: false
                }))
            })
            .catch(err => console.error(err));
    }, [])

    useEffect(() => {
        fetchServices();
    }, [fetchServices])
    return {...state, createService, updateService, deleteService}
}
export default useServices