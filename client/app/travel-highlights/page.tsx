"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

// Data from the provided template
const destinations = [
  {
    id: "des-001",
    type: "Destination",
    title: "Mount Fuji",
    location: "Yamanashi Prefecture",
    image: "/mount-fuji-yamanashi.png",
    description: "Japan's iconic mountain and the country's tallest peak, a popular hiking destination.",
    region: "Kanto",
    map: "https://www.google.com/maps/@35.3632,138.7304,15z",
    bestSeason: "Autumn",
    nearby: "Kawaguchi-Ko, Yoshida-Ko, Fuji Five Lakes",
  },
  {
    id: "des-002",
    type: "Destination",
    title: "Tokyo Tower",
    location: "Shinjuku, Tokyo",
    image: "/tokyo-tower-shinjuku.png",
    description:
      "One of Tokyo's most iconic landmarks, a communications tower with a fascinating history and breathtaking views.",
    region: "Kanto",
    map: "https://www.google.com/maps/@35.6584,139.7838,15z",
    bestSeason: "Spring",
    nearby: "Shinjuku Gyoen, Tokyo Skytree",
  },
  {
    id: "des-003",
    type: "Destination",
    title: "Miyajima Island",
    location: "Hiroshima Prefecture",
    image: "/miyajima-island-hiroshima.png",
    description:
      "A scenic island famous for its beautiful beaches and historic landmarks, a UNESCO World Heritage Site.",
    region: "Chugoku",
    map: "https://www.google.com/maps/@34.3334,132.3114,15z",
    bestSeason: "Summer",
    nearby: "Itsukushima Shrine, Miyajima Beach",
  },
  {
    id: "des-004",
    type: "Destination",
    title: "Kabuki Theatre",
    location: "Ginza, Tokyo",
    image: "/kabuki-theatre-ginza.png",
    description:
      "One of Japan's most renowned traditional theaters, known for its intricate performances and historical significance.",
    region: "Kanto",
    map: "https://www.google.com/maps/@35.6707,139.7723,15z",
    bestSeason: "Winter",
    nearby: "Chidorigafuchi, Tokyo National Museum",
  },
  {
    id: "des-005",
    type: "Destination",
    title: "Kyoto Imperial Palace",
    location: "Kyoto",
    image: "/kyoto-imperial-palace.png",
    description:
      "The former residence of Japan's imperial family, a UNESCO World Heritage Site, with stunning gardens and historic architecture.",
    region: "Kansai",
    map: "https://www.google.com/maps/@35.0419,135.7743,15z",
    bestSeason: "Autumn",
    nearby: "Kinkaku-ji Temple, Fushimi Inari Shrine",
  },
  {
    id: "des-006",
    type: "Destination",
    title: "Osaka Castle",
    location: "Osaka Castle Park",
    image: "/osaka-castle-park.png",
    description:
      "A famous castle and one of Japan's most iconic landmarks, known for its fascinating architecture and historical significance.",
    region: "Kansai",
    map: "https://www.google.com/maps/@34.6924,135.5041,15z",
    bestSeason: "Spring",
    nearby: "Dotonbori, Universal Studios Japan",
  },
  {
    id: "des-007",
    type: "Destination",
    title: "Sapporo Snow Festival",
    location: "Sapporo",
    image: "/sapporo-snow-festival.png",
    description: "A world-famous winter festival with spectacular snow and ice sculptures.",
    region: "Hokkaido",
    map: "https://www.google.com/maps/@43.0558,141.3483,15z",
    bestSeason: "Winter",
    nearby: "Sapporo Clock Tower, Susukino",
  },
  {
    id: "des-008",
    type: "Destination",
    title: "Hiroshima Peace Memorial Park",
    location: "Hiroshima Peace Memorial Park",
    image: "/hiroshima-peace-memorial.png",
    description: "UNESCO World Heritage memorial park dedicated to the 1945 atomic bombing.",
    region: "Chugoku",
    map: "https://www.google.com/maps/@34.3951,132.4555,15z",
    bestSeason: "Spring",
    nearby: "Hiroshima Castle, Miyajima Island",
  },
  {
    id: "des-009",
    type: "Destination",
    title: "Ghibli Museum",
    location: "Mitaka, Tokyo",
    image: "/ghibli-museum-mitaka.png",
    description: "Museum dedicated to Studio Ghibli's works, offering insight into Japanese animation.",
    region: "Kanto",
    map: "https://www.google.com/maps/@35.7014,139.5659,15z",
    bestSeason: "Autumn",
    nearby: "Mitaka Inari Shrine, Meiji-dori",
  },
  {
    id: "des-010",
    type: "Destination",
    title: "Fushimi Inari Shrine",
    location: "Fushimi, Kyoto",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg-cA0HGpYwfHNf3TFlpsynZgRVyTsQF2.jpeg",
    description: "Famous Shinto shrine with thousands of vermilion torii gates.",
    region: "Kansai",
    map: "https://www.google.com/maps/@34.9664,135.7681,15z",
    bestSeason: "Spring",
    nearby: "Kiyomizu-dera Temple, Nijo Castle",
  },
]

