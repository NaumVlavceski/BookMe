// import { useState } from "react";
//
// const DAYS = [
//     { key: "MON", label: "Monday",    on: true,  open: "09:00", close: "17:00" },
//     { key: "TUE", label: "Tuesday",   on: true,  open: "09:00", close: "17:00" },
//     { key: "WED", label: "Wednesday", on: true,  open: "09:00", close: "17:00" },
//     { key: "THU", label: "Thursday",  on: true,  open: "09:00", close: "17:00" },
//     { key: "FRI", label: "Friday",    on: true,  open: "09:00", close: "17:00" },
//     { key: "SAT", label: "Saturday",  on: false, open: "09:00", close: "14:00" },
//     { key: "SUN", label: "Sunday",    on: false, open: "09:00", close: "14:00" },
// ];
//
// const APPOINTMENTS = [
//     { id: 1, time: "09:00", name: "Ana Stojanovic",    service: "Haircut",   duration: "45 min", date: "May 3", status: "CONFIRMED" },
//     { id: 2, time: "10:30", name: "Marija Petrovska",  service: "Coloring",  duration: "90 min", date: "May 3", status: "CONFIRMED" },
//     { id: 3, time: "13:00", name: "Elena Todorovska",  service: "Blowout",   duration: "60 min", date: "May 3", status: "PENDING"   },
//     { id: 4, time: "15:00", name: "Ivana Nikolovska",  service: "Haircut",   duration: "45 min", date: "May 3", status: "CANCELLED" },
//     { id: 5, time: "09:30", name: "Sara Dimitrievska", service: "Keratin",   duration: "120 min",date: "May 5", status: "CONFIRMED" },
//     { id: 6, time: "11:00", name: "Bojana Ristovska",  service: "Haircut",   duration: "45 min", date: "May 6", status: "CONFIRMED" },
// ];
//
// const SERVICES = [
//     { id: 1, name: "Haircut",           duration: "45 min",  description: "Includes wash & styling",        price: 15 },
//     { id: 2, name: "Hair coloring",     duration: "90 min",  description: "Full color or highlights",       price: 45 },
//     { id: 3, name: "Keratin treatment", duration: "120 min", description: "Smoothing & frizz control",      price: 80 },
//     { id: 4, name: "Blowout & styling", duration: "60 min",  description: "Blowdry and finish",             price: 25 },
// ];
//
// const CALENDAR = [
//     { time: "09:00", mon: { text: "Haircut",  type: "purple" }, tue: { text: "Haircut", type: "purple" }, wed: null, thu: { text: "Coloring", type: "teal" }, fri: null },
//     { time: "10:00", mon: null, tue: { text: "Coloring", type: "teal" }, wed: { text: "Blowout", type: "purple" }, thu: null, fri: { text: "Haircut", type: "purple" } },
//     { time: "11:00", mon: { text: "Keratin",  type: "teal" },   tue: { text: "Haircut", type: "purple" }, wed: null, thu: { text: "Blowout", type: "purple" }, fri: { text: "Coloring", type: "teal" } },
//     { time: "12:00", mon: null, tue: null, wed: { text: "Haircut", type: "purple" }, thu: null, fri: { text: "Keratin", type: "teal" } },
//     { time: "13:00", mon: { text: "Blowout",  type: "purple" }, tue: null, wed: { text: "Coloring", type: "teal" }, thu: { text: "Haircut", type: "purple" }, fri: null },
// ];
//
// const STATUS_STYLES = {
//     CONFIRMED: "bg-emerald-50 text-emerald-800 border border-emerald-200",
//     PENDING:   "bg-amber-50 text-amber-800 border border-amber-200",
//     CANCELLED: "bg-gray-100 text-gray-400 border border-gray-200",
// };
//
// const STATUS_LABEL = {
//     CONFIRMED: "Confirmed",
//     PENDING:   "Pending",
//     CANCELLED: "Cancelled",
// };
//
// function Toggle({ on, onToggle }) {
//     return (
//         <button
//             onClick={onToggle}
//             className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${
//                 on ? "bg-violet-600" : "bg-gray-200"
//             }`}
//         >
//       <span
//           className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
//               on ? "translate-x-4" : "translate-x-0"
//           }`}
//       />
//         </button>
//     );
// }
//
// function Badge({ status }) {
//     return (
//         <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[status]}`}>
//       {STATUS_LABEL[status]}
//     </span>
//     );
// }
//
// function NavItem({ icon, label, tab, active, badge, onClick }) {
//     return (
//         <button
//             onClick={() => onClick(tab)}
//             className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all text-left ${
//                 active
//                     ? "bg-violet-50 text-violet-700 font-medium"
//                     : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
//             }`}
//         >
//             <span className="w-4 h-4 flex-shrink-0">{icon}</span>
//             <span className="flex-1">{label}</span>
//             {badge && (
//                 <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
//           {badge}
//         </span>
//             )}
//         </button>
//     );
// }
//
// function StatCard({ label, value, sub }) {
//     return (
//         <div className="bg-gray-50 rounded-xl p-4">
//             <p className="text-xs text-gray-500 mb-1">{label}</p>
//             <p className="text-2xl font-medium text-gray-900">{value}</p>
//             {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
//         </div>
//     );
// }
//
// function AppointmentRow({ appt, showDate }) {
//     return (
//         <div className={`flex items-center gap-3 px-3 py-3 border border-gray-100 rounded-xl mb-2 bg-white ${
//             appt.status === "CANCELLED" ? "opacity-50" : ""
//         }`}>
//             <span className="text-sm font-medium text-violet-600 w-12 flex-shrink-0">{appt.time}</span>
//             <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-gray-900 truncate">{appt.name}</p>
//                 <p className="text-xs text-gray-400">{appt.service} · {appt.duration}{showDate ? ` · ${appt.date}` : ""}</p>
//             </div>
//             <Badge status={appt.status} />
//         </div>
//     );
// }
//
// function OverviewTab() {
//     const today = APPOINTMENTS.filter(a => a.date === "May 3");
//     const next = today.find(a => a.status === "PENDING");
//     return (
//         <div>
//             <h2 className="text-base font-medium text-gray-900 mb-4">Overview</h2>
//             <div className="grid grid-cols-3 gap-3 mb-6">
//                 <StatCard label="Today's bookings" value="6"  sub="2 remaining" />
//                 <StatCard label="This week"         value="24" sub="+3 vs last week" />
//                 <StatCard label="This month"        value="89" sub="€1,340 revenue" />
//             </div>
//             <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Today's schedule — May 3</p>
//             {today.map(a => <AppointmentRow key={a.id} appt={a} showDate={false} />)}
//             {next && (
//                 <>
//                     <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3 mt-5">Next appointment</p>
//                     <div className="flex items-center gap-4 px-4 py-3 bg-violet-50 border border-violet-200 rounded-xl">
//                         <span className="text-2xl font-medium text-violet-600">{next.time}</span>
//                         <div>
//                             <p className="text-sm font-medium text-violet-900">{next.name}</p>
//                             <p className="text-xs text-violet-500">{next.service} · {next.duration} · in 2h 15min</p>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }
//
// function AppointmentsTab() {
//     const [filter, setFilter] = useState("ALL");
//     const filters = [
//         { key: "ALL",       label: "All (6)" },
//         { key: "CONFIRMED", label: "Confirmed (4)" },
//         { key: "PENDING",   label: "Pending (1)" },
//         { key: "CANCELLED", label: "Cancelled (1)" },
//     ];
//     const visible = filter === "ALL" ? APPOINTMENTS : APPOINTMENTS.filter(a => a.status === filter);
//     return (
//         <div>
//             <h2 className="text-base font-medium text-gray-900 mb-4">Appointments</h2>
//             <div className="flex gap-2 mb-4 flex-wrap">
//                 {filters.map(f => (
//                     <button
//                         key={f.key}
//                         onClick={() => setFilter(f.key)}
//                         className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
//                             filter === f.key
//                                 ? "bg-violet-600 text-white border-violet-600"
//                                 : "border-gray-200 text-gray-500 hover:border-gray-300"
//                         }`}
//                     >
//                         {f.label}
//                     </button>
//                 ))}
//             </div>
//             {visible.map(a => <AppointmentRow key={a.id} appt={a} showDate={true} />)}
//         </div>
//     );
// }
//
// function ServicesTab() {
//     const [services, setServices] = useState(SERVICES);
//     const [showForm, setShowForm] = useState(false);
//     const [form, setForm] = useState({ name: "", duration: "", description: "", price: "" });
//
//     const handleDelete = (id) => setServices(s => s.filter(x => x.id !== id));
//     const handleAdd = () => {
//         if (!form.name || !form.price) return;
//         setServices(s => [...s, { ...form, id: Date.now(), price: Number(form.price) }]);
//         setForm({ name: "", duration: "", description: "", price: "" });
//         setShowForm(false);
//     };
//
//     return (
//         <div>
//             <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-base font-medium text-gray-900">Services</h2>
//                 <button
//                     onClick={() => setShowForm(!showForm)}
//                     className="text-sm px-4 py-2 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-colors"
//                 >
//                     + Add service
//                 </button>
//             </div>
//
//             {showForm && (
//                 <div className="mb-4 p-4 border border-violet-100 bg-violet-50 rounded-xl">
//                     <p className="text-sm font-medium text-violet-900 mb-3">New service</p>
//                     <div className="grid grid-cols-2 gap-3 mb-3">
//                         <div>
//                             <label className="text-xs text-gray-500 mb-1 block">Name</label>
//                             <input
//                                 value={form.name}
//                                 onChange={e => setForm(f => ({...f, name: e.target.value}))}
//                                 placeholder="e.g. Haircut"
//                                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-violet-400"
//                             />
//                         </div>
//                         <div>
//                             <label className="text-xs text-gray-500 mb-1 block">Duration</label>
//                             <input
//                                 value={form.duration}
//                                 onChange={e => setForm(f => ({...f, duration: e.target.value}))}
//                                 placeholder="e.g. 45 min"
//                                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-violet-400"
//                             />
//                         </div>
//                         <div>
//                             <label className="text-xs text-gray-500 mb-1 block">Description</label>
//                             <input
//                                 value={form.description}
//                                 onChange={e => setForm(f => ({...f, description: e.target.value}))}
//                                 placeholder="Short description"
//                                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-violet-400"
//                             />
//                         </div>
//                         <div>
//                             <label className="text-xs text-gray-500 mb-1 block">Price (€)</label>
//                             <input
//                                 type="number"
//                                 value={form.price}
//                                 onChange={e => setForm(f => ({...f, price: e.target.value}))}
//                                 placeholder="0"
//                                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-violet-400"
//                             />
//                         </div>
//                     </div>
//                     <div className="flex gap-2">
//                         <button onClick={handleAdd} className="text-sm px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors">
//                             Save
//                         </button>
//                         <button onClick={() => setShowForm(false)} className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}
//
//             <div className="flex flex-col gap-2">
//                 {services.map(s => (
//                     <div key={s.id} className="flex items-center justify-between px-4 py-3 border border-gray-100 rounded-xl bg-white">
//                         <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-900">{s.name}</p>
//                             <p className="text-xs text-gray-400">{s.duration}{s.description ? ` · ${s.description}` : ""}</p>
//                         </div>
//                         <div className="flex items-center gap-3 ml-4">
//                             <span className="text-sm font-medium text-violet-600">€{s.price}</span>
//                             <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
//                                 Edit
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(s.id)}
//                                 className="text-xs px-3 py-1.5 border border-red-200 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// function AvailabilityTab() {
//     const [days, setDays] = useState(DAYS);
//     const [saved, setSaved] = useState(false);
//
//     const toggle = (i) => {
//         setDays(d => d.map((day, idx) => idx === i ? {...day, on: !day.on} : day));
//         setSaved(false);
//     };
//
//     const updateTime = (i, field, val) => {
//         setDays(d => d.map((day, idx) => idx === i ? {...day, [field]: val} : day));
//         setSaved(false);
//     };
//
//     const handleSave = () => setSaved(true);
//
//     return (
//         <div>
//             <h2 className="text-base font-medium text-gray-900 mb-1">Availability</h2>
//             <p className="text-xs text-gray-400 mb-5">Set your weekly working hours. Toggle days on or off.</p>
//             <div className="border border-gray-100 rounded-xl overflow-hidden bg-white mb-4">
//                 {days.map((d, i) => (
//                     <div key={d.key} className={`flex items-center gap-4 px-4 py-3 ${i < days.length - 1 ? "border-b border-gray-50" : ""}`}>
//                         <span className="text-sm font-medium text-gray-500 w-24 flex-shrink-0">{d.label}</span>
//                         <Toggle on={d.on} onToggle={() => toggle(i)} />
//                         {d.on ? (
//                             <div className="flex items-center gap-2 flex-1">
//                                 <input
//                                     type="time"
//                                     value={d.open}
//                                     onChange={e => updateTime(i, "open", e.target.value)}
//                                     className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-violet-400 w-24"
//                                 />
//                                 <span className="text-xs text-gray-400">–</span>
//                                 <input
//                                     type="time"
//                                     value={d.close}
//                                     onChange={e => updateTime(i, "close", e.target.value)}
//                                     className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-violet-400 w-24"
//                                 />
//                             </div>
//                         ) : (
//                             <span className="text-xs text-gray-400 ml-1">No working</span>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             <button
//                 onClick={handleSave}
//                 className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
//                     saved
//                         ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
//                         : "bg-violet-600 text-white hover:bg-violet-700"
//                 }`}
//             >
//                 {saved ? "Saved!" : "Save changes"}
//             </button>
//         </div>
//     );
// }
//
// function CalendarTab() {
//     const cols = ["Mon 5", "Tue 6", "Wed 7", "Thu 8", "Fri 9"];
//     const colKeys = ["mon", "tue", "wed", "thu", "fri"];
//     return (
//         <div>
//             <div className="flex items-center gap-3 mb-4">
//                 <h2 className="text-base font-medium text-gray-900">Calendar</h2>
//                 <div className="flex items-center gap-2 ml-auto">
//                     <button className="w-7 h-7 rounded-full border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 flex items-center justify-center transition-colors">‹</button>
//                     <span className="text-sm font-medium text-gray-700">May 5 – 9, 2026</span>
//                     <button className="w-7 h-7 rounded-full border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 flex items-center justify-center transition-colors">›</button>
//                     <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors ml-1">Today</button>
//                 </div>
//             </div>
//             <div className="grid gap-1" style={{gridTemplateColumns: "44px repeat(5, 1fr)"}}>
//                 <div />
//                 {cols.map(c => (
//                     <div key={c} className="text-center text-xs font-medium text-gray-400 pb-2">{c}</div>
//                 ))}
//                 {CALENDAR.map(row => (
//                     <>
//                         <div key={row.time + "t"} className="text-right text-xs text-gray-400 pr-2 pt-1">{row.time}</div>
//                         {colKeys.map(col => {
//                             const cell = row[col];
//                             return (
//                                 <div
//                                     key={col}
//                                     className={`h-10 rounded-lg border transition-colors ${
//                                         cell
//                                             ? cell.type === "purple"
//                                                 ? "bg-violet-50 border-violet-200 cursor-pointer hover:bg-violet-100"
//                                                 : "bg-emerald-50 border-emerald-200 cursor-pointer hover:bg-emerald-100"
//                                             : "bg-gray-50 border-gray-100"
//                                     }`}
//                                 >
//                                     {cell && (
//                                         <div className="h-full flex items-center px-2">
//                       <span className={`text-xs font-medium truncate ${
//                           cell.type === "purple" ? "text-violet-700" : "text-emerald-700"
//                       }`}>
//                         {cell.text}
//                       </span>
//                                         </div>
//                                     )}
//                                 </div>
//                             );
//                         })}
//                     </>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// const NAV_ICONS = {
//     overview: (
//         <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
//             <rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/>
//             <rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/>
//         </svg>
//     ),
//     appointments: (
//         <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
//             <rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M5 1v4M11 1v4M2 7h12"/>
//         </svg>
//     ),
//     services: (
//         <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
//             <path d="M2 4h12M2 8h8M2 12h5"/>
//         </svg>
//     ),
//     availability: (
//         <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
//             <circle cx="8" cy="8" r="6"/><path d="M8 4v4l2 2"/>
//         </svg>
//     ),
//     calendar: (
//         <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
//             <rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M5 1v4M11 1v4M2 7h12"/>
//         </svg>
//     ),
// };
//
// export default function BusinessDashboard() {
//     const [tab, setTab] = useState("overview");
//
//     const navItems = [
//         { tab: "overview",      label: "Overview",      badge: null },
//         { tab: "appointments",  label: "Appointments",  badge: "6"  },
//         { tab: "services",      label: "Services",      badge: null },
//         { tab: "availability",  label: "Availability",  badge: null },
//         { tab: "calendar",      label: "Calendar",      badge: null },
//     ];
//
//     const renderPage = () => {
//         switch (tab) {
//             case "overview":     return <OverviewTab />;
//             case "appointments": return <AppointmentsTab />;
//             case "services":     return <ServicesTab />;
//             case "availability": return <AvailabilityTab />;
//             case "calendar":     return <CalendarTab />;
//             default:             return <OverviewTab />;
//         }
//     };
//
//     return (
//         <div className="flex h-screen bg-gray-50 overflow-hidden">
//
//             {/* Sidebar */}
//             <aside className="w-52 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
//                 <div className="p-4 border-b border-gray-100">
//                     <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center text-sm font-medium text-violet-700 mb-2">
//                         SN
//                     </div>
//                     <p className="text-sm font-medium text-gray-900">Studio Noir</p>
//                     <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
//                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
//                         Hair salon · Skopje
//                     </p>
//                 </div>
//
//                 <nav className="flex-1 p-3 flex flex-col gap-1">
//                     <p className="text-xs font-medium text-gray-300 uppercase tracking-wide px-1 mb-1 mt-1">Main</p>
//                     {navItems.map(item => (
//                         <NavItem
//                             key={item.tab}
//                             tab={item.tab}
//                             label={item.label}
//                             icon={NAV_ICONS[item.tab]}
//                             badge={item.badge}
//                             active={tab === item.tab}
//                             onClick={setTab}
//                         />
//                     ))}
//                 </nav>
//
//                 <div className="p-3 border-t border-gray-100">
//                     <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
//                         <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
//                             <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6"/>
//                         </svg>
//                         Log out
//                     </button>
//                 </div>
//             </aside>
//
//             {/* Main content */}
//             <main className="flex-1 overflow-y-auto">
//                 <div className="max-w-3xl mx-auto px-6 py-6">
//                     {renderPage()}
//                 </div>
//             </main>
//         </div>
//     );
// }

import {useState} from "react";
import Overview from "../components/BusinessDashboard/Overview.jsx";
import Appointments from "../components/BusinessDashboard/Appointments.jsx";
import Services from "../components/BusinessDashboard/Services.jsx";
import Availability from "../components/BusinessDashboard/Availability.jsx";
import Calendar from "../components/BusinessDashboard/Calendar.jsx";
import useBusinessDetails from "../hooks/useBusinessMyDetails.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import Header from "../components/HomePage/Header.jsx";

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
                            (Hair salon kategorija) · {business.city}
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
                        <button
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                                 className="w-4 h-4">
                                <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6"/>
                            </svg>
                            Log out
                        </button>
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