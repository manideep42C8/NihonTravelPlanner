"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

const BRAND = "oklch(0.577 0.245 27.325)";

// Utility functions
function formatDateRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  return `${s.toLocaleDateString()} — ${e.toLocaleDateString()}`;
}
function diffDaysInclusive(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  return Math.max(1, Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1);
}

// Types
interface TripActivity {
  name: string;
  time?: string;
  duration?: number;
}
interface TripDay {
  day: number;
  activities: TripActivity[];
  image?: string;
}
interface Trip {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  notes?: string;
  days?: TripDay[];
}

// Loading Skeleton
function Skeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-400 animate-pulse">
      Loading trip itinerary...
    </div>
  );
}

// Single Day Card
function TripDayItem({ day }: { day: TripDay }) {
  return (
    <motion.li
      key={day.day}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: day.day * 0.1 }}
      className="relative ml-6 mb-10"
    >
      {/* Circle Marker */}
      <span
        className="absolute flex items-center justify-center w-9 h-9 rounded-full ring-8 ring-white shadow-md"
        style={{ backgroundColor: BRAND, left: "-20px", top: "0.25rem" }}
      >
        <span className="text-white font-bold text-sm">{day.day}</span>
      </span>

      {/* Card */}
      <div className="p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200">
        <h3 className="text-2xl font-bold mb-3 text-gray-800 flex items-center gap-2">
          🗓️ Day {day.day}
        </h3>
        <hr className="mb-4 border-gray-200" />

        {/* Activities */}
        {day.activities && day.activities.length > 0 ? (
          <ul className="space-y-4">
            {day.activities.map((act, i) => (
              <motion.li
                key={`${day.day}-${i}`}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex flex-col gap-1 bg-gray-50/60 p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <p className="text-gray-900 font-semibold flex items-center gap-2">
                  📍 {act.name}
                </p>
                {act.time && <p className="text-gray-600 text-sm">🕒 {act.time}</p>}
                {act.duration && <p className="text-gray-600 text-sm">⏱ {act.duration} mins</p>}
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">
            No activities planned for this day.
          </p>
        )}

        {day.image && (
          <div className="mt-5 overflow-hidden rounded-lg">
            <img
              src={day.image}
              alt={`Day ${day.day}`}
              className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </motion.li>
  );
}

// MAIN PAGE
export default function ItineraryPage() {
  const params = useParams();
  const id = Array.isArray((params as any)?.id)
    ? (params as any).id[0]
    : (params as any)?.id;
  const router = useRouter();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const res = await axios.get(`http://localhost:5000/api/trips/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!cancelled) {
          const sortedDays = (res.data.days || []).sort(
            (a: TripDay, b: TripDay) => a.day - b.day
          );
          setTrip({ ...res.data, days: sortedDays });
        }
      } catch (err: any) {
        if (!cancelled)
          setError(err?.response?.data?.error || err?.message || "Failed to load trip");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const daysCount = useMemo(
    () => (trip ? diffDaysInclusive(trip.startDate, trip.endDate) : 0),
    [trip]
  );

  if (loading) return <Skeleton />;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  if (!trip)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Trip not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER / HERO */}
<section className="relative w-full bg-gray-50 overflow-hidden">
  {/* Background Glow */}
  <div
    className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
    style={{ backgroundColor: BRAND }}
  ></div>
  <div
    className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full blur-3xl opacity-25"
    style={{ backgroundColor: BRAND }}
  ></div>

  {/* Main Header Content */}
  <div className="relative w-full max-w-[1200px] mx-auto px-10 py-24 flex flex-col md:flex-row items-center justify-between gap-8">
    
    {/* Title + Dates */}
    <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight"
        style={{
          color: BRAND,
          textShadow: `0 0 30px ${BRAND}55`,
        }}
      >
        {trip.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-700 text-xl md:text-2xl font-medium"
      >
        {formatDateRange(trip.startDate, trip.endDate)}
      </motion.p>

      {trip.notes && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-gray-600 italic text-lg max-w-xl"
        >
          {trip.notes}
        </motion.p>
      )}

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        onClick={() => router.push(`/itinerary/${id}/edit`)}
        className="mt-6 px-10 py-4 rounded-full font-bold text-white text-xl shadow-xl hover:scale-105 transition-transform duration-300"
        style={{
          backgroundColor: BRAND,
          boxShadow: `0 10px 35px ${BRAND}88`,
        }}
      >
        ✏️ Edit Trip
      </motion.button>
    </div>

    {/* Optional Hero Image */}
    {trip.days && trip.days[0]?.image && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="flex-1 rounded-3xl overflow-hidden shadow-2xl"
      >
        <img
          src={trip.days[0].image}
          alt="Trip Hero"
          className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
        />
      </motion.div>
    )}
  </div>
</section>







      {/* Daily itinerary */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {trip.days && trip.days.length > 0 ? (
          <ol className="relative border-l border-gray-200 space-y-10">
            {trip.days.map((day, index) => (
              <TripDayItem key={`${trip._id}-${day.day}-${index}`} day={day} />
            ))}
          </ol>
        ) : (
          <div className="text-center py-20 text-gray-500 border rounded-xl bg-white/70 backdrop-blur-xl">
            <p>No detailed day-by-day itinerary available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
