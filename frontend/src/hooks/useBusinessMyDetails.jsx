import {useEffect, useState} from "react";
import businessService from "../services/BusinessService.js";

const useBusinessMyDetails = () => {
    const [state, setState] = useState({"business": [], "loading": true})
    useEffect(() => {
        businessService
            .myDetails()
            .then(res => {
                setState({"business": res.data, "loading": false});
            })
    }, []);
    return state;
}
export default useBusinessMyDetails;