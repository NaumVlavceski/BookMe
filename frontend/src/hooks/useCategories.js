import {useEffect, useState} from "react";
import api from "../services/api.js";

export function useCategories() {
    const [categories,setCategories] = useState([]);

    useEffect(() => {
        api.get("/api/enums/categories")
            .then(res => {setCategories(res.data)})
            .catch(err => console.error(err));
    }, []);
    return categories;
}