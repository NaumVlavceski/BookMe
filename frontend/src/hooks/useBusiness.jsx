import {useCallback, useEffect, useState} from "react";
import businessService from "../services/BusinessService.js";

const useBusiness=()=>{
    const [state,setState]=useState({
        businesses:[],
        loading:true,
    });
    const findAllBusinesses = useCallback(() => {
        businessService
            .findAllBusinesses()
            .then(res=>{
                console.log(res)
                setState({businesses: res.data, loading:false})
            })
    },[]);
    useEffect(() => {
        findAllBusinesses();
    }, [findAllBusinesses]);

    return {...state}
}
export default useBusiness;