const experiences = [
  {
    id: "exp-001",
    type: "Experience",
    title: "Hakone Day Trip",
    image: "/hakone-day-trip.png",
    description: "Discover Hakone's scenic views, natural hot springs, and unique black eggs.",
    category: "Scenic Train Ride",
    duration: "2 hours",
    difficulty: "Easy",
    season: "Spring, Summer",
    site: "https://www.hakone-tourism.jp/",
  },
  {
    id: "exp-002",
    type: "Experience",
    title: "Sumo Tournament",
    image: "/sumo-tournament.png",
    description: "Experience Japan's famous sumo wrestling tournament and traditions.",
    category: "Event",
    duration: "2-3 days",
    difficulty: "Easy",
    season: "March, May, September",
    site: "https://sumo.ebifan.com/",
  },
  {
    id: "exp-003",
    type: "Experience",
    title: "Tokyo Skytree",
    image: "/tokyo-skytree-view.png",
    description: "Discover Tokyo's skyline and shopping from the tallest tower in the world.",
    category: "Observation Tower",
    duration: "Full-day",
    difficulty: "Easy",
    season: "Year-round",
    site: "https://www.tokyo-skytree.jp/en/",
  },
  {
    id: "exp-004",
    type: "Experience",
    title: "Sakura Season",
    image: "/sakura-season.png",
    description: "Iconic cherry blossom festivals with traditional food, music, and dance.",
    category: "Festival",
    duration: "2-4 weeks",
    difficulty: "Easy",
    season: "Late March to Early April",
    site: "https://sakura.cherry-blossom.com/",
  },
  {
    id: "exp-005",
    type: "Experience",
    title: "Mount Fuji Climbing",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/climbing-mount-fuji-japan01-SAbchIa7rhxtqqxPfAaDKLqDxq5Z3R.png",
    description: "Climb Japan's iconic mountain and embrace its cultural significance.",
    category: "Hiking/Biking",
    duration: "Full-day",
    difficulty: "Moderate to Challenging",
    season: "Summer, Autumn",
    site: "https://www.fujisan-climb.jp/",
  },
  {
    id: "exp-006",
    type: "Experience",
    title: "Traditional Japanese Farm",
    image: "/traditional-japanese-farm.png",
    description: "Rural Japan's culture, traditions, and delicious food.",
    category: "Farmstay",
    duration: "3-7 days",
    difficulty: "Easy",
    season: "Year-round",
    site: "https://www.japan-farmstay.com/",
  },
  {
    id: "exp-007",
    type: "Experience",
    title: "Kyoto Temple Tour",
    image: "/kyoto-temple-tour.png",
    description: "Explore Kyoto's most famous temples, gardens, and architecture.",
    category: "Cultural Tour",
    duration: "Full-day",
    difficulty: "Easy",
    season: "Year-round",
    site: "https://www.japan-guided-tours.com/",
  },
  {
    id: "exp-008",
    type: "Experience",
    title: "Yokohama Chinatown",
    image: "/yokohama-chinatown.png",
    description: "Japan's largest Chinatown with unique culture, food, and shopping.",
    category: "Cultural District",
    duration: "Half-day",
    difficulty: "Easy",
    season: "Year-round",
    site: "https://www.yokohama-chinatown.com/",
  },
  {
    id: "exp-009",
    type: "Experience",
    title: "Nara Park",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nara%20park.png-VND1AEJSLXqdpH2w8pqdC881K9YMRt.webp",
    description: "Meet friendly deer and visit historical temples.",
    category: "Wildlife/Sightseeing",
    duration: "Half-day",
    difficulty: "Easy",
    season: "Year-round",
    site: "https://www.nara-park.go.jp/en/",
  },
  {
    id: "exp-010",
    type: "Experience",
    title: "Shinto Shrine Festival",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shinto%20Shrine%20Festival.jpg-52uHZLQhyfCSzAUbEsw8lM46ZW8xvf.jpeg",
    description: "Experience Shinto festivals and traditions across Japan.",
    category: "Festival",
    duration: "1-2 days",
    difficulty: "Easy",
    season: "Year-round",
    site: "https://www.shinto.org/events.html",
  },
]

