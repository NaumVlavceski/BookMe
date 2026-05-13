import {useCallback, useEffect, useState} from "react";
import serviceService from "../services/ServiceService.js";

const useServices = (businessId) => {
    const [state, setState] = useState({service: [], loading: true})
    useEffect((serviceId) => {
        serviceService
            .getService(businessId, serviceId)
            .then(res => {
                setState({
                    services: res.data,
                    loading: false
                })
            })
    }, [businessId]);
    return state;
}
export default useServices
