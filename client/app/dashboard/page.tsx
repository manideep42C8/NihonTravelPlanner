"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Trip {
  _id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
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

      // Remove deleted trip from state
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

  if (loading) return <div className="p-8">Loading trips...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {trips.length === 0 ? (
        <p>No trips found. Create one in Trip Planner!</p>
      ) : (
        <div className="grid gap-6">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="p-6 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{trip.title}</h2>
                <p>
                  <strong>Destination:</strong> {trip.destination}
                </p>
                <p>
                  <strong>Dates:</strong>{" "}
                  {new Date(trip.startDate).toLocaleDateString()} -{" "}
                  {new Date(trip.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/itinerary/${trip._id}`)}
                  className="px-4 py-2 rounded font-semibold text-white"
                  style={{ backgroundColor: "oklch(0.577 0.245 27.325)" }}
                >
                  View
                </button>
                <button
                  onClick={() => router.push(`/itinerary/${trip._id}/edit`)}
                  className="px-4 py-2 rounded font-semibold text-white"
                  style={{ backgroundColor: "oklch(0.577 0.245 27.325)" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(trip._id)}
                  className="px-4 py-2 rounded font-semibold text-white"
                  style={{ backgroundColor: "#e53e3e" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
