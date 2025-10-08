"use client";

import { useState, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plane } from "lucide-react";

const BRAND = "oklch(0.577 0.245 27.325)";

type Step = 1 | 2 | 3 | 4;

export default function TripPlannerPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [prefInput, setPrefInput] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addPref = () => {
    const val = prefInput.trim();
    if (!val) return;
    if (!preferences.includes(val)) setPreferences((p) => [...p, val]);
    setPrefInput("");
  };
  const removePref = (val: string) =>
    setPreferences((p) => p.filter((x) => x !== val));

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const a = new Date(startDate);
    const b = new Date(endDate);
    const diff = Math.ceil((+b - +a) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(diff, 0);
  }, [startDate, endDate]);

  const validateStep = (s: Step) => {
    const e: Record<string, string> = {};
    if (s === 1 && !title.trim()) e.title = "Trip title is required.";
    if (s === 2) {
      if (!startDate) e.startDate = "Start date is required.";
      if (!endDate) e.endDate = "End date is required.";
      if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        e.endDate = "End date cannot be before start date.";
      }
    }
    if (s === 3 && preferences.length === 0 && notes.trim().length < 6) {
      e.preferences = "Add at least one preference or a short note.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, 4) as Step);
  };
  const back = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      setStep(3);
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in.");

      const payload = { title, startDate, endDate, days, preferences, notes };
      const res = await axios.post(
        "http://localhost:5000/api/trips/suggestions",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      router.push(`/itinerary/${res.data._id}`);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Failed to create trip.";
      setErrors({ submit: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <Plane className="h-6 w-6 text-gray-700" />
          <h1 className="text-xl font-semibold text-gray-800">Trip Planner</h1>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <Stepper step={step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-bold mb-6">
              {step === 1 && "Trip Basics"}
              {step === 2 && "Select Dates"}
              {step === 3 && "Your Preferences"}
              {step === 4 && "Review & Create"}
            </h2>

            <div className="space-y-8">
              {step === 1 && (
                <Field label="Trip Title" error={errors.title}>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[oklch(0.577_0.245_27.325)] transition"
                    placeholder="e.g., Tokyo Adventure"
                  />
                </Field>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Start Date" error={errors.startDate}>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[oklch(0.577_0.245_27.325)] transition"
                    />
                  </Field>

                  <Field
                    label="End Date"
                    error={errors.endDate}
                    hint={days > 0 ? `${days} day(s)` : undefined}
                  >
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[oklch(0.577_0.245_27.325)] transition"
                    />
                  </Field>
                </div>
              )}

              {step === 3 && (
                <>
                  <Field label="Preferences" error={errors.preferences}>
                    <TagInput
                      value={prefInput}
                      onChange={setPrefInput}
                      addTag={addPref}
                      tags={preferences}
                      removeTag={removePref}
                    />
                  </Field>

                  <Field label="Notes">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[oklch(0.577_0.245_27.325)] transition"
                      placeholder="Describe what kind of trip experience you want..."
                    />
                  </Field>
                </>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <SummaryRow label="Title" value={title || "—"} />
                  <SummaryRow
                    label="Dates"
                    value={
                      startDate && endDate
                        ? `${startDate} → ${endDate} (${days} days)`
                        : "—"
                    }
                  />
                  <SummaryRow
                    label="Preferences"
                    value={preferences.join(", ") || "—"}
                  />
                  <SummaryRow label="Notes" value={notes || "—"} />

                  {errors.submit && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      {errors.submit}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t pt-6">
              <button
                onClick={back}
                disabled={step === 1 || submitting}
                className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition"
              >
                ← Back
              </button>

              {step < 4 ? (
                <button
                  onClick={next}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl font-semibold text-white shadow-md transition hover:shadow-lg"
                  style={{ backgroundColor: BRAND }}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl font-semibold text-white shadow-md transition hover:shadow-lg"
                  style={{ backgroundColor: BRAND }}
                >
                  {submitting ? "Creating..." : "Create Trip"}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ---------- Reusable Components ---------- */
function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-800 mb-2">{label}</label>
      {children}
      {error ? (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-xs text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps = ["Basics", "Dates", "Preferences", "Review"];
  return (
    <div className="flex items-center justify-between mb-10">
      {steps.map((label, idx) => {
        const isCompleted = idx < step; // current + previous steps
        const isActive = idx === step - 1;

        return (
          <div key={label} className="flex flex-col items-center text-sm relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 font-semibold transition-all
                ${isCompleted ? "bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]" : ""}
                ${!isCompleted ? "bg-gray-200 text-gray-500" : ""}
              `}
            >
              {idx + 1}
            </div>
            <span className={`${isCompleted ? "text-red-500 font-semibold" : "text-gray-700"}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}



function TagInput({ value, onChange, addTag, tags, removeTag }: any) {
  const handleKey = (e: any) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };
  return (
    <div className="flex flex-wrap gap-2 border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-[oklch(0.577_0.245_27.325)] transition">
      {tags.map((t: string) => (
        <span
          key={t}
          className="bg-[oklch(0.577 0.245 27.325)/0.15] text-[oklch(0.577 0.245 27.325)] px-3 py-1 rounded-full flex items-center gap-1 text-sm shadow-sm"
        >
          {t}
          <button
            type="button"
            onClick={() => removeTag(t)}
            className="text-xs hover:text-red-500 transition"
          >
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        className="flex-1 outline-none px-2 py-1 text-sm bg-transparent"
        placeholder="Type & press Enter"
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm text-gray-700 border-b border-gray-100 pb-2">
      <span className="font-medium">{label}</span>
      <span>{value}</span>
    </div>
  );
}
