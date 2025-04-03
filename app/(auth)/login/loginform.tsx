"use client"

import Image from "next/image"
import Link from "next/link"
import { Eye, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function LoginForm() {
  const [isMobile, setIsMobile] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
    <div className="relative w-full overflow-hidden py-6 px-4 sm:px-6 lg:px-8 bg-emerald-900 z-[10]">
  
      <div className="absoloute inset-0 -z-[10] ">
        <Image
          src="/img/login/Group 1171275929.svg"
          alt=""
          fill
          className="object-cover opacity-100"
          priority
        />
      </div>

 
      {!isMobile && (
        <a
          href="/"
          className="absolute top-5 left-5 bg-emerald-700 rounded-full p-2 border-2 border-white z-50 cursor-pointer hover:bg-emerald-800 transition-colors"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-[-270deg]"
          >
            <path
              d="M14 8L8 14M8 14V9M8 14H13"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
      
      {isMobile && (
        <a
          href="/"
          className="absolute top-5 right-5 bg-emerald-700 rounded-full p-2 border-2 border-white z-50 cursor-pointer hover:bg-emerald-800 transition-colors"
        >
          <X className="h-5 w-5 text-white" />
        </a>
      )}

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-8 ">
        {!isMobile ? (
      
          <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-lg shadow-lg md:flex-row">
     
          <div className="relative w-full bg-emerald-700 p-8 md:p-10 md:w-1/2">
         
            <div className="absolute -left-8 -bottom-6 z-0">
              <Image
                src="/img/login/Group 1171275832.svg" 
                alt="Decorative dot pattern"
                width={200}
                height={200}
                className="opacity-80"
              />
            </div>
            <div className="absolute -right-10 -top-2 z-0">
              <Image
                src="/img/login/Group 1171275833.svg" 
                alt="Decorative dot pattern"
                width={100}
                height={100}
                className="opacity-80"
              />
           
            </div>
            
          
            <div className="absolute inset-0 bg-emerald-700/70"></div>
            
            <div className="relative z-10">
             
              <div className="flex items-center justify-center md:justify-start">
                <Image
                  src="/img/login/cropped-logo-1_1567c4bc-84c5-4188-81e0-d5dd9ed8ef8d (1) 1.svg"
                  alt="Trekking Miles Logo"
                  width={300}
                  height={80}
                  className="object-contain"
                />
              </div>
        

                <h1 className="mt-8 md:mt-12 lg-mt-[-30] text-3xl font-nunito md:text-4xl  font-semibold text-white text-center md:text-left">
                  Start your remarkable journey with us!
                </h1>

                <p className="mt-4 md:mt-6 text-base md:text-lg text-white/90 text-center md:text-left font-poppins font-normal">
                  Seamless Access to Your Travel Business Hub
                </p>
              </div>
            </div>

          
            <div className="relative w-full bg-white p-6 md:p-8 lg:p-12 md:w-1/2 z-30">
              <div className="mx-auto max-w-md">
           <h2 className="mb-6 md:mb-8 md:text-lg lg:text-4xl font-nunito font-bold text-gray-900 text-center">
  Welcome Back <span className="inline-block">👋</span>
</h2>




                <form className="space-y-5 md:space-y-6">
                
                  <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
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

                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                      Password*
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label="Toggle password visibility"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                
                  <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                 
                  <div className="flex items-start">
                    <input
                      id="marketing-opt-out"
                      name="marketing-opt-out"
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                    />
                    <label htmlFor="marketing-opt-out" className="ml-2 block text-sm text-gray-700">
                      Please exclude me from any future emails regarding Trekking Miles and related feature updates,
                      marketing best practices, and promotions.
                    </label>
                  </div>

              
                  <button
                    type="submit"
                    className="w-full rounded-full bg-emerald-700 px-4 py-3 font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition-colors"
                  >
                    Login
                  </button>

           
                  <div className="text-center text-sm text-gray-700">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-medium text-emerald-700 hover:text-emerald-800">
                      Signup
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          // Mobile layout
          <div className="w-full max-w-md">
            
            {/* Green header section */}
            <div className="bg-emerald-700 p-6 rounded-t-lg relative overflow-hidden z-20">
              <div className="relative z-30">
                {/* Logo Image */}
                <div className="flex justify-center mb-4">
                  <Image
                    src="/img/login/cropped-logo-1_1567c4bc-84c5-4188-81e0-d5dd9ed8ef8d (1) 1.svg"
                    alt="Trekking Miles Logo"
                    width={180}
                    height={60}
                    className="object-contain"
                    priority
                  />
                </div>

                <h1 className="text-xl font-semibold text-white text-center font-nunito ">Start your remarkable journey with us!</h1>

                <p className="mt-2 text-sm text-white/90 text-center font-normal font-poppins">Seamless Access to Your Travel Business Hub</p>
              </div>
            </div>

            {/* White form section */}
            <div className="bg-white p-6 rounded-b-lg z-30">
              <h2 className="mb-4 text-xl font-bold text-center lg:text-4xl font-nunito">
                Welcome Back <span className="inline-block">👋</span>
              </h2>

              <form className="space-y-4">
                {/* Username Field */}
                <div>
                  <label htmlFor="username-mobile" className="block text-sm  text-gray-700 mb-1 font-semibold">
                    Username*
                  </label>
                  <input
                    id="username-mobile"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password-mobile" className="block text-sm text-gray-700 mb-1 font-semibold">
                    Password*
                  </label>
                  <div className="relative">
                    <input
                      id="password-mobile"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label="Toggle password visibility"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me-mobile"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                    />
                    <label htmlFor="remember-me-mobile" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Marketing Opt-Out */}
                <div className="flex items-start">
                  <input
                    id="marketing-opt-out-mobile"
                    name="marketing-opt-out"
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                  />
                  <label htmlFor="marketing-opt-out-mobile" className="ml-2 block text-xs text-gray-700">
                    Please exclude me from any future emails regarding Trekking Miles and related feature updates,
                    marketing best practices, and promotions.
                  </label>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="w-full rounded-full bg-emerald-700 px-4 py-2 font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition-colors"
                >
                  Login
                </button>

                {/* Signup Link */}
                <div className="text-center text-sm text-gray-700 mt-4">
                  Don't have an account?{" "}
                  <Link 
                    href="/signup" 
                    className="font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    Signup
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