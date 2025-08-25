"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
  const [name, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordRules, setShowPasswordRules] = useState(false) // 👈 added
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  // Password validation
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasMinLength = password.length >= 8

  const isPasswordValid = hasSpecialChar && hasUppercase && hasNumber && hasMinLength

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isPasswordValid) {
      setMessage("Please ensure your password meets all requirements.")
      return
    }

    setIsSubmitting(true)

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      })

      setMessage("Registration successful! Check email to verify. Redirecting to login...")
      localStorage.setItem("token", res.data.token)

      setTimeout(() => {
        router.push("/login")
      }, 1000)
    } catch (error: any) {
      console.error("Registration Error:", error.response?.data || error.message)
      setMessage(error.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const ValidationIcon = ({ isValid }: { isValid: boolean }) =>
    isValid ? <Check className="h-3 w-3 text-green-600" /> : <X className="h-3 w-3 text-red-500" />

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-gray-900 cursor-pointer">Create Account</CardTitle>
          <CardDescription className="text-gray-600">
            Join us to start your Japanese adventure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Username
              </Label>
              <Input id="name" type="text" value={name} onChange={(e) => setUsername(e.target.value)} required />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setShowPasswordRules(true)}   // 👈 show rules
                  onBlur={() => !password && setShowPasswordRules(false)} // 👈 hide if empty
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password Rules (only visible when typing or focused) */}
              {showPasswordRules && (
                <div className="mt-2 p-3 bg-gray-50 rounded-md border">
                  <p className="text-xs font-medium text-gray-700 mb-2">Password must contain:</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <ValidationIcon isValid={hasSpecialChar} />
                      <span className={hasSpecialChar ? "text-green-600" : "text-red-500"}>
                        At least 1 special character
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <ValidationIcon isValid={hasUppercase} />
                      <span className={hasUppercase ? "text-green-600" : "text-red-500"}>
                        At least 1 uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <ValidationIcon isValid={hasNumber} />
                      <span className={hasNumber ? "text-green-600" : "text-red-500"}>At least 1 number</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <ValidationIcon isValid={hasMinLength} />
                      <span className={hasMinLength ? "text-green-600" : "text-red-500"}>
                        Minimum length of 8 characters
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            {message && (
              <Alert
                className={
                  message.includes("successful") ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }
              >
                <AlertDescription
                  className={message.includes("successful") ? "text-green-800" : "text-red-800"}
                >
                  {message}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit */}
            <Button type="submit" disabled={isSubmitting || !isPasswordValid} className="w-full">
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            {/* Google Login */}
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await axios.post("http://localhost:5000/api/auth/google", {
                    credential: credentialResponse.credential,
                  })

                  localStorage.setItem("token", res.data.accessToken)
                  setMessage("Google registration successful! Redirecting...")
                  setTimeout(() => router.push("/"), 1000)
                } catch (err: any) {
                  console.error("Google Auth Error:", err.response?.data || err.message)
                  setMessage(err.response?.data?.message || "Google registration failed")
                }
              }}
              onError={() => {
                setMessage("Google Login Failed. Please try again.")
              }}
            />

            {/* Link to login */}
            <div className="text-center">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-sm text-red-600 hover:text-red-700 hover:underline font-medium"
              >
                Sign In
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
