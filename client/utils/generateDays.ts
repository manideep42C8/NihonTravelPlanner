/**
 * Generate day-wise itinerary from suggested attractions
 * @param startDate Trip start date
 * @param endDate Trip end date
 * @param suggestedAttractions List of attractions returned by backend
 */
export function generateDays(
  startDate: string,
  endDate: string,
  suggestedAttractions: {
    _id: string;
    name: string;
    image?: string;
  }[]
) {
  const s = new Date(startDate);
  const e = new Date(endDate);
  const daysCount = Math.max(1, Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  const days = [];
  for (let i = 0; i < daysCount; i++) {
    days.push({
      day: i + 1,
      activities: suggestedAttractions.length
        ? [suggestedAttractions[i % suggestedAttractions.length].name]
        : [], // fallback empty if no attractions
      attractions: suggestedAttractions.length
        ? [suggestedAttractions[i % suggestedAttractions.length]._id]
        : [],
      image: suggestedAttractions.length
        ? suggestedAttractions[i % suggestedAttractions.length].image || ""
        : "",
    });
  }

  return days;
}
