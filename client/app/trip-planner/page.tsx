"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function TripPlanner() {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [preferencesInput, setPreferencesInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // ✅ Read token from localStorage and remove extra quotes if any
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    console.log("Token sent to backend:", token);
    if (!token) {
      setErrorMessage("You must be logged in to create a trip.");
      return;
    }

    // ✅ Validate required fields
    if (!title || !destination || !startDate || !endDate) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/trips",
        {
          title, // must match backend validator
          destination, // must match backend validator
          startDate,
          endDate,
          preferences: preferencesInput
            .split(",")
            .map((pref) => pref.trim())
            .filter((pref) => pref !== ""),
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ send raw token
        }
      );

      console.log("Trip created:", response.data);

      // Redirect to itinerary page for this trip
      router.push(`/itinerary/${response.data._id}`);
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Failed to create trip."
        );
      } else {
        setErrorMessage("Network error or backend not running.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">Trip Planner</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        {errorMessage && (
          <div className="text-red-600 mb-4 font-medium">{errorMessage}</div>
        )}

        {/* Trip Title */}
        <div>
          <label className="block mb-1 font-medium">Trip Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter trip name"
            required
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block mb-1 font-medium">Destination(s)</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Tokyo, Kyoto, Osaka"
            required
          />
        </div>

        {/* Start & End Date */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
        </div>

        {/* Preferences */}
        <div>
          <label className="block mb-1 font-medium">Preferences</label>
          <input
            type="text"
            value={preferencesInput}
            onChange={(e) => setPreferencesInput(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Culture, Food, Nature"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded text-white font-semibold disabled:opacity-50"
          style={{ backgroundColor: "oklch(0.577 0.245 27.325)" }}
        >
          {loading ? "Creating..." : "Create Trip"}
        </button>
      </form>
    </div>
  );
}
