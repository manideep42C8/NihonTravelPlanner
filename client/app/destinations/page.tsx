"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, MapPin } from "lucide-react"

export default function DestinationsPage() {
  const [activeFilter, setActiveFilter] = useState("destinations")

  const destinations = [
    {
      id: "des-001",
      name: "Mount Fuji",
      location: "Yamanashi Prefecture",
      region: "Kanto",
      description:
        "Japan's iconic mountain and the country's tallest peak, a popular hiking destination with breathtaking views and cultural significance.",
      image: "/mount-fuji-yamanashi.png",
      highlights: ["Kawaguchi-Ko", "Yoshida-Ko", "Fuji Five Lakes", "Hiking Trails"],
      bestTime: "Autumn",
      duration: "1-2 days",
      nearbyAttractions: ["Hakone", "Lake Kawaguchi", "Chureito Pagoda"],
      website: "https://www.japan.travel",
    },
    {
      id: "des-002",
      name: "Tokyo Tower",
      location: "Shinjuku, Tokyo",
      region: "Kanto",
      description:
        "One of Tokyo's most iconic landmarks, a communications tower with fascinating history and breathtaking city views from its observation decks.",
      image: "/tokyo-tower-shinjuku.png",
      highlights: ["Observatory Decks", "City Views", "Night Illumination", "Tokyo Skyline"],
      bestTime: "Spring",
      duration: "Half day",
      nearbyAttractions: ["Shinjuku Gyoen", "Tokyo Skytree", "Imperial Palace"],
      website: "https://www.japan.travel",
    },
    {
      id: "des-003",
      name: "Miyajima Island",
      location: "Hiroshima Prefecture",
      region: "Chugoku",
      description:
        "A scenic island famous for its beautiful beaches and historic landmarks, featuring the iconic floating torii gate and UNESCO World Heritage sites.",
      image: "/miyajima-island-hiroshima.png",
      highlights: ["Itsukushima Shrine", "Floating Torii Gate", "Miyajima Beach", "Wild Deer"],
      bestTime: "Summer",
      duration: "Full day",
      nearbyAttractions: ["Hiroshima Peace Memorial", "Hiroshima Castle", "Peace Park"],
      website: "https://www.japan.travel",
    },
    {
      id: "des-004",
      name: "Kabuki Theatre",
      location: "Ginza, Tokyo",
      region: "Kanto",
      description:
        "One of Japan's most renowned traditional theaters, known for its intricate performances, elaborate costumes, and centuries of cultural heritage.",
      image: "/kabuki-theatre-ginza.png",
      highlights: ["Traditional Performances", "Elaborate Costumes", "Cultural Heritage", "Historic Architecture"],
      bestTime: "Winter",
      duration: "Evening",
      nearbyAttractions: ["Chidorigafuchi", "Tokyo National Museum", "Imperial Palace East Gardens"],
      website: "https://www.japan.travel",
    },
    {
      id: "des-005",
      name: "Kyoto Imperial Palace",
      location: "Kyoto",
      region: "Kansai",
      description:
        "The former residence of Japan's imperial family, a UNESCO World Heritage Site featuring stunning gardens, historic architecture, and cultural significance.",
      image: "/kyoto-imperial-palace.png",
      highlights: ["Imperial Gardens", "Historic Architecture", "UNESCO Heritage", "Traditional Design"],
      bestTime: "Autumn",
      duration: "Half day",
      nearbyAttractions: ["Kinkaku-ji Temple", "Fushimi Inari Shrine", "Gion District"],
      website: "https://www.japan.travel",
    },
    {
      id: "des-006",
      name: "Osaka Castle",
      location: "Osaka Castle Park",
      region: "Kansai",
      description:
        "A famous castle and one of Japan's most iconic landmarks, known for its fascinating architecture, historical significance, and beautiful surrounding park.",
      image: "/osaka-castle-park.png",
      highlights: ["Historic Castle", "Castle Park", "Cherry Blossoms", "Museum Exhibits"],
      bestTime: "Spring",
      duration: "Half day",
      nearbyAttractions: ["Dotonbori", "Universal Studios Japan", "Sumiyoshi Taisha"],
      website: "https://www.japan.travel",
    },
    {
      id: "des-007",
      name: "Sapporo Snow Festival",
      location: "Sapporo, Hokkaido",
      region: "Hokkaido",
      description:
        "A world-famous winter festival showcasing the best of Japanese snow and ice sculpture art, attracting millions of visitors with spectacular displays.",
      image: "/sapporo-snow-festival.png",
      highlights: ["Ice Sculptures", "Snow Art", "Winter Illumination", "Cultural Events"],
      bestTime: "Winter",
      duration: "2-3 days",
      nearbyAttractions: ["Sapporo Clock Tower", "Susukino District", "Odori Park"],
      website: "https://www.japan.travel",
    },
    {
      id: "des-008",
      name: "Hiroshima Peace Memorial",
      location: "Hiroshima Peace Memorial Park",
      region: "Chugoku",
      description:
        "A UNESCO World Heritage Site and memorial park dedicated to the atomic bombing of Hiroshima, serving as a powerful reminder and symbol of peace.",
      image: "/hiroshima-peace-memorial.png",
      highlights: ["Peace Memorial Museum", "Atomic Bomb Dome", "Peace Park", "Memorial Ceremonies"],
      bestTime: "Spring",
      duration: "Half day",
      nearbyAttractions: ["Hiroshima Castle", "Miyajima Island", "Shukkeien Garden"],
      website: "https://www.japan.travel",
    },
    {
      id: "des-009",
      name: "Ghibli Museum",
      location: "Mitaka, Tokyo",
      region: "Kanto",
      description:
        "A unique museum dedicated to Studio Ghibli's animated films, offering fascinating insights into Japanese animation and the magical world of Miyazaki's creations.",
      image: "/ghibli-museum-mitaka.png",
      highlights: ["Animation Exhibits", "Studio Ghibli Films", "Interactive Displays", "Exclusive Screenings"],
      bestTime: "Autumn",
      duration: "Half day",
      nearbyAttractions: ["Mitaka Inari Shrine", "Inokashira Park", "Kichijoji"],
      website: "https://www.japan.travel",
    },
    {
      id: "des-010",
      name: "Fushimi Inari Shrine",
      location: "Fushimi, Kyoto",
      region: "Kansai",
      description:
        "One of Japan's most famous Shinto shrines, renowned for its thousands of vermilion torii gates creating magical tunnels up the mountainside.",
      image: "/fushimi-inari-torii-tunnel.png",
      highlights: ["Thousand Torii Gates", "Mountain Hiking", "Shinto Rituals", "Fox Statues"],
      bestTime: "Spring",
      duration: "Half day",
      nearbyAttractions: ["Kiyomizu-dera Temple", "Nijo Castle", "Bamboo Grove"],
      website: "https://www.japan.travel",
    },
  ]

  const experiences = [
    {
      id: "exp-001",
      name: "Hakone Day Trip",
      location: "Hakone",
      description: "Discover Hakone Scenic Train Ride 2 hours Easy Spring, Summer",
      image: "/hakone-day-trip.png",
      type: "Scenic Train Ride",
      duration: "2 hours",
      difficulty: "Easy",
      season: "Spring, Summer",
      website: "https://www.hakone-tozan.co.jp",
    },
    {
      id: "exp-002",
      name: "Sumo Tournament",
      location: "Tokyo",
      description: "Experience Japan's famous sumo wrestling tournament with its unique culture and traditions.",
      image: "/sumo-tournament.png",
      type: "Cultural Event",
      duration: "2-3 days",
      difficulty: "Easy",
      season: "March, May, September",
      website: "https://www.sumo.or.jp",
    },
    {
      id: "exp-003",
      name: "Tokyo Skytree",
      location: "Tokyo",
      description: "Discover Tokyo Observation To Full-day Easy Year-round",
      image: "/tokyo-skytree-view.png",
      type: "Observation Tower",
      duration: "Full-day",
      difficulty: "Easy",
      season: "Year-round",
      website: "https://www.tokyo-skytree.jp",
    },
    {
      id: "exp-004",
      name: "Sakura Season",
      location: "Various",
      description: "Experience Japan's iconic cherry blossom festivals with traditional food, music, and dance.",
      image: "/sakura-season.png",
      type: "Festival",
      duration: "2-4 weeks",
      difficulty: "Easy",
      season: "Late March to Early April",
      website: "https://www.jnto.go.jp",
    },
    {
      id: "exp-005",
      name: "Mount Fuji Climbing",
      location: "Mount Fuji",
      description: "Experience the Hiking/Climbing Full-day Moderate to Difficult Summer",
      image: "/mount-fuji-climbing.png",
      type: "Hiking/Climbing",
      duration: "Full-day",
      difficulty: "Moderate to Difficult",
      season: "Summer",
      website: "https://www.fujisan-climb.jp",
    },
    {
      id: "exp-006",
      name: "Traditional Japanese Farm",
      location: "Rural Japan",
      description: "Discover Traditional Farm Experience Half-day Easy Year-round",
      image: "/traditional-japanese-farm.png",
      type: "Farm Experience",
      duration: "Half-day",
      difficulty: "Easy",
      season: "Year-round",
      website: "https://www.japan-guide.com",
    },
  ]

  const events = [
    {
      id: "evt-001",
      name: "Tokyo Cherry Blossom Festival",
      location: "Ueno Park, Tokyo",
      date: "March 15, 2025",
      description: "Experience the famous cherry blossom festival with traditional performances and food stalls.",
      image: "/ueno-park-hanami.png",
      price: "Free",
      website: "https://www.festival.jp",
    },
    {
      id: "evt-002",
      name: "Kyoto Gion Festival",
      location: "Gion District, Kyoto",
      date: "July 1-31, 2025",
      description: "Witness the spectacular Gion Matsuri, one of Japan's most famous festivals.",
      image: "/gion-matsuri-festival.png",
      price: "Free",
      website: "https://www.kyoto.travel",
    },
    {
      id: "evt-003",
      name: "Osaka Food Festival",
      location: "Osaka Castle Park",
      date: "June 20, 2025",
      description: "Celebrate Osaka's culinary heritage with street food and cooking demonstrations.",
      image: "/osaka-food-festival.png",
      price: "2500 yen",
      website: "https://www.osaka-info.jp",
    },
  ]

  const guides = [
    {
      id: "plan-001",
      name: "Kyoto's Icons: A guide to visiting temples and shrines",
      description: "Comprehensive guide to Kyoto's most sacred places and cultural sites.",
      image: "/kyoto-temples-guide.png",
      author: "Aya Kimura",
      language: "English",
      website: "https://www.japan.travel",
    },
    {
      id: "plan-002",
      name: "Spring Hanami: Discover the Cherry Blossom Season",
      description: "Complete guide to experiencing Japan's cherry blossom season.",
      image: "/spring-festivals-japan.png",
      author: "Keiko Yamada",
      language: "English",
      website: "https://www.jnto.go.jp",
    },
    {
      id: "plan-003",
      name: "Cultural Immersion: Traditional Arts and Crafts",
      description: "Explore Japan's rich cultural heritage through traditional arts.",
      image: "/japanese-culture-hero.png",
      author: "Haruki Sato",
      language: "English",
      website: "https://www.japan-guide.com",
    },
  ]

  const getFilteredContent = () => {
    switch (activeFilter) {
      case "destinations":
        return destinations
      case "experiences":
        return experiences
      case "events":
        return events
      case "guides":
        return guides
      default:
        return destinations
    }
  }

  const filteredContent = getFilteredContent()

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/japanese-destinations-hero.png')`,
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-sans text-5xl md:text-6xl font-bold mb-4">Japan Travel Highlights</h1>
          <p className="font-serif text-xl md:text-2xl max-w-2xl mx-auto">
            Discover Japan's most captivating destinations, experiences, events, and travel guides
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { key: "destinations", label: "Destinations", count: destinations.length },
              { key: "experiences", label: "Experiences", count: experiences.length },
              { key: "events", label: "Events", count: events.length },
              { key: "guides", label: "Guides", count: guides.length },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeFilter === filter.key
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContent.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden bg-white"
              >
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.region && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-600 text-white font-serif">{item.region}</Badge>
                    </div>
                  )}
                  {item.price && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-yellow-600 text-white font-serif">{item.price}</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <h3 className="font-sans text-xl font-bold text-gray-900 mb-2">{item.name}</h3>

                  {item.location && (
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="font-serif text-sm">{item.location}</span>
                    </div>
                  )}

                  <p className="font-serif text-gray-700 mb-4 leading-relaxed text-sm">{item.description}</p>

                  {/* Highlights for destinations */}
                  {item.highlights && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {item.highlights.slice(0, 3).map((highlight) => (
                          <Badge key={highlight} variant="secondary" className="font-serif text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    {item.duration && (
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-3 h-3 mr-1" />
                        <span className="font-serif">{item.duration}</span>
                      </div>
                    )}
                    {item.bestTime && (
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span className="font-serif">{item.bestTime}</span>
                      </div>
                    )}
                    {item.date && (
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span className="font-serif">{item.date}</span>
                      </div>
                    )}
                    {item.author && (
                      <div className="text-gray-600">
                        <span className="font-serif">By {item.author}</span>
                      </div>
                    )}
                  </div>

                  {/* Nearby attractions for destinations */}
                  {item.nearbyAttractions && (
                    <div className="mb-4">
                      <h4 className="font-sans font-medium text-gray-900 mb-1 text-xs">Nearby</h4>
                      <p className="font-serif text-gray-600 text-xs">
                        {item.nearbyAttractions.slice(0, 2).join(" • ")}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-serif text-sm" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
