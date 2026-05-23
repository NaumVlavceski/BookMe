import {Navigate, Outlet, useLocation} from "react-router-dom";
import useBusinessMyDetails from "../hooks/useBusinessMyDetails.jsx";

const BusinessOwnerRoute = ({ user }) => {
    const { business, loading } = useBusinessMyDetails();

    if (!user) return <Navigate to="/" replace />;
    if (user.role !== "BUSINESS_OWNER") return <Navigate to="/" replace />;
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-7 h-7 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    const location = useLocation();
    console.log(location)
    if ((!business || !business.name) && location.pathname !== "/business/edit") {
        return <Navigate to="/business/edit" replace />;
    }

    return <Outlet />;
};

export default BusinessOwnerRoute;