const events = [
  {
    id: "evt-001",
    type: "Event",
    title: "Tokyo Cherry Blossom Festival",
    date: "August 3, 2025",
    location: "Ueno Park, Tokyo",
    description: "Vibrant cherry blossoms in one of Tokyo's most iconic parks.",
    image: "/cherry-blossom-festival.png",
    category: "Festival",
    site: "https://cherryblossom.jp/",
    price: "Free",
  },
  {
    id: "evt-002",
    type: "Event",
    title: "Kyoto Gion Festival",
    date: "August 17, 2025",
    location: "Gion District, Kyoto",
    description: "Traditional pageantry with decorated floats and geisha performances.",
    image: "/gion-matsuri-festival.png",
    category: "Cultural Event",
    site: "https://gionmatsuri.jp/en",
    price: "Free",
  },
  {
    id: "evt-003",
    type: "Event",
    title: "Osaka Castle Cherry Blossom Walk",
    date: "August 11, 2025",
    location: "Osaka Castle, Osaka",
    description: "Stroll through Osaka Castle's gardens during blossom season.",
    image: "/osaka-castle-park.png",
    category: "Event",
    site: "https://www.osakacastle.net/en",
    price: "2500 yen",
  },
  {
    id: "evt-004",
    type: "Event",
    title: "Osaka Food Festival",
    date: "August 29, 2025",
    location: "Dotonbori, Osaka",
    description: "Bustling Dotonbori street food stalls, neon signs, takoyaki and okonomiyaki vendors, festive crowd.",
    image: "/osaka-dotonbori-food-festival.png",
    category: "Food Festival",
    site: "https://www.osaka-info.jp/en/",
    price: "Free",
  },
  {
    id: "evt-005",
    type: "Event",
    title: "Miyajima Island Cherry Blossom Festival",
    date: "August 20, 2025",
    location: "Miyajima Island, Miyajima",
    description: "Breathtaking blossoms with Itsukushima Shrine in the background.",
    image: "/miyajima-island-hiroshima.png",
    category: "Festival",
    site: "https://www.miyajima.or.jp/en",
    price: "Free",
  },
  {
    id: "evt-006",
    type: "Event",
    title: "Sapporo Snow Festival",
    date: "August 14, 2025",
    location: "Okurayama Hill, Sapporo",
    description: "Majestic snow sculptures illuminated at night.",
    image: "/sapporo-snow-festival.png",
    category: "Festival",
    site: "https://sapporosnowfestival.com/en/",
    price: "Free",
  },
  {
    id: "evt-007",
    type: "Event",
    title: "Kyoto Imperial Palace Tour",
    date: "August 15, 2025",
    location: "Kyoto Imperial Palace, Kyoto",
    description: "Visit the magnificent former residence of the Emperor of Japan.",
    image: "/kyoto-imperial-palace.png",
    category: "Museum",
    site: "https://www.satsukitenjingu.or.jp/en/kankyoken.html",
    price: "200 yen",
  },
  {
    id: "evt-008",
    type: "Event",
    title: "Mount Fuji Summit",
    date: "August 26, 2025",
    location: "Mount Fuji, Fuji-Hakone-Izu National Park",
    description: "Scale the majestic summit of Japan's highest peak.",
    image: "/mount-fuji-yamanashi.png",
    category: "Adventure",
    site: "https://www.fugen.co.jp/en/",
    price: "Free (climbing fee applies)",
  },
  {
    id: "evt-009",
    type: "Event",
    title: "Nara Todaiji Temple",
    date: "August 1, 2025",
    location: "Nara Todaiji Temple, Nara",
    description: "Home to the world's largest bronze Buddha statue.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Todaiji-Temple-in-Nara-Japan-Featured.jpg-cjpP8tjOa4DIfnrabmCLUWUQgswsy0.jpeg",
    category: "Museum",
    site: "https://www.naramachi.jp/en/",
    price: "600 yen",
  },
  {
    id: "evt-010",
    type: "Event",
    title: "Yokohama Chinatown Festival",
    date: "August 25, 2025",
    location: "Yokohama Chinatown, Yokohama",
    description: "Explore the largest Chinatown in Japan.",
    image: "/yokohama-chinatown.png",
    category: "Event",
    site: "https://chinatown-yokohama.com/en/",
    price: "Free",
  },
]

