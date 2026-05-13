import { useState } from "react";
import useAppointments from "../../hooks/useAppointments.jsx";
import useAvailability from "../../hooks/useAvailability.jsx";

const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
};

const getWeekDays = (monday) =>
    Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(d.getDate() + i);
        return d;
    });

const toTime = (dt) => {
    if (!dt) return "";
    const parts = dt.split("T")[1]?.split(":");
    return parts ? `${parts[0]}:${parts[1]}` : "";
};

const toDateStr = (dt) => dt?.split("T")[0] ?? "";

const dateToStr = (d) => d.toISOString().split("T")[0];

const toMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
};

const JS_TO_JAVA = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];


const COLORS = [
    { bg: "bg-violet-50",  border: "border-violet-200", text: "text-violet-700"  },
    { bg: "bg-emerald-50", border: "border-emerald-200",text: "text-emerald-700" },
    { bg: "bg-amber-50",   border: "border-amber-200",  text: "text-amber-700"   },
    { bg: "bg-sky-50",     border: "border-sky-200",    text: "text-sky-700"     },
    { bg: "bg-rose-50",    border: "border-rose-200",   text: "text-rose-700"    },
];

// generate hour slots from open to close (e.g. "09:00" to "17:00")
const generateHours = (openTime, closeTime) => {
    const start = Math.floor(toMinutes(openTime) / 60);
    const end   = Math.ceil(toMinutes(closeTime) / 60);
    return Array.from({ length: end - start }, (_, i) => {
        const h = start + i;
        return `${String(h).padStart(2, "0")}:00`;
    });
};


