import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CulturePage() {
  const festivals = [
    {
      name: "Cherry Blossom Festival (Hanami)",
      season: "Spring",
      description: "Celebrate the beauty of cherry blossoms with picnics under blooming trees.",
      image: "/cherry-blossom-festival.png",
    },
    {
      name: "Gion Matsuri",
      season: "Summer",
      description: "Kyoto's most famous festival featuring elaborate floats and traditional performances.",
      image: "/gion-matsuri-festival.png",
    },
    {
      name: "Autumn Leaves Festival",
      season: "Autumn",
      description: "Experience the stunning red and gold colors of Japanese maple trees.",
      image: "/autumn-leaves-festival.png",
    },
  ]

  const foods = [
    {
      name: "Sushi",
      description: "Fresh fish and rice prepared by master chefs with centuries-old techniques.",
      image: "/traditional-sushi-platter.png",
    },
    {
      name: "Ramen",
      description: "Hearty noodle soup with rich broth, perfect for any season.",
      image: "/authentic-ramen-bowl.png",
    },
    {
      name: "Tempura",
      description: "Lightly battered and fried vegetables and seafood, crispy and delicious.",
      image: "/tempura-cooking.png",
    },
  ]

  const traditions = [
    {
      name: "Tea Ceremony",
      description: "The Way of Tea emphasizes harmony, respect, purity, and tranquility.",
      icon: "🍵",
      image: "/japanese-tea-ceremony.png",
    },
    {
      name: "Martial Arts",
      description: "Ancient disciplines like karate, judo, and kendo that train both body and mind.",
      icon: "🥋",
      image: "/japanese-martial-arts.png",
    },
    {
      name: "Calligraphy",
      description: "The art of beautiful writing using brush and ink, expressing both meaning and beauty.",
      icon: "🖌️",
      image: "/japanese-calligraphy-art.png",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/japanese-culture-hero.png')`,
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-sans text-5xl md:text-6xl font-bold mb-4">Japanese Culture</h1>
          <p className="font-serif text-xl md:text-2xl max-w-2xl mx-auto">
            Immerse yourself in traditions that have shaped Japan for millennia
          </p>
        </div>
      </section>

      {/* Festivals Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl font-bold text-foreground mb-4">Traditional Festivals</h2>
            <p className="font-serif text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the vibrant celebrations that mark Japan's seasonal rhythms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {festivals.map((festival) => (
              <Card
                key={festival.name}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={festival.image || "/placeholder.svg"}
                    alt={festival.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-secondary text-secondary-foreground">{festival.season}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-sans text-xl font-semibold text-foreground mb-3">{festival.name}</h3>
                  <p className="font-serif text-muted-foreground">{festival.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Food Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl font-bold text-foreground mb-4">Culinary Traditions</h2>
            <p className="font-serif text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the artistry and philosophy behind Japanese cuisine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {foods.map((food) => (
              <Card key={food.name} className="group hover:shadow-lg transition-all duration-300 border-border">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={food.image || "/placeholder.svg"}
                    alt={food.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-sans text-xl font-semibold text-foreground mb-3">{food.name}</h3>
                  <p className="font-serif text-muted-foreground">{food.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Traditions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl font-bold text-foreground mb-4">Ancient Traditions</h2>
            <p className="font-serif text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the practices that continue to define Japanese culture today
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {traditions.map((tradition, index) => (
              <div key={tradition.name} className="text-center group">
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <img
                    src={tradition.image || "/placeholder.svg"}
                    alt={tradition.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-6xl mb-4">{tradition.icon}</div>
                <h3 className="font-sans text-2xl font-semibold text-foreground mb-4">{tradition.name}</h3>
                <p className="font-serif text-muted-foreground leading-relaxed">{tradition.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