const guides = [
  {
    id: "plan-001",
    type: "Guide",
    title: "Kyoto's Iconic Temples",
    tag: "Destination",
    blurb: "Guide to Fushimi Inari, Kinkaku‑ji and more.",
    image: "/kyoto-temples-guide.png",
    url: "https://www.japan-guide.com/e/e2158.html",
    date: "May 15, 2025",
    author: "Aya Kimura",
  },
  {
    id: "plan-002",
    type: "Guide",
    title: "Spring Hanami in Ueno Park",
    tag: "Experience",
    blurb: "Tradition of cherry blossom viewing in Ueno Park.",
    image: "/ueno-park-hanami.png",
    url: "https://www.japan.travel/en/uk/inspiration/hanami-cherry-blossom/",
    date: "April 1, 2025",
    author: "Keiko Yamada",
  },
  {
    id: "plan-003",
    type: "Guide",
    title: "Understanding the Japanese Tea Ceremony",
    tag: "Cultural Fact",
    blurb: "Rituals, history, and etiquette of tea ceremonies.",
    image: "/tea-ceremony-guide.png",
    url: "https://www.japan-guide.com/e/e2092.html",
    date: "June 20, 2025",
    author: "Haruki Sasaki",
  },
  {
    id: "plan-004",
    type: "Guide",
    title: "Navigating Japan's Rail System",
    tag: "Travel Tip",
    blurb: "Using JR Pass and Shinkansen like a pro.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rail.png-MdY92t7bedWn644hcBnTNrO4d0cyfG.webp",
    url: "https://www.japan-guide.com/e/e2361.html",
    date: "July 10, 2025",
    author: "Taro Nakagawa",
  },
  {
    id: "plan-005",
    type: "Guide",
    title: "Gion Matsuri Festival Guide",
    tag: "Event Highlight",
    blurb: "Plan Kyoto's famous summer festival.",
    image: "/gion-matsuri-festival.png",
    url: "https://www.japan.travel/en/uk/inspiration/events-festivals/gion-matsuri/",
    date: "July 1, 2025",
    author: "Mei Iwasaki",
  },
  {
    id: "japan_001",
    type: "Guide",
    title: "Spring Festivals in Japan",
    tag: "Festivals",
    blurb: "Spring is perfect for vibrant festivals and events.",
    image: "/spring-festivals-japan.png",
    url: "https://www.japan-guide.com/e/e2063.html",
    date: "August 15, 2025",
    author: "Japan Guide",
  },
  {
    id: "japan_002",
    type: "Guide",
    title: "Autumn Foliage in Japan",
    tag: "Culture",
    blurb: "Breathtaking koyo across Japan's landscapes.",
    image: "/autumn-foliage-japan.png",
    url: "https://www.japan-guide.com/e/e2014.html",
    date: "August 20, 2025",
    author: "Japan Times",
  },
  {
    id: "japan_003",
    type: "Guide",
    title: "Best Restaurants in Tokyo",
    tag: "Food",
    blurb: "Discover Tokyo's diverse culinary scene from Michelin-starred establishments to hidden local gems.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tokyo.jpg-OAmfTJLIcW9m0STWKimlvtvcJw068s.jpeg",
    url: "https://www.japan-guide.com/e/e2036.html",
    date: "July 25, 2025",
    author: "Tokyo Culture",
  },
  {
    id: "japan_004",
    type: "Guide",
    title: "Best Onsen in Japan",
    tag: "Wellness",
    blurb: "Top-rated onsen resorts to unwind.",
    image: "/japan-onsen-guide.png",
    url: "https://www.japan-guide.com/e/e2292.html",
    date: "July 20, 2025",
    author: "Japan Life",
  },
  {
    id: "japan_005",
    type: "Guide",
    title: "Tokyo Pop Culture",
    tag: "Culture",
    blurb: "From anime to fashion hotspots.",
    image: "/tokyo-pop-culture.png",
    url: "https://www.japan-guide.com/e/e2084.html",
    date: "July 18, 2025",
    author: "Tokyo Pop",
  },
]

const monthlyHighlights = [
  {
    month: "January",
    highlight: "Snow Festival in Hokkaido",
    description: "Witness magical ice sculptures and snowy landscapes.",
    image: "/sapporo-snow-festival.png",
    color: "bg-blue-50 border-blue-200",
  },
  {
    month: "February",
    highlight: "Plum Blossoms in Kyoto",
    description: "Early signs of spring with fragrant plum blossoms.",
    image: "/kyoto-plum-blossoms.png",
    color: "bg-pink-50 border-pink-200",
  },
  {
    month: "March",
    highlight: "Cherry Blossoms in Tokyo",
    description: "Experience the world-famous sakura season.",
    image: "/tokyo-cherry-blossoms.png",
    color: "bg-rose-50 border-rose-200",
  },
  {
    month: "April",
    highlight: "Takayama Spring Festival",
    description: "Traditional parades and vibrant floats.",
    image: "/takayama-spring-festival.png",
    color: "bg-green-50 border-green-200",
  },
  {
    month: "May",
    highlight: "Fuji Shibazakura Festival",
    description: "Pink moss fields with Mt. Fuji as backdrop.",
    image: "/pink-phlox-fuji.png",
    color: "bg-purple-50 border-purple-200",
  },
  {
    month: "June",
    highlight: "Hydrangea Season in Kamakura",
    description: "Temple gardens glowing in rainy-season blooms.",
    image: "/kamakura-hydrangeas.png",
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    month: "July",
    highlight: "Gion Matsuri, Kyoto",
    description: "Japan's most famous summer festival.",
    image: "/gion-matsuri.png",
    color: "bg-red-50 border-red-200",
  },
  {
    month: "August",
    highlight: "Awa Odori Dance, Tokushima",
    description: "Join lively street dances and summer celebrations.",
    image: "/awa-odori-street-dance.png",
    color: "bg-orange-50 border-orange-200",
  },
  {
    month: "September",
    highlight: "Moon Viewing (Tsukimi)",
    description: "Enjoy serene autumn moon nights with Japanese sweets.",
    image: "/tsukimi-arrangement.png",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    month: "October",
    highlight: "Autumn Leaves in Nikko",
    description: "Golden and crimson forests in peak beauty.",
    image: "/nikko-autumn-temples.png",
    color: "bg-amber-50 border-amber-200",
  },
  {
    month: "November",
    highlight: "Kyoto Autumn Colors",
    description: "Maple leaves set temples aglow.",
    image: "/kyoto-autumn-temples.png",
    color: "bg-orange-50 border-orange-300",
  },
  {
    month: "December",
    highlight: "Winter Illuminations in Tokyo",
    description: "Dazzling city lights and festive vibes.",
    image: "/december-tokyo-illuminations.png",
    color: "bg-blue-50 border-blue-300",
  },
]

