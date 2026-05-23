import {useState} from "react";
import Overview from "../components/BusinessDashboard/Overview.jsx";
import Appointments from "../components/BusinessDashboard/Appointments.jsx";
import Services from "../components/BusinessDashboard/Services.jsx";
import Availability from "../components/BusinessDashboard/Availability.jsx";
import Calendar from "../components/BusinessDashboard/Calendar.jsx";
import useBusinessDetails from "../hooks/useBusinessMyDetails.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import Header from "../components/HomePage/Header.jsx";
import {useNavigate} from "react-router-dom";

const BusinessDashboard = () => {
    const navItems = [
        {
            tab: "Overview", label: "Overview",
            icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <rect x="2" y="2" width="5" height="5" rx="1"/>
                <rect x="9" y="2" width="5" height="5" rx="1"/>
                <rect x="2" y="9" width="5" height="5" rx="1"/>
                <rect x="9" y="9" width="5" height="5" rx="1"/>
            </svg>,
        },
        {
            tab: "Appointments", label: "Appointments",
            icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <rect x="2" y="3" width="12" height="11" rx="1.5"/>
                <path d="M5 1v4M11 1v4M2 7h12"/>
            </svg>,
        },
        {
            tab: "Services", label: "Services",
            icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path d="M2 4h12M2 8h8M2 12h5"/>
            </svg>,
        },
        {
            tab: "Availability", label: "Availability",
            icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <circle cx="8" cy="8" r="6"/>
                <path d="M8 4v4l2 2"/>
            </svg>,
        },
        {
            tab: "Calendar", label: "Calendar",
            icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <rect x="2" y="3" width="12" height="11" rx="1.5"/>
                <path d="M5 1v4M11 1v4M2 7h12"/>
            </svg>,
        }

    ]
    const [active, setActive] = useState("Overview");
    const handleChange = (item) => {
        setActive(item.label)
    }
    const COMPONENTS = {
        Overview: Overview,
        Appointments: Appointments,
        Services: Services,
        Availability: Availability,
        Calendar: Calendar
    }
    const ActiveComponent = COMPONENTS[active];
    const {user} = useAuth()
    const {business, loading} = useBusinessDetails(user.id);
    if (loading) {
        return (
            <div>LOADING</div>
        )
    }
    const splitName = business.name.split(" ");
    const avatar = business.name.charAt(0).toUpperCase() + (splitName.length > 1 ? splitName[1].charAt(0).toUpperCase() : business.name.charAt(1).toUpperCase());
    return (
        <div>
            <Header/>
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                <aside className="w-52 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
                    <div className="p-4 border-b border-gray-100">
                        <div
                            className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center text-sm font-medium text-violet-700 mb-2">
                            {avatar}
                        </div>
                        <p className="text-sm font-medium text-gray-900">{business.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"/>
                            {business.businessCategory} · {business.city}
                        </p>
                    </div>

                    <nav className="flex-1 p-3 flex flex-col gap-1">
                        <p className="text-xs font-medium text-gray-300 uppercase tracking-wide px-1 mb-1 mt-1">Main</p>
                        {navItems.map((item) => (
                            <div
                                onClick={() => handleChange(item)}
                                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all text-left ${
                                    active === item.label
                                        ? "bg-violet-50 text-violet-700 font-medium"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                }`}>
                                <span className="inline-block ps-3">{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </nav>

                    <div className="p-3 border-t border-gray-100">
                        <a
                            href={"/business/edit"}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                                 className="w-4 h-4">
                                <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6"/>
                            </svg>
                            Settings
                        </a>
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-3xl mx-auto px-6 py-6">
                        <ActiveComponent business={business.id}/>
                    </div>
                </main>
            </div>
        </div>
    )
}
export default BusinessDashboard;