"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditTripPage() {
  const { id } = useParams();
  const router = useRouter();

  const [trip, setTrip] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch existing trip when page loads
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/trips/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch trip");
        const data = await res.json();
        setTrip({
          title: data.title,
          destination: data.destination,
          startDate: data.startDate.split("T")[0], // format for date input
          endDate: data.endDate.split("T")[0],
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (id) fetchTrip();
  }, [id]);

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/trips/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(trip),
      });

      if (!res.ok) throw new Error("Failed to update trip");
      const updatedTrip = await res.json();

      // Redirect back to itinerary page
      router.push(`/itinerary/${updatedTrip._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Edit Trip</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <Input
            type="text"
            value={trip.title}
            onChange={(e) => setTrip({ ...trip, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Destination</label>
          <Input
            type="text"
            value={trip.destination}
            onChange={(e) =>
              setTrip({ ...trip, destination: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <Input
            type="date"
            value={trip.startDate}
            onChange={(e) => setTrip({ ...trip, startDate: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <Input
            type="date"
            value={trip.endDate}
            onChange={(e) => setTrip({ ...trip, endDate: e.target.value })}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          style={{ backgroundColor: "oklch(0.577 0.245 27.325)", color: "white" }}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}
