import {useCallback, useEffect, useState} from "react";
import availabilityService from "../services/AvailabilityService.js";

const useAvailability = (businessId) => {

    const [state, setState] =
        useState({availabilities: [], loading: true});

    const findAllAvailabilityByBusinessId = useCallback(() => {
        availabilityService
            .findAllAvailabilityByBusinessId({businessId})
            .then(res => {
                setState({
                    availabilities: res.data,
                    loading: false
                })
            })
    }, [businessId]);
    const updateAvailability = useCallback((data) => {
        availabilityService
            .updateAvailability(data)
            .then(res => {
                setState(prev => ({
                    ...prev,
                    availabilities: prev.availabilities.map(a => a.dayOfWeek === data.dayOfWeek ? res.data : a),
                    loading: false
                }))
            })
    }, [])
    useEffect(() => {
        findAllAvailabilityByBusinessId();
    }, [findAllAvailabilityByBusinessId]);
    return {...state,updateAvailability}
}
export default useAvailability;