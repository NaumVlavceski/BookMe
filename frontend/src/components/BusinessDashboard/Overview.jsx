import { useMemo } from "react";
import useAppointments from "../../hooks/useAppointments.jsx";

// ── helpers ──────────────────────────────────────────────────────────────────

const toDateStr = (dt) => dt?.split("T")[0] ?? "";
const toTime    = (dt) => {
    if (!dt) return "";
    const parts = dt.split("T")[1]?.split(":");
    return parts ? `${parts[0]}:${parts[1]}` : "";
};

const todayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
};

const thisWeekRange = () => {
    const now   = new Date();
    const day   = now.getDay();
    const diff  = day === 0 ? -6 : 1 - day;
    const mon   = new Date(now); mon.setDate(now.getDate() + diff); mon.setHours(0,0,0,0);
    const sun   = new Date(mon); sun.setDate(mon.getDate() + 6);   sun.setHours(23,59,59,999);
    return { mon, sun };
};

const thisMonthRange = () => {
    const now   = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    return { start, end };
};

const STATUS_STYLES = {
    CONFIRMED: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    PENDING:   "bg-amber-50 text-amber-800 border border-amber-200",
    CANCELLED: "bg-gray-100 text-gray-400 border border-gray-200",
};

// ── sub components ────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, highlight }) {
    return (
        <div className={`rounded-xl p-4 ${highlight ? "bg-violet-50 border border-violet-100" : "bg-gray-50"}`}>
            <p className={`text-xs mb-1 ${highlight ? "text-violet-500" : "text-gray-500"}`}>{label}</p>
            <p className={`text-2xl font-medium ${highlight ? "text-violet-700" : "text-gray-900"}`}>{value}</p>
            {sub && <p className={`text-xs mt-1 ${highlight ? "text-violet-400" : "text-gray-400"}`}>{sub}</p>}
        </div>
    );
}

function AppointmentRow({ appt }) {
    return (
        <div className={`flex items-center gap-3 px-3 py-3 border border-gray-100 rounded-xl mb-2 bg-white ${
            appt.status === "CANCELLED" ? "opacity-40" : ""
        }`}>
            <span className="text-sm font-medium text-violet-600 w-12 flex-shrink-0">
                {toTime(appt.startTime)}
            </span>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{appt.customerName}</p>
                <p className="text-xs text-gray-400 truncate">
                    {appt.serviceName ?? "—"}
                    {appt.endTime ? ` · until ${toTime(appt.endTime)}` : ""}
                </p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${STATUS_STYLES[appt.status] ?? ""}`}>
                {appt.status}
            </span>
        </div>
    );
}

// ── main component ────────────────────────────────────────────────────────────

const Overview = ({ business }) => {
    const { appointments, loading } = useAppointments(business);

    const today = todayStr();
    const { mon: weekMon, sun: weekSun } = thisWeekRange();
    const { start: monthStart, end: monthEnd } = thisMonthRange();

    const todayAppts = useMemo(() =>
            (appointments ?? [])
                .filter(a => toDateStr(a.startTime) === today)
                .sort((a, b) => a.startTime.localeCompare(b.startTime)),
        [appointments, today]
    );

    const weekAppts = useMemo(() =>
            (appointments ?? []).filter(a => {
                const d = new Date(toDateStr(a.startTime) + "T00:00:00");
                return d >= weekMon && d <= weekSun;
            }),
        [appointments]
    );

    const monthAppts = useMemo(() =>
            (appointments ?? []).filter(a => {
                const d = new Date(toDateStr(a.startTime) + "T00:00:00");
                return d >= monthStart && d <= monthEnd;
            }),
        [appointments]
    );

    // next upcoming appointment today (not cancelled, not in the past)
    const now = new Date();
    const nextAppt = todayAppts.find(a =>
        a.status !== "CANCELLED" &&
        new Date(a.startTime) > now
    );

    // time until next appointment
    const timeUntil = (dt) => {
        const diff = new Date(dt) - new Date();
        if (diff <= 0) return null;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        if (h > 0) return `in ${h}h ${m}min`;
        return `in ${m}min`;
    };

    const todayLabel = new Date().toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric"
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-40 text-sm text-gray-400">
                Loading...
            </div>
        );
    }

    const confirmed = todayAppts.filter(a => a.status === "CONFIRMED").length;
    const remaining = todayAppts.filter(a =>
        a.status !== "CANCELLED" && new Date(a.startTime) > now
    ).length;

    return (
        <div>
            <h2 className="text-base font-medium text-gray-900 mb-4">Overview</h2>

            {/* ── stat cards ── */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <StatCard
                    label="Today's bookings"
                    value={todayAppts.length}
                    sub={`${remaining} remaining · ${confirmed} confirmed`}
                />
                <StatCard
                    label="This week"
                    value={weekAppts.length}
                    sub={`${weekAppts.filter(a => a.status === "CONFIRMED").length} confirmed`}
                />
                <StatCard
                    label="This month"
                    value={monthAppts.length}
                    sub={`${monthAppts.filter(a => a.status === "CANCELLED").length} cancelled`}
                />
            </div>

            {/* ── next appointment highlight ── */}
            {nextAppt && (
                <div className="flex items-center gap-4 px-4 py-3 bg-violet-50 border border-violet-200 rounded-xl mb-5">
                    <div className="text-center">
                        <p className="text-2xl font-medium text-violet-600">{toTime(nextAppt.startTime)}</p>
                        <p className="text-xs text-violet-400 mt-0.5">{timeUntil(nextAppt.startTime)}</p>
                    </div>
                    <div className="w-px h-10 bg-violet-200" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-violet-900 truncate">{nextAppt.customerName}</p>
                        <p className="text-xs text-violet-500 mt-0.5">
                            {nextAppt.serviceName ?? "—"}
                            {nextAppt.endTime ? ` · until ${toTime(nextAppt.endTime)}` : ""}
                        </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 font-medium flex-shrink-0">
                        Next
                    </span>
                </div>
            )}

            {/* ── today's schedule ── */}
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
                Today's schedule — {todayLabel}
            </p>

            {todayAppts.length === 0 ? (
                <div className="flex items-center justify-center h-20 border border-dashed border-gray-200 rounded-xl text-sm text-gray-400">
                    No appointments today
                </div>
            ) : (
                todayAppts.map(a => <AppointmentRow key={a.id} appt={a} />)
            )}

            {/* ── upcoming this week ── */}
            {weekAppts.filter(a => toDateStr(a.startTime) !== today).length > 0 && (
                <>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3 mt-6">
                        Rest of this week
                    </p>
                    {weekAppts
                        .filter(a => toDateStr(a.startTime) !== today)
                        .sort((a, b) => a.startTime.localeCompare(b.startTime))
                        .map(a => (
                            <div key={a.id} className="flex items-center gap-3 px-3 py-2.5 border border-gray-100 rounded-xl mb-2 bg-white">
                                <div className="text-center min-w-[44px]">
                                    <p className="text-xs font-medium text-violet-600">{toTime(a.startTime)}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(toDateStr(a.startTime) + "T00:00:00")
                                            .toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                                    </p>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{a.customerName}</p>
                                    <p className="text-xs text-gray-400">{a.serviceName ?? "—"}</p>
                                </div>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${STATUS_STYLES[a.status] ?? ""}`}>
                                    {a.status}
                                </span>
                            </div>
                        ))}
                </>
            )}
        </div>
    );
};

export default Overview;