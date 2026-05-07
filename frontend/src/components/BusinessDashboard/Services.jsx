import useServices from "../../hooks/useServices.jsx";
import {useState} from "react";

const Services = ({business}) => {
    const {services, loading, createService, updateService, deleteService} = useServices(business);
    const [editId, setEditId] = useState(null);
    const [error,setError] = useState("");
    const [form, setForm] = useState({
        name: "",
        description: "",
        duration: null,
        price: null
    })
    const [showForm, setShowForm] = useState(false);
    const handleAdd = () => {
        if (!form.name || !form.price || !form.duration) {
            setError("Please fill required fields.");
            return;
        }
        if (editId) {
            updateService(form, editId)
        } else {
            createService(form)
        }
        setForm({
            name: "",
            description: "",
            duration: null,
            price: null
        })
        setShowForm(false);
    }
    const handleDelete = (serviceId) => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            deleteService(serviceId)
        }
    }
    const handleEdit = (serviceId) => {
        const service = services.find((service) => service.id === serviceId);
        console.log(service)
        setForm({
            name: service.name,
            description: service.description,
            duration: service.duration,
            price: service.price,
        })
        setEditId(serviceId);
        setShowForm(true);
    }
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-medium text-gray-900">Services</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="text-sm px-4 py-2 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                >
                    {showForm ? "-" : "+"} Add service
                </button>
            </div>
            {error && (
                <div>{error}</div>
            )}
            {showForm && (
                <form className="mb-4 p-4 border border-violet-100 bg-violet-50 rounded-xl">
                    <p className="text-sm font-medium text-violet-900 mb-3">New service</p>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Name <span className="text-red-500">*</span></label>
                            <input
                                required
                                value={form.name}
                                onChange={e => setForm(f => ({...f, name: e.target.value}))}
                                placeholder="e.g. Haircut"
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-violet-400"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Duration in minutes <span className="text-red-500">*</span></label>
                            <input
                                required={true}
                                type="number"
                                value={form.duration}
                                onChange={e => setForm(f => ({...f, duration: e.target.value}))}
                                placeholder="e.g. 45"
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-violet-400"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Description</label>
                            <input
                                value={form.description}
                                onChange={e => setForm(f => ({...f, description: e.target.value}))}
                                placeholder="Short description"
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-violet-400"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Price (den) <span className="text-red-500">*</span></label>
                            <input
                                required
                                type="number"
                                value={form.price}
                                onChange={e => setForm(f => ({...f, price: e.target.value}))}
                                placeholder="0"
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-violet-400"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleAdd}
                                className="text-sm px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors">
                            Save
                        </button>
                        <button onClick={() => setShowForm(false)}
                                className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="flex flex-col gap-2">
                {services.map(s => (
                    <div key={s.id}
                         className="flex items-center justify-between px-4 py-3 border border-gray-100 rounded-xl bg-white">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{s.name}</p>
                            <p className="text-xs text-gray-400">{s.duration} min {s.description ? ` · ${s.description}` : ""}</p>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                            <span className="text-sm font-medium text-violet-600">{s.price} den</span>
                            <button
                                onClick={() => handleEdit(s.id)}
                                className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(s.id)}
                                className="text-xs px-3 py-1.5 border border-red-200 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
export default Services;