import useAvailability from "../../hooks/useAvailability.jsx";
import {useState} from "react";

const Availability = ({business}) => {
    const {availabilities, loading, updateAvailability} = useAvailability(business)
    const toggle = (dayOfWeek) => {
        const day = availabilities.find(a => a.dayOfWeek === dayOfWeek);
        const updated = {
            dayOfWeek: dayOfWeek.toString(),
            openTime: day.openTime,
            closeTime: day.closeTime,
            active: !day.active
        };
        updateAvailability(updated);


    };
    const updateTime = (day, fieldName, fieldValue) => {
        const updated = {
            dayOfWeek: day.dayOfWeek.toString(),
            openTime: day.openTime,
            closeTime: day.closeTime,
            active: day.active,
            [fieldName]: fieldValue  // ← correct computed property syntax
        };
        updateAvailability(updated);

    }

    return (
        <div>
            <h2 className="text-base font-medium text-gray-900 mb-1">Availability</h2>
            <p className="text-xs text-gray-400 mb-5">Set your weekly working hours. Toggle days on or off.</p>
            <div className="border border-gray-100 rounded-xl overflow-hidden bg-white mb-4">
                {availabilities.map((d, i) => (
                    <div key={d.key}
                         className={`flex items-center gap-4 px-4 py-3 ${i < availabilities.length - 1 ? "border-b border-gray-50" : ""}`}>
                        <span className="text-sm font-medium text-gray-500 w-24 flex-shrink-0">{d.dayOfWeek}</span>
                        <button
                            name="dayOfWeek"
                            onClick={() => toggle(d.dayOfWeek)}
                            className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${
                                d.active ? "bg-violet-600" : "bg-gray-200"
                            }`}
                        >
                          <span
                              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                                  d.active ? "translate-x-4" : "translate-x-0"
                              }`}
                          />
                        </button>
                        {d.active ? (
                            <div className="flex items-center gap-2 flex-1 h-8">
                                <input
                                    type="time"
                                    name="openTime"
                                    value={d.openTime}
                                    onChange={e => updateTime(d, e.target.name, e.target.value)}
                                    className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-violet-400 w-24"
                                />
                                <span className="text-xs text-gray-400">–</span>
                                <input
                                    type="time"
                                    name={"closeTime"}
                                    value={d.closeTime}
                                    onChange={e => updateTime(d, e.target.name, e.target.value)}
                                    className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-violet-400 w-24"
                                />
                            </div>
                        ) : (
                            <div className="h-8">
                                <span className="text-xs text-gray-400 ml-1">No working</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Availability;