"use client"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Info, X, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  const [isMobile, setIsMobile] = useState(false)

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
    <div className="relative w-full overflow-hidden py-6 px-4 sm:px-6 lg:px-8 bg-custom-green z-[10] min-h-screen bg-custom-green flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 -z-[10]">
        <Image
          src="/img/login/Group 1171275952 (1).svg"
          alt=""
          fill
          className="object-cover opacity-100"
          priority
        />
      </div>

      {/* Dynamic Back/Close Button */}
      {isMobile ? (
        <Link
          href="/"
          className="absolute  top-8 right-6 bg-emerald-800 rounded-full p-2 border-2 border-white z-50 cursor-pointer hover:bg-emerald-700 transition-colors"
        >
          <X className="h-5 w-5 text-white " />
        </Link>
      ) : (
        <Link
          href="/"
          className="absolute top-5 left-5 bg-emerald-800 rounded-full p-2 border-2 border-white z-50 cursor-pointer hover:bg-emerald-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-white rotate-[-320deg]" />
        </Link>
      )}

      {/* Main container - responsive sizing */}
      <div className={`w-full ${isMobile ? 'max-w-md' : 'max-w-5xl'} flex flex-col lg:flex-row overflow-hidden rounded-lg shadow-lg`}>
        {/* Left section - Green background */}
        <div className={`relative bg-greenook text-white ${isMobile ? 'p-6' : 'lg:w-5/12 p-6 lg:p-8'} flex flex-col`}>
          <div className="relative z-10">
            <div className="mb-6">
              <div className="flex items-center mb-1">
                <Image
                  src="/img/login/cropped-logo-1_1567c4bc-84c5-4188-81e0-d5dd9ed8ef8d (1) 1.svg"
                  alt="Trekking Miles Logo"
                  width={isMobile ? 120 : 140}
                  height={isMobile ? 60 : 80}
                  className={isMobile ? "w-40" : "w-56"}
                />
              </div>
              <div className="text-xs text-white/80 font-nunito">a sustainable tourism initiative</div>
            </div>
            <div className="mt-auto">
              <h1 className={`${isMobile ? 'text-xl' : 'text-2xl lg:text-3xl'} font-bold mb-2 font-poppins`}>
                Start your remarkable journey with us!
              </h1>
              <p className="text-sm opacity-90 font-poppins">Seamless Access to Your Travel Business Hub</p>
            </div>
          </div>

          {/* Background dot pattern */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/img/login/Group 1171275949.svg"
              alt="Decorative background"
              fill
              className="object-cover opacity-100"
              priority
            />
          </div>
        </div>

        {/* Right section - Form */}
        <div className={`bg-white ${isMobile ? 'p-6' : 'lg:w-7/12 p-6 lg:p-8'} flex items-center justify-center`}>
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2 font-poppins`}>Sign up with free trail</h2>
              <p className="text-gray-600 text-sm font-poppins">Empower your experience, sign up for a free account today</p>
            </div>

            <form className="space-y-4">
              {/* Form fields remain the same but with responsive spacing */}
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium font-poppins">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  placeholder="Johan Smith"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="block text-sm font-medium flex items-center font-poppins">
                  Phone number<span className="text-red-500">*</span>
                  <span className="ml-1 text-gray-400">
                    <Info className="h-4 w-4" />
                  </span>
                </label>
                <div className="flex">
                  <div className="relative">
                    <select className="h-10 rounded-l-md border border-r-0 border-gray-300 bg-white px-3 py-2 text-sm appearance-none pr-8 font-poppins">
                      <option>+91</option>
                      
                    </select>
                    <ChevronDown className="h-4 w-4 absolute right-2 top-3 pointer-events-none text-gray-500" />
                  </div>
                  <input
                    id="phone"
                    placeholder="Enter phone number"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-emerald-800 h-10 "
                  />
                  <div className="ml-2 flex items-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M16.6663 5L7.49967 14.1667L3.33301 10"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium font-poppins">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="ex. email@domain.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="company" className="block text-sm font-medium font-poppins">
                  Company Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="company"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="business-type" className="block text-sm font-medium font-poppins">
                  Business Type<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="business-type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-800 font-poppins"
                  >
                    <option>AGENCY</option>
                    <option>DMSC</option>
                  </select>
                  <ChevronDown className="h-4 w-4 absolute right-3 top-3 pointer-events-none text-gray-500" />
                </div>
              </div>

              <div className="text-xs text-gray-600 font-poppins">
                By registering for an account, you are consenting to our{" "}
                <Link href="#" className="text-greenook font-medium font-poppins">
                  Terms of Service
                </Link>{" "}
                and confirming that you have reviewed and accepted the{" "}
                <Link href="#" className="text-greenook font-medium">
                  Global Privacy Statement
                </Link>
                .
              </div>

              <Button 
                  type="submit" 
                  className="w-full rounded-full bg-greenook px-4 py-2 h-10 font-medium text-white hover:bg-greenook focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 font-poppins transition-colors"
                >
                  Get Started Free
                </Button>

              <div className="text-center text-sm font-poppins">
                Already have an account?{" "}
                <Link href="/login" className="text-greenook font-medium">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}