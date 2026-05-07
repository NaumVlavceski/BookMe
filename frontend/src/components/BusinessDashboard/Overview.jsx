const Overview = () => {

    return(
        <div>
            <h2 className="text-base font-medium text-gray-900 mb-4">Overview</h2>
            <div className="grid grid-cols-3 gap-3 mb-6">
                <StatCard label="Today's bookings" value="6"  sub="2 remaining" />
                <StatCard label="This week"         value="24" sub="+3 vs last week" />
                <StatCard label="This month"        value="89" sub="€1,340 revenue" />
            </div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Today's schedule — May 3</p>
            {/*{today.map(a => <AppointmentRow key={a.id} appt={a} showDate={false} />)}*/}
            {/*{next && (*/}
            {/*    <>*/}
            {/*        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3 mt-5">Next appointment</p>*/}
            {/*        <div className="flex items-center gap-4 px-4 py-3 bg-violet-50 border border-violet-200 rounded-xl">*/}
            {/*            <span className="text-2xl font-medium text-violet-600">{next.time}</span>*/}
            {/*            <div>*/}
            {/*                <p className="text-sm font-medium text-violet-900">{next.name}</p>*/}
            {/*                <p className="text-xs text-violet-500">{next.service} · {next.duration} · in 2h 15min</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </>*/}
            {/*)}*/}
        </div>
    )
}
function StatCard({ label, value, sub }) {
    return (
        <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-2xl font-medium text-gray-900">{value}</p>
            {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
    );
}
export default Overview;