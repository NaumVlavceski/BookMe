import useBusinessMyDetails from "../hooks/useBusinessMyDetails.jsx";
import {useEffect, useState} from "react";
import {useCategories} from "../hooks/useCategories.js";
import businessService from "../services/BusinessService.js";
import Availability from "../components/BusinessDashboard/Availability.jsx";


const CATEGORY_LABELS = {
    HAIR_SALON: "Hair Salon",
    BARBERSHOP: "Barbershop",
    BEAUTY_STUDIO: "Beauty Studio",
    FITNESS: "Fitness",
    NAIL_STUDIO: "Nail Studio",
    MASSAGE: "Massage",
    OTHER: "Other",
};

const inputBase =
    "w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-150 focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100 placeholder:text-gray-400";

const Field = ({label, required, hint, error, children}) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-500 tracking-wide">
            {label}
            {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        {children}
        {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
);

const Section = ({icon, title, children}) => (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
            <span className="text-base">{icon}</span>
            <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="px-5 py-5 flex flex-col gap-4">{children}</div>
    </div>
);

export default function BusinessEdit() {
    const {business, loading} = useBusinessMyDetails();
    const categories = useCategories();

    const [form, setForm] = useState({
        name: "", city: "", description: "",
        businessCategory: "", location: "", phone: "",
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [apiErr, setApiErr] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (!business) return;
        setForm({
            name: business.name ?? "",
            city: business.city ?? "",
            description: business.description ?? "",
            businessCategory: business.businessCategory ?? "",
            location: business.location ?? "",
            phone: business.phone ?? "",
        });
    }, [business?.id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
        setDirty(true);
        setSaved(false);
        if (errors[name]) setErrors(prev => ({...prev, [name]: ""}));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Business name is required.";
        if (!form.city.trim()) e.city = "City is required.";
        if (!form.businessCategory) e.businessCategory = "Please select a category.";
        if (form.description.length > 300) e.description = "Max 300 characters.";
        if (!form.phone.trim()) e.phone = "Phone is required.";
        if (!form.location.trim()) e.location = "Location is required.";
        return e;
    };

    const handleSubmit = async () => {
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setSaving(true);
        setApiErr("");
        try {
            await businessService.editBusinesses(form);
            setSaved(true);
            setDirty(false);
            // setTimeout(() => setSaved(false), 2500);
            window.location.href="/business/dashboard";
        } catch (err) {
            setApiErr(err.response?.data?.error ?? "Failed to save. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await businessService.deleteBusiness(business.id);
            window.location.href = "/";
        } catch (err) {
            setApiErr(err.response?.data?.error ?? "Failed to delete business.");
            setDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"/>
                    <p className="text-sm text-gray-400">Loading your business...</p>
                </div>
            </div>
        );
    }
    const firstTime = business?.name == null

    const initials = (business?.name ?? "B").slice(0, 2).toUpperCase();
    const descLen = form.description.length;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-xl mx-auto">

                {/* page header */}
                <div className="flex items-center gap-4 mb-7">
                    <div
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-lg font-bold shadow-md flex-shrink-0">
                        {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-xl font-bold text-gray-900 truncate">
                            {business?.name ?? "Your business"}
                        </h1>
                        <p className="text-sm text-gray-400 mt-0.5">
                            Edit your profile, hours and contact info
                        </p>
                    </div>
                    {saved && (
                        <div
                            className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full flex-shrink-0">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor"
                                 strokeWidth="2.5">
                                <path d="M3 8l4 4 6-6"/>
                            </svg>
                            Saved
                        </div>
                    )}
                </div>

                {/* api error */}
                {apiErr && (
                    <div className="mb-5 flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                        <span className="text-red-500 flex-shrink-0 mt-0.5">⚠</span>
                        <p className="text-sm text-red-700">{apiErr}</p>
                    </div>
                )}

                <div className="flex flex-col gap-4">

                    {/* basic info */}
                    <Section icon="🏪" title="Basic information">
                        <Field label="Business name" required error={errors.name}>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g. Studio Noir"
                                className={`${inputBase} ${errors.name ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100" : ""}`}
                            />
                        </Field>

                        <Field label="Category" required error={errors.businessCategory}>
                            <select
                                name="businessCategory"
                                value={form.businessCategory}
                                onChange={handleChange}
                                className={`${inputBase} cursor-pointer ${errors.businessCategory ? "border-red-300 bg-red-50" : ""}`}
                            >
                                <option value="" disabled>Select a category...</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {CATEGORY_LABELS[cat] ?? cat}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        <Field
                            label="Description"
                            hint="Shown to customers on your public profile."
                            error={errors.description}
                        >
              <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell customers about your business, specialty and style..."
                  className={`${inputBase} resize-none leading-relaxed ${errors.description ? "border-red-300 bg-red-50" : ""}`}
              />
                            <span
                                className={`text-xs self-end ${descLen > 980 ? descLen > 1000 ? "text-red-500 font-medium" : "text-amber-500" : "text-gray-400"}`}>
                {descLen} / 1000
              </span>
                        </Field>
                    </Section>

                    {/* location & contact */}
                    <Section icon="📍" title="Location & contact">
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="City" required error={errors.city}>
                                <input
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    placeholder="e.g. Skopje"
                                    className={`${inputBase} ${errors.city ? "border-red-300 bg-red-50" : ""}`}
                                />
                            </Field>
                            <Field label="Phone number" required error={errors.phone}>
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+389 70 123 456"
                                    inputMode="tel"
                                    className={`${inputBase} ${errors.phone ? "border-red-300 bg-red-50" : ""}`}
                                />
                            </Field>
                        </div>
                        <Field label="Location" hint="Full location shown on your public profile." required
                               error={errors.location}>
                            <input
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="e.g. Centar bb, Skopje"
                                className={`${inputBase} ${errors.phone ? "border-red-300 bg-red-50" : ""}`}
                            />
                        </Field>
                    </Section>

                    {/* working hours */}
                    <Section icon="🕐" title="Working hours">
                        <p className="text-xs text-gray-400 -mt-1">
                            Toggle days on or off. Time changes save automatically.
                        </p>
                        <Availability business={business?.id}/>
                    </Section>

                    {/* action buttons */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            disabled={firstTime}
                            onClick={() => window.history.back()}
                            className={`disabled:cursor-not-allowed px-6 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-100 active:scale-95 transition-all `}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={saving || !dirty}
                            className="flex-1 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shadow-violet-200"
                        >
                            {saving ? (
                                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                  Saving...
                </span>
                            ) : "Save changes"}
                        </button>
                    </div>

                    {/* danger zone */}
                    <div className="bg-white rounded-2xl border border-red-100 overflow-hidden">
                        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-red-50">
                            <span className="text-base">⚠️</span>
                            <h3 className="text-sm font-semibold text-red-600">Danger zone</h3>
                        </div>
                        <div className="px-5 py-5">
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                Permanently delete your business profile, all services and all appointments.{" "}
                                <strong className="text-gray-700">This action cannot be undone.</strong>
                            </p>
                            {!showDeleteConfirm ? (
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="w-full py-2.5 rounded-xl border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 active:scale-[.98] transition-all"
                                >
                                    Delete business profile
                                </button>
                            ) : (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                    <p className="text-sm font-semibold text-red-800 mb-1">
                                        Are you absolutely sure?
                                    </p>
                                    <p className="text-xs text-red-600 mb-4">
                                        This will permanently delete{" "}
                                        <strong>{business?.name}</strong> and all its data.
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className="flex-1 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            disabled={deleting}
                                            className="flex-1 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-60 active:scale-[.98] transition-all"
                                        >
                                            {deleting ? "Deleting..." : "Yes, delete it"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}