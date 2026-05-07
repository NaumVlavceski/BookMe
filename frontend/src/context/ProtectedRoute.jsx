import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute=({user})=>{
    if(user.role !== "BUSINESS_OWNER"){
        return <Navigate to={'/'} replace/>
    }
    return (
        <Outlet/>
    )
}
export default ProtectedRoute