"use client"

import type React from "react"
import { z } from "zod"

import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useState, useEffect, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { resetPassword } from "@/actions/reset-password"

// Define Zod schema for password validation
const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type PasswordFormData = z.infer<typeof passwordSchema>

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  const token = searchParams.token
  const [isMobile, setIsMobile] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{
    newPassword?: string
    confirmPassword?: string
  }>({})

  const router = useRouter()

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Log the token for debugging
  useEffect(() => {
    console.log("Reset token:", token)

    // If no token is provided, show an error
    if (!token) {
      setError("No reset token provided. Please request a new password reset link.")
    }
  }, [token])

  const validateForm = (): boolean => {
    try {
      passwordSchema.parse({
        newPassword,
        confirmPassword,
      })
      setValidationErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: { [key: string]: string } = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message
          }
        })
        setValidationErrors(errors)
      }
      return false
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate token
    if (!token) {
      setError("Invalid reset token")
      return
    }

    // Validate form using Zod
    if (!validateForm()) {
      return
    }

    try {
      setIsLoading(true)
      const result = await resetPassword(token, newPassword)

      if (result.success) {
        setIsSuccess(true)
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      } else {
        setError(result.error || "Failed to reset password")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNewPassword(value)

    // Live validation as user types
    try {
      passwordSchema.parse({
        newPassword: value,
        confirmPassword,
      })
      setValidationErrors((prev) => ({ ...prev, newPassword: undefined }))

      // If confirm password is already entered, check if they match
      if (confirmPassword) {
        if (value !== confirmPassword) {
          setValidationErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }))
        } else {
          setValidationErrors((prev) => ({ ...prev, confirmPassword: undefined }))
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const passwordError = error.errors.find((err) => err.path[0] === "newPassword")
        if (passwordError) {
          setValidationErrors((prev) => ({ ...prev, newPassword: passwordError.message }))
        } else {
          setValidationErrors((prev) => ({ ...prev, newPassword: undefined }))
        }
      }
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setConfirmPassword(value)

    // Check if passwords match
    if (value !== newPassword) {
      setValidationErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }))
    } else {
      setValidationErrors((prev) => ({ ...prev, confirmPassword: undefined }))
    }
  }

  return (
    <div className="relative w-full h-screen bg-custom-green z-[1]">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <Image src="/img/reset/Group 1171275935.png" alt="" fill className="object-cover opacity-100" priority />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center p-4">
        {!isMobile ? (
          // Desktop layout
          <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-lg shadow-lg md:flex-row">
            {/* Left Column - Green Background with overlay dots */}
            <div className="relative w-full bg-greenook p-8 md:p-10 md:w-1/2">
              {/* Round dot overlays */}
              <div className="absolute -left-8 -bottom-6 z-0">
                <Image
                  src="/img/reset/Group 1171275832.png"
                  alt="Decorative dot pattern"
                  width={200}
                  height={200}
                  className="opacity-80"
                />
              </div>
              <div className="absolute -right-10 -top-2 z-0">
                <Image
                  src="/img/reset/Group 1171275833.png"
                  alt="Decorative dot pattern"
                  width={100}
                  height={100}
                  className="opacity-80"
                />
              </div>

              <div className="relative z-10 bg">
                {/* Logo Image */}
                <div className="flex items-center justify-center md:justify-start">
                  <Image
                    src="/img/reset/Group 1171275928.png"
                    alt="Trekking Miles Logo"
                    width={240}
                    height={80}
                    className="object-contain"
                  />
                </div>

                <h1 className="mt-8 md:mt-12 text-3xl md:text-4xl font-semibold font-nunito text-white text-center md:text-left">
                  Start your remarkable journey with us!
                </h1>

                <p className="mt-4 md:mt-6 text-base md:text-lg text-white/90 font-sans text-center md:text-left">
                  Seamless Access to Your Travel Business Hub
                </p>
              </div>
            </div>

            {/* Right Column - Reset Password Form */}
            <div className="w-full bg-white p-6 md:p-8 lg:p-12 md:w-1/2">
              <div className="mx-auto max-w-md">
                {isSuccess ? (
                  <div className="text-center">
                    <div className="mb-4 text-emerald-600 flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold font-nunito text-gray-900">Password Changed!</h2>
                    <p className="mt-2 text-gray-600">Your password has been successfully updated.</p>
                    <p className="mt-4 text-sm text-gray-500">Redirecting to login page...</p>
                  </div>
                ) : (
                  <>
                    <h2 className="mb-6 md:mb-8 text-2xl font-semibold font-nunito text-gray-900 text-center">
                      Change your password
                    </h2>

                    {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

                    <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
                      {/* New Password Field */}
                      <div className="space-y-2">
                        <label htmlFor="new-password" className="block text-sm font-bold text-gray-700">
                          New password*
                        </label>
                        <div className="relative">
                          <input
                            id="new-password"
                            name="newPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            required
                            value={newPassword}
                            onChange={handlePasswordChange}
                            className={`w-full rounded-md border ${
                              validationErrors.newPassword ? "border-red-500" : "border-gray-300"
                            } px-4 py-3 text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            aria-label="Toggle password visibility"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        {validationErrors.newPassword && (
                          <p className="text-xs text-red-600 mt-1">{validationErrors.newPassword}</p>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          Password must be at least 8 characters and include uppercase, lowercase, number, and special
                          character.
                        </div>
                      </div>

                      {/* Confirm Password Field */}
                      <div className="space-y-2">
                        <label htmlFor="confirm-password" className="block text-sm font-bold text-gray-700">
                          Confirm password*
                        </label>
                        <div className="relative">
                          <input
                            id="confirm-password"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter password"
                            required
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className={`w-full rounded-md border ${
                              validationErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                            } px-4 py-3 text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            aria-label="Toggle password visibility"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        {validationErrors.confirmPassword && (
                          <p className="text-xs text-red-600 mt-1">{validationErrors.confirmPassword}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading || !token}
                        className="w-full rounded-full bg-greenook px-4 py-3 font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:opacity-70"
                      >
                        {isLoading ? "Processing..." : "Change Password"}
                      </button>

                      {/* Login Link */}
                      <div className="text-center text-sm text-gray-700">
                        Want to go back?{" "}
                        <Link href="/login" className="font-medium text-emerald-700 hover:text-emerald-800">
                          Login
                        </Link>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Mobile layout
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg shadow-lg">
            {/* Green header section */}
            <div className="bg-greenook p-6 text-center">
              {/* Logo Image */}
              <div className="flex justify-center mb-6">
                <Image
                  src="/img/reset/Group 1171275928.png"
                  alt="Trekking Miles Logo"
                  width={200}
                  height={70}
                  className="object-contain"
                />
              </div>

              <h1 className="text-2xl font-semibold font-nunito text-white">Start your remarkable journey with us!</h1>

              <p className="mt-2 text-sm text-white/90">Seamless Access to Your Travel Business Hub</p>
            </div>

            {/* White form section */}
            <div className="bg-white p-6">
              {isSuccess ? (
                <div className="text-center">
                  <div className="mb-4 text-emerald-600 flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold font-nunito text-gray-900">Password Changed!</h2>
                  <p className="mt-2 text-sm text-gray-600">Your password has been successfully updated.</p>
                  <p className="mt-4 text-xs text-gray-500">Redirecting to login page...</p>
                </div>
              ) : (
                <>
                  <h2 className="mb-6 text-xl font-semibold font-nunito text-center">Change your password</h2>

                  {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-xs text-red-600">{error}</div>}

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* New Password Field */}
                    <div>
                      <label htmlFor="new-password-mobile" className="block text-sm font-bold text-gray-700 mb-1">
                        New password*
                      </label>
                      <div className="relative">
                        <input
                          id="new-password-mobile"
                          name="newPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          required
                          value={newPassword}
                          onChange={handlePasswordChange}
                          className={`w-full rounded-md border ${
                            validationErrors.newPassword ? "border-red-500" : "border-gray-300"
                          } px-3 py-2 text-gray-900 focus:border-emerald-600 focus:outline-none`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {validationErrors.newPassword && (
                        <p className="text-xs text-red-600 mt-1">{validationErrors.newPassword}</p>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        Password must include uppercase, lowercase, number, and special character.
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label htmlFor="confirm-password-mobile" className="block text-sm font-bold text-gray-700 mb-1">
                        Confirm password*
                      </label>
                      <div className="relative">
                        <input
                          id="confirm-password-mobile"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-enter password"
                          required
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          className={`w-full rounded-md border ${
                            validationErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                          } px-3 py-2 text-gray-900 focus:border-emerald-600 focus:outline-none`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          aria-label="Toggle password visibility"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {validationErrors.confirmPassword && (
                        <p className="text-xs text-red-600 mt-1">{validationErrors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading || !token}
                      className="w-full rounded-full bg-greenook px-4 py-2 font-medium text-white disabled:opacity-70"
                    >
                      {isLoading ? "Processing..." : "Change Password"}
                    </button>

                    {/* Login Link */}
                    <div className="text-center text-sm text-gray-700 mt-4">
                      Want to go back?{" "}
                      <Link href="/login" className="font-medium text-emerald-700">
                        Login
                      </Link>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
