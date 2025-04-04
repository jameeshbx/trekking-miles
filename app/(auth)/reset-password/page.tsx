"use client"

import Image from "next/image"
import Link from "next/link"
import { Eye } from "lucide-react"
import { useState, useEffect } from "react"

export default function ResetPasswordForm() {
  const [isMobile, setIsMobile] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

  return (
    <div className="relative w-full overflow-hidden py-6 px-4 sm:px-6 lg:px-8 bg-custom-green z-[1]">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/img/reset/Group 1171275935.png"
          alt=""
          fill
          className="object-cover opacity-100"
          priority
        />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        {!isMobile ? (
          // Desktop layout
          <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-lg shadow-lg md:flex-row">
            {/* Left Column - Green Background with overlay dots */}
            <div className="relative w-full bg-greenook p-8 md:p-10 md:w-1/2">
              {/* Round dot overlays */}
              <div className="absolute -left-8 -bottom-6 z-0">
                <Image
                  src="/img/reset/Group 1171275832.png" // Update with your actual dot image path
                  alt="Decorative dot pattern"
                  width={200}
                  height={200}
                  className="opacity-80"
                />
              </div>
              <div className="absolute -right-10 -top-2 z-0">
                <Image
                  src="/img/reset/Group 1171275833.png" // Update with your actual dot image path
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
                <h2 className="mb-6 md:mb-8 text-2xl font-semibold font-nunito text-gray-900 text-center">
                  Change your password
                </h2>

                <form className="space-y-5 md:space-y-6">
                  {/* Username Field */}
                  <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-bold text-gray-700">
                      Username*
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Enter username"
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  {/* New Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="block text-sm font-bold text-gray-700">
                      New password*
                    </label>
                    <div className="relative">
                      <input
                        id="new-password"
                        name="new-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        aria-label="Toggle password visibility"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
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
                        name="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        aria-label="Toggle password visibility"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full rounded-full bg-greenook px-4 py-3 font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                  >
                    Change
                  </button>

                  {/* Login Link */}
                  <div className="text-center text-sm text-gray-700">
                    Want to go back?{" "}
                    <Link href="/login" className="font-medium text-emerald-700 hover:text-emerald-800">
                      Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          // Mobile layout remains the same
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
              <h2 className="mb-6 text-xl font-semibold font-nunito text-center">
                Change your password
              </h2>

              <form className="space-y-4">
                {/* Username Field */}
                <div>
                  <label htmlFor="username-mobile" className="block text-sm font-bold text-gray-700 mb-1">
                    Username*
                  </label>
                  <input
                    id="username-mobile"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                {/* New Password Field */}
                <div>
                  <label htmlFor="new-password-mobile" className="block text-sm font-bold text-gray-700 mb-1">
                    New password*
                  </label>
                  <div className="relative">
                    <input
                      id="new-password-mobile"
                      name="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      aria-label="Toggle password visibility"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
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
                      name="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      aria-label="Toggle password visibility"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full rounded-full bg-greenook px-4 py-2 font-medium text-white">
                  Change
                </button>

                {/* Login Link */}
                <div className="text-center text-sm text-gray-700 mt-4">
                  Want to go back?{" "}
                  <Link href="/login" className="font-medium text-emerald-700">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}