"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BRAND = "oklch(0.577 0.245 27.325)";

interface Trip {
  _id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  image?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async (tripId: string) => {
    if (!confirm("Are you sure you want to delete this trip?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not logged in");

      const res = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete trip");

      setTrips(trips.filter((trip) => trip._id !== tripId));
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error deleting trip");
    }
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not logged in");

        const res = await fetch("http://localhost:5000/api/trips", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch trips");
        const data = await res.json();
        setTrips(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading)
    return <div className="p-8 text-center text-gray-500">Loading trips...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <h1
        className="text-5xl md:text-6xl font-extrabold mb-12 text-center"
        style={{ color: BRAND, textShadow: `0 0 20px ${BRAND}33` }}
      >
        My Trips
      </h1>

      {trips.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No trips found. Create one in Trip Planner!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-shadow duration-300 flex flex-col"
            >
              {/* Trip Image */}
              {trip.image && (
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              )}
              {/* Trip Info */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{trip.title}</h2>
                <p className="text-gray-700 mb-1">
                  <strong>Destination:</strong> {trip.destination}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Dates:</strong>{" "}
                  {new Date(trip.startDate).toLocaleDateString()} -{" "}
                  {new Date(trip.endDate).toLocaleDateString()}
                </p>
                {/* Buttons */}
                <div className="mt-auto flex gap-3">
                  <button
                    onClick={() => router.push(`/itinerary/${trip._id}`)}
                    className="flex-1 px-4 py-2 rounded-full font-semibold text-white hover:brightness-105 transition"
                    style={{ backgroundColor: BRAND }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => router.push(`/itinerary/${trip._id}/edit`)}
                    className="flex-1 px-4 py-2 rounded-full font-semibold text-white hover:brightness-105 transition"
                    style={{ backgroundColor: BRAND }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="flex-1 px-4 py-2 rounded-full font-semibold text-white hover:brightness-110 transition"
                    style={{ backgroundColor: "#e53e3e" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
