import useAppointments from "../../hooks/useAppointments.jsx";
import useServices from "../../hooks/useServices.jsx";
import {useState} from "react";

const Appointments = ({business}) => {
    const {appointments, loading} = useAppointments();
    const {services} = useServices(business);
    const filters = [
        { key: "ALL",       label: "All",       count: appointments?.length ?? 0 },
        { key: "CONFIRMED", label: "Confirmed", count: appointments?.filter(a => a.status === "CONFIRMED").length ?? 0 },
        { key: "PENDING",   label: "Pending",   count: appointments?.filter(a => a.status === "PENDING").length ?? 0 },
        { key: "CANCELLED", label: "Cancelled", count: appointments?.filter(a => a.status === "CANCELLED").length ?? 0 },
    ]
    const [filter, setFilter] = useState("ALL");
    const visible = filter === "ALL" ? appointments : appointments.filter(a => a.status === filter);
    const STATUS_STYLES = {
        CONFIRMED: "bg-emerald-50 text-emerald-800 border border-emerald-200",
        PENDING:   "bg-amber-50 text-amber-800 border border-amber-200",
        CANCELLED: "bg-gray-100 text-gray-400 border border-gray-200",
    };
    if (loading){
        return (
            <div>LOADING</div>
        )
    }
    return (
        <div>
            <h2 className="text-base font-medium text-gray-900 mb-4">Appointments</h2>
            <div className="flex gap-2 mb-4 flex-wrap">
                {filters.map(f => {

                    return (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                                filter === f.key
                                    ? "bg-violet-600 text-white border-violet-600"
                                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                            }`}
                        >
                            {f.label} ({f.count})
                        </button>
                    )
                })}
            </div>
            {visible.map(a => {
                const service = services.find(s => s.id === a.serviceId);
                const date = a.startTime.split("T")[0]
                const hours = a.startTime.split("T")[1].split(":")[0];
                const minutes = a.startTime.split("T")[1].split(":")[1];
                return (
                    <div key={a.id}
                         className={`flex items-center gap-3 px-3 py-3 border border-gray-100 rounded-xl mb-2 bg-white ${
                             a.status === "CANCELLED" ? "opacity-50" : ""
                         }`}>
            <span className="text-sm font-medium text-violet-600 w-12 flex-shrink-0">
                {hours}:{minutes}
            </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{a.customerName}</p>
                            <p className="text-xs text-gray-400">
                                {service?.name ?? "Unknown service"} · {service?.duration} min · {date}
                            </p>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[a.status]}`}>
                            {a.status}
                        </span>
                    </div>
                );
            })}
        </div>
    )
}
export default Appointments;