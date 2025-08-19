"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/japanese-contact-hero.png')`,
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-sans text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="font-serif text-xl md:text-2xl max-w-2xl mx-auto">
            Let us help you plan your perfect Japanese adventure
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-sans text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
              <p className="font-serif text-muted-foreground mb-8">
                Have questions about your trip to Japan? We're here to help you create unforgettable memories.
              </p>

              {isSubmitted ? (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-sans text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                    <p className="font-serif text-muted-foreground">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="font-serif">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`mt-2 font-serif ${errors.name ? "border-destructive" : ""}`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-destructive text-sm mt-1 font-serif">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-serif">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`mt-2 font-serif ${errors.email ? "border-destructive" : ""}`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1 font-serif">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="message" className="font-serif">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`mt-2 font-serif min-h-32 ${errors.message ? "border-destructive" : ""}`}
                      placeholder="Tell us about your travel plans, questions, or how we can help..."
                    />
                    {errors.message && <p className="text-destructive text-sm mt-1 font-serif">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-serif text-lg py-3"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2" size={16} />
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="font-sans text-3xl font-bold text-foreground mb-6">Contact Information</h2>

              <div className="space-y-8">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-sans font-semibold text-foreground mb-2">Email</h3>
                        <p className="font-serif text-muted-foreground">info@discoverjapan.com</p>
                        <p className="font-serif text-muted-foreground">support@discoverjapan.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-sans font-semibold text-foreground mb-2">Phone</h3>
                        <p className="font-serif text-muted-foreground">+81 3-1234-5678</p>
                        <p className="font-serif text-sm text-muted-foreground">Mon-Fri 9:00-18:00 JST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-sans font-semibold text-foreground mb-2">Office</h3>
                        <p className="font-serif text-muted-foreground">
                          1-2-3 Shibuya, Shibuya-ku
                          <br />
                          Tokyo 150-0002, Japan
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map placeholder */}
              <div className="mt-8">
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                  <img
                    src="/tokyo-office-map.png"
                    alt="Office Location Map"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
