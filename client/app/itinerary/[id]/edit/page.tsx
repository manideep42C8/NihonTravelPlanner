"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, FileText, CheckCircle } from "lucide-react";

const BRAND = "oklch(0.577 0.245 27.325)"; // Primary brand color

export default function EditItineraryPage({ tripData }: { tripData?: any }) {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState(tripData?.title || "");
  const [startDate, setStartDate] = useState(tripData?.startDate || "");
  const [endDate, setEndDate] = useState(tripData?.endDate || "");
  const [preferences, setPreferences] = useState<string[]>(tripData?.preferences || []);
  const [notes, setNotes] = useState(tripData?.notes || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const steps = [
    { number: 1, label: "Trip Details", icon: <MapPin size={18} /> },
    { number: 2, label: "Dates", icon: <Calendar size={18} /> },
    { number: 3, label: "Preferences", icon: <FileText size={18} /> },
    { number: 4, label: "Review", icon: <CheckCircle size={18} /> },
  ];

  const handleNext = async () => {
    if (step === 1 && !title) return setError("Please enter a trip title.");
    if (step === 2 && (!startDate || !endDate))
      return setError("Please select both start and end dates.");

    if (step === 4) {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const payload = { title, startDate, endDate, preferences, notes };
        const res = tripData
          ? await axios.put(`http://localhost:5000/api/trips/${tripData._id}`, payload, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : await axios.post(
              "http://localhost:5000/api/trips/suggestions",
              payload,
              { headers: { Authorization: `Bearer ${token}` } }
            );
        router.push(`/itinerary/${res.data._id}`);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to save trip");
      } finally {
        setLoading(false);
      }
      return;
    }

    setError("");
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const togglePreference = (pref: string) => {
    setPreferences((prev) =>
      prev.includes(pref)
        ? prev.filter((p) => p !== pref)
        : [...prev, pref]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-10">
          {steps.map((s) => (
            <div
              key={s.number}
              className={`flex flex-col items-center text-sm ${
                step >= s.number ? "" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold shadow transition`}
                style={{
                  backgroundColor: step >= s.number ? BRAND : "#e5e7eb",
                  color: step >= s.number ? "#fff" : "#9ca3af",
                }}
              >
                {s.icon}
              </div>
              <span className="mt-2 font-medium text-gray-700">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* STEP 1 - Trip Title */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  ✈️ Trip Name
                </h2>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Autumn in Japan 2025"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[oklch(0.577_0.245_27.325)] focus:outline-none"
                />
              </div>
            )}

            {/* STEP 2 - Dates */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  📅 Travel Dates
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[oklch(0.577_0.245_27.325)]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[oklch(0.577_0.245_27.325)]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 - Preferences & Notes */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  🎯 Interests
                </h2>
                <div className="flex flex-wrap gap-3 mb-6">
                  {["Food", "Temple", "Adventure", "Shopping", "Nature", "Culture"].map(
                    (pref) => (
                      <button
                        key={pref}
                        onClick={() => togglePreference(pref)}
                        className="px-5 py-2.5 rounded-full border text-sm font-medium transition-all"
                        style={{
                          backgroundColor: preferences.includes(pref) ? BRAND : "#f3f4f6",
                          color: preferences.includes(pref) ? "#fff" : "#374151",
                          borderColor: preferences.includes(pref) ? BRAND : "#d1d5db",
                        }}
                      >
                        {preferences.includes(pref) ? "✅ " : "➕ "} {pref}
                      </button>
                    )
                  )}
                </div>

                <label className="block font-medium mb-2">📝 Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Any special reminders or ideas..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[oklch(0.577_0.245_27.325)]"
                />
              </div>
            )}

            {/* STEP 4 - Review */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  ✅ Review Trip
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-3">
                  <p><strong>Title:</strong> {title}</p>
                  <p>
                    <strong>Dates:</strong> {startDate} → {endDate}
                  </p>
                  <p>
                    <strong>Preferences:</strong>{" "}
                    {preferences.length > 0 ? preferences.join(", ") : "None"}
                  </p>
                  {notes && <p><strong>Notes:</strong> {notes}</p>}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Error */}
        {error && (
          <p className="text-red-600 font-medium mt-4 text-center">{error}</p>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-2.5 rounded-xl font-semibold shadow-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl font-semibold text-white shadow-md transition"
            style={{ backgroundColor: step === 4 ? BRAND : BRAND }}
          >
            {step === 4 ? (loading ? "Saving..." : "Save Trip") : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
