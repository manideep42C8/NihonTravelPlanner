"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface Trip {
  _id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  preferences?: string[];
}

export default function ItineraryPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const response = await axios.get(`http://localhost:5000/api/trips/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTrip(response.data);
      } catch (err: any) {
        console.error(err);
        setError(
          err.response?.data?.error || err.message || "Failed to load trip"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!trip) return <div className="p-8">Trip not found.</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">{trip.title}</h1>
      <p>
        <strong>Destination(s):</strong> {trip.destination}
      </p>
      <p>
        <strong>Start Date:</strong> {new Date(trip.startDate).toLocaleDateString()}
      </p>
      <p>
        <strong>End Date:</strong> {new Date(trip.endDate).toLocaleDateString()}
      </p>
      {trip.preferences && trip.preferences.length > 0 && (
        <p>
          <strong>Preferences:</strong> {trip.preferences.join(", ")}
        </p>
      )}

      <button
        onClick={() => router.push(`/itinerary/${id}/edit`)}
        className="mt-6 px-4 py-2 rounded font-semibold text-white"
        style={{ backgroundColor: "oklch(0.577 0.245 27.325)" }}
      >
        Edit Trip
      </button>
    </div>
  );
}