interface TravelItem {
  id: string
  type: string
  title: string
  image: string
  description?: string
  blurb?: string
  location?: string
  region?: string
  bestSeason?: string
  nearby?: string
  map?: string
  site?: string
  url?: string
  category?: string
  duration?: string
  difficulty?: string
  date?: string
  author?: string
  price?: string
  tag?: string
}

export default function TravelHighlights() {
  const [activeFilter, setActiveFilter] = useState("all")

  const allItems: TravelItem[] = [
    ...destinations,
    ...experiences,
    ...events,
    ...guides,
    ...monthlyHighlights.map((month) => ({
      id: `month-${month.month.toLowerCase()}`,
      type: "Monthly Highlight",
      title: month.highlight,
      image: month.image,
      description: month.description,
      location: month.month,
      category: "Seasonal",
    })),
  ]

  const filteredItems = activeFilter === "all" ? allItems : allItems.filter((item) => item.type === activeFilter)

  const filters = [
    { key: "all", label: "All" },
    { key: "Destination", label: "Destinations" },
    { key: "Experience", label: "Experiences" },
    { key: "Event", label: "Events" },
    { key: "Guide", label: "Guides" },
    { key: "Monthly Highlight", label: "Monthly Highlights" },
  ]

  const handleOpen = (item: TravelItem) => {
    const target = item.map || item.site || item.url
    if (target) {
      window.open(target, "_blank")
    }
  }

  const handleNearby = (item: TravelItem) => {
    if (item.nearby) {
      alert(`${item.title} — Nearby: ${item.nearby}`)
    }
  }

  const getMetaInfo = (item: TravelItem) => {
    const metaBits = []
    if (item.location) metaBits.push(item.location)
    if (item.region) metaBits.push(item.region)
    if (item.bestSeason) metaBits.push(`Best: ${item.bestSeason}`)
    if (item.date) metaBits.push(item.date)
    if (item.category && !item.region) metaBits.push(item.category)
    if (item.duration) metaBits.push(item.duration)
    if (item.difficulty) metaBits.push(item.difficulty)
    if (item.price) metaBits.push(item.price)
    if (item.author) metaBits.push(item.author)
    return metaBits
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <header className="text-center py-12">
          <span className="inline-block px-4 py-2 border border-gray-200 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-600 bg-white mb-4">
            Curated Picks
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Japan Travel Highlights</h1>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            Minimal, clean UI showcasing the best of Japan. Use the filters to explore Destinations, Experiences,
            Events, Guides, and Monthly Highlights. All content is curated from comprehensive travel data.
          </p>

          {/* Filters */}
          <nav className="flex flex-wrap justify-center gap-3 mt-8">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 border rounded-full font-semibold text-sm transition-colors ${
                  activeFilter === filter.key
                    ? "bg-gray-100 border-gray-300 text-gray-900"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const metaBits = getMetaInfo(item)
            const hasActions = item.map || item.site || item.url || item.nearby

            return (
              <article
                key={item.id}
                className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-white">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 border border-gray-200 rounded-full text-xs font-bold text-gray-900">
                    {item.type}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">{item.title}</h3>

                  {/* Meta */}
                  {metaBits.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 mb-3">
                      {metaBits.map((meta, index) => (
                        <span key={index} className="flex items-center">
                          {index > 0 && <span className="w-1 h-1 bg-gray-400 rounded-full mx-2" />}
                          {meta}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  {(item.description || item.blurb) && (
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">{item.description || item.blurb}</p>
                  )}

                  {/* Actions */}
                  {hasActions && (
                    <div className="flex justify-between items-center gap-2">
                      {(item.map || item.site || item.url) && (
                        <Button
                          onClick={() => handleOpen(item)}
                          className="bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 font-bold"
                          size="sm"
                        >
                          Open
                        </Button>
                      )}
                      {item.nearby && (
                        <Button
                          onClick={() => handleNearby(item)}
                          variant="ghost"
                          className="bg-gray-100 text-gray-900 hover:bg-gray-200 font-bold"
                          size="sm"
                        >
                          Nearby
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 text-xs text-gray-600">
          Tip: All images are optimized for fast loading. Content is curated from comprehensive Japan travel data.
        </footer>
      </div>

      <Footer />
    </div>
  )
}