const Calendar = ({ business }) => {
    const { appointments, loading: loadingAppts } = useAppointments();
    const { availabilities, loading: loadingAvail } = useAvailability(business);

    const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
    const [selected, setSelected]   = useState(null); // selected appointment

    if (loadingAppts || loadingAvail) {
        return (
            <div className="flex items-center justify-center h-40 text-sm text-gray-400">
                Loading calendar...
            </div>
        );
    }

    const weekDays  = getWeekDays(weekStart);
    const weekEnd   = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const activeDays = weekDays.filter(d => {
        const javaDow = JS_TO_JAVA[d.getDay()];
        return availabilities.find(a => a.dayOfWeek === javaDow && a.active);
    });

    const getAvail = (date) => {
        const javaDow = JS_TO_JAVA[date.getDay()];
        return availabilities.find(a => a.dayOfWeek === javaDow);
    };

    const allOpen  = activeDays.map(d => getAvail(d)?.openTime  ?? "09:00");
    const allClose = activeDays.map(d => getAvail(d)?.closeTime ?? "17:00");
    const minOpen  = allOpen.reduce((a, b)  => a < b ? a : b, "09:00");
    const maxClose = allClose.reduce((a, b) => a > b ? a : b, "17:00");
    const hours    = generateHours(minOpen, maxClose);

    const weekAppts = (appointments ?? []).filter(a => {
        const ds = toDateStr(a.startTime);
        return ds >= dateToStr(weekStart) && ds <= dateToStr(weekEnd);
    });

    const getAppts = (date, hour) => {
        const ds      = dateToStr(date);
        const hourMin = toMinutes(hour);
        return weekAppts.filter(a => {
            if (toDateStr(a.startTime) !== ds) return false;
            const start = toMinutes(toTime(a.startTime));
            const end   = toMinutes(toTime(a.endTime));
            return start >= hourMin && start < hourMin + 60;
        });
    };

    const serviceNames = [...new Set(weekAppts.map(a => a.serviceName ?? "Appointment"))];
    const colorMap     = Object.fromEntries(
        serviceNames.map((name, i) => [name, COLORS[i % COLORS.length]])
    );

    const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const weekLabel = `${fmt(weekStart)} – ${fmt(weekEnd)}, ${weekStart.getFullYear()}`;

    const prevWeek = () => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() - 7);
        setWeekStart(d);
        setSelected(null);
    };

    const nextWeek = () => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + 7);
        setWeekStart(d);
        setSelected(null);
    };

    const goToday = () => {
        setWeekStart(getWeekStart(new Date()));
        setSelected(null);
    };

    const todayStr = dateToStr(new Date());

    return (
        <div>
            <div className="flex items-center gap-3 mb-5">
                <h2 className="text-base font-medium text-gray-900">Calendar</h2>
                <div className="flex items-center gap-2 ml-auto">
                    <button
                        onClick={prevWeek}
                        className="w-7 h-7 rounded-full border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 flex items-center justify-center transition-colors"
                    >
                        ‹
                    </button>
                    <span className="text-sm font-medium text-gray-700 min-w-[160px] text-center">
                        {weekLabel}
                    </span>
                    <button
                        onClick={nextWeek}
                        className="w-7 h-7 rounded-full border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 flex items-center justify-center transition-colors"
                    >
                        ›
                    </button>
                    <button
                        onClick={goToday}
                        className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors ml-1"
                    >
                        Today
                    </button>
                </div>
            </div>

            {serviceNames.length > 0 && (
                <div className="flex gap-3 mb-4 flex-wrap">
                    {serviceNames.map(name => {
                        const c = colorMap[name];
                        return (
                            <div key={name} className="flex items-center gap-1.5 text-xs text-gray-500">
                                <span className={`w-2.5 h-2.5 rounded-sm ${c.bg} border ${c.border}`} />
                                {name}
                            </div>
                        );
                    })}
                </div>
            )}

            {activeDays.length === 0 && (
                <div className="flex items-center justify-center h-32 border border-dashed border-gray-200 rounded-xl text-sm text-gray-400">
                    No working days this week
                </div>
            )}

            {activeDays.length > 0 && (
                <div className="overflow-x-auto">
                    <div
                        className="grid min-w-[400px]"
                        style={{ gridTemplateColumns: `44px repeat(${activeDays.length}, minmax(0,1fr))` }}
                    >
                        <div />
                        {activeDays.map(d => {
                            const ds      = dateToStr(d);
                            const isToday = ds === todayStr;
                            const label   = d.toLocaleDateString("en-US", { weekday: "short" });
                            const num     = d.getDate();
                            return (
                                <div key={ds} className="text-center pb-3">
                                    <span className={`text-xs font-medium ${isToday ? "text-violet-600" : "text-gray-400"}`}>
                                        {label}
                                    </span>
                                    <span className={`block text-sm font-medium mt-0.5 w-7 h-7 mx-auto rounded-full flex items-center justify-center ${
                                        isToday
                                            ? "bg-violet-600 text-white"
                                            : "text-gray-700"
                                    }`}>
                                        {num}
                                    </span>
                                </div>
                            );
                        })}

                        {hours.map(hour => (
                            <>
                                <div key={hour + "t"} className="text-right text-xs text-gray-400 pr-2 pt-1 pb-1">
                                    {hour}
                                </div>
                                {activeDays.map(d => {
                                    const ds    = dateToStr(d);
                                    const avail = getAvail(d);
                                    const appts = getAppts(d, hour);

                                    // is this hour inside working hours?
                                    const inRange = avail &&
                                        toMinutes(hour) >= toMinutes(avail.openTime) &&
                                        toMinutes(hour) <  toMinutes(avail.closeTime);

                                    return (
                                        <div
                                            key={ds + hour}
                                            className={`min-h-[40px] rounded-lg border mb-1 mx-0.5 ${
                                                inRange
                                                    ? "bg-gray-50 border-gray-100"
                                                    : "bg-gray-100 border-gray-100 opacity-40"
                                            }`}
                                        >
                                            {appts.map(a => {
                                                const name  = a.serviceName ?? "Appointment";
                                                const color = colorMap[name] ?? COLORS[0];
                                                const isSel = selected?.id === a.id;
                                                return (
                                                    <div
                                                        key={a.id}
                                                        onClick={() => setSelected(isSel ? null : a)}
                                                        className={`mx-1 my-0.5 px-2 py-1 rounded-md border cursor-pointer transition-all ${color.bg} ${color.border} ${
                                                            isSel ? "ring-2 ring-violet-400" : "hover:brightness-95"
                                                        }`}
                                                    >
                                                        <p className={`text-xs font-medium truncate ${color.text}`}>
                                                            {toTime(a.startTime)} {name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {a.customerName}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </>
                        ))}
                    </div>
                </div>
            )}

            {/* ── appointment detail panel ── */}
            {selected && (
                <div className="mt-4 p-4 border border-violet-100 bg-violet-50 rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                        <p className="text-sm font-medium text-violet-900">Appointment details</p>
                        <button
                            onClick={() => setSelected(null)}
                            className="text-gray-400 hover:text-gray-600 text-sm"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <span className="text-gray-400">Customer</span>
                            <p className="font-medium text-gray-800 mt-0.5">{selected.customerName}</p>
                        </div>
                        <div>
                            <span className="text-gray-400">Service</span>
                            <p className="font-medium text-gray-800 mt-0.5">{selected.serviceName ?? "—"}</p>
                        </div>
                        <div>
                            <span className="text-gray-400">Start</span>
                            <p className="font-medium text-gray-800 mt-0.5">{toTime(selected.startTime)}</p>
                        </div>
                        <div>
                            <span className="text-gray-400">End</span>
                            <p className="font-medium text-gray-800 mt-0.5">{toTime(selected.endTime)}</p>
                        </div>
                        <div>
                            <span className="text-gray-400">Status</span>
                            <p className="font-medium text-gray-800 mt-0.5">{selected.status}</p>
                        </div>
                        <div>
                            <span className="text-gray-400">Date</span>
                            <p className="font-medium text-gray-800 mt-0.5">{toDateStr(selected.startTime)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;