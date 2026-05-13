import {useCallback, useEffect, useState} from "react";
import businessService from "../services/BusinessService.js";

const useAppointments = () => {
    const [state, setState] = useState({
        "appointments": [],
        "loading": true,
    });
    const findBookedAppointments = useCallback(() => {
        businessService
            .findBookedAppointments()
            .then(res => {
                setState({
                    "appointments": res.data,
                    "loading": false
                })
            })
    },[])
    useEffect(() => {
        findBookedAppointments();
    }, [findBookedAppointments]);

    return {...state,findBookedAppointments}
}
export default useAppointments;