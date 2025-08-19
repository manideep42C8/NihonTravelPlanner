import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, MapPin, Camera, Heart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Mount Fuji */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax"
          style={{
            backgroundImage: `url('/fuji-sunrise-cherry-blossoms.png')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center text-white px-4 animate-fade-in-up">
          <h1 className="font-sans text-5xl md:text-7xl font-bold mb-6">Explore the Beauty of Japan</h1>
          <p className="font-serif text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover ancient traditions, stunning landscapes, and vibrant culture in the Land of the Rising Sun
          </p>
          <Link href="/destinations">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif text-lg px-8 py-3"
            >
              Plan Your Trip
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Destinations Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl font-bold text-foreground mb-4">Popular Destinations</h2>
            <p className="font-serif text-xl text-muted-foreground max-w-2xl mx-auto">
              From bustling cities to serene temples, discover Japan's most captivating locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Tokyo",
                description: "Modern metropolis with ancient soul",
                image: "/tokyo-temples-skyscrapers.png",
              },
              {
                name: "Kyoto",
                description: "Ancient capital of temples and traditions",
                image: "/kinkaku-ji-reflection.png",
              },
              {
                name: "Osaka",
                description: "Culinary capital and vibrant nightlife",
                image: "/osaka-castle-cherry-blossoms.png",
              },
            ].map((destination, index) => (
              <Card
                key={destination.name}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-sans text-xl font-semibold text-foreground mb-2">{destination.name}</h3>
                  <p className="font-serif text-muted-foreground mb-4">{destination.description}</p>
                  <Link href="/destinations">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                    >
                      Explore
                      <MapPin className="ml-2" size={16} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Preview */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-sans text-4xl font-bold text-foreground mb-6">Immerse in Japanese Culture</h2>
              <p className="font-serif text-lg text-muted-foreground mb-8">
                Experience the rich traditions, festivals, and customs that have shaped Japan for centuries. From tea
                ceremonies to cherry blossom festivals, discover the heart of Japanese culture.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🌸</span>
                  </div>
                  <h3 className="font-sans font-semibold text-foreground">Festivals</h3>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🍜</span>
                  </div>
                  <h3 className="font-sans font-semibold text-foreground">Cuisine</h3>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🏯</span>
                  </div>
                  <h3 className="font-sans font-semibold text-foreground">Traditions</h3>
                </div>
              </div>
              <Link href="/culture">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Learn More
                  <Heart className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img src="/japanese-tea-ceremony.png" alt="Japanese Culture" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl font-bold text-foreground mb-4">Stunning Photography</h2>
            <p className="font-serif text-xl text-muted-foreground max-w-2xl mx-auto">
              Capture the essence of Japan through our curated collection of breathtaking images
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/japanese-garden-koi-lantern.png",
              "/cherry-blossom-tunnel.png",
              "/japanese-wooden-street.png",
              "/mount-fuji-sunset-reflection.png",
            ].map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/travel-highlights">
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                View Travel Highlights
                <Camera className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
