"use client"
import Image from "next/image"

export default function TravelFeatures() {
  return (
    <div className="w-full max-w-7xl mx-auto relative px-6 md:px-10 py-12 md:py-18 -mt-16">
      {/* Background dots pattern */}
      <div className="absolute left-0 top-0 w-64 h-64 opacity-80 m-12 ml-28 hidden md:block">
        <Image src="/background/dots.png" alt="Dots pattern" width={250} height={250} className="object-contain" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 font-nunito leading-9 tracking-normal">
            Smart Features for Effortless Travel
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-poppins font-medium tracking-normal">
            Plan, book, and manage with ease—all in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 p-8 md:p-32 -mt-8 md:-mt-32">
          {/* Card 1 */}
          <div className="lg:col-span-6 rounded-3xl shadow-md overflow-hidden relative w-full sm:w-3/4 md:w-2/3 lg:w-w1 mx-auto">
            <div className="absolute inset-0">
              <Image
                src="/background/feature1.png?height=400&width=600"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 md:p-6 flex flex-col h-36 justify-between relative z-10">
              <div>
                <h3 className="font-poppins font-medium text-xl align-middle mb-2">
                  Connect with partners, compare <br /> prices, and finalize deals.
                </h3>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden relative w-full sm:w-3/4 md:w-2/3 lg:w-64 mx-auto lg:ml-40">
            <div className="absolute inset-0">
              <Image
                src="/background/gradient.png?height=400&width=600"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0"></div>
            <div className="p-6 md:p-8 flex flex-col h-36 justify-center items-center text-center relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-white font-nunito leading-8 sm:leading-9 md:leading-10 text-center align-middle">
                DMC & Supplier Integration
              </h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden relative w-full sm:w-3/4 md:w-2/3 lg:w-64 mx-auto lg:mr-20">
            <div className="absolute inset-0">
              <Image
                src="/background/gradient.png?height=400&width=600"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0"></div>
            <div className="p-6 md:p-8 flex flex-col h-36 justify-center items-center text-center relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-white font-nunito leading-8 sm:leading-9 md:leading-10 text-center align-middle">
                Automated Notifications
              </h3>
            </div>
          </div>

          {/* Card 4 */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden relative w-full sm:w-3/4 md:w-2/3 lg:w-w1 mx-auto lg:-ml-20">
            <div className="absolute inset-0">
              <Image
                src="/background/feature2.png?height=400&width=600"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0"></div>
            <div className="p-6 md:p-8 flex flex-col h-36 justify-between relative z-10">
              <div>
                <h3 className="font-poppins font-medium text-xl sm:text-2xl md:text-xl align-middle text-white mb-2">
                  Get real-time updates on itinerary <br /> status and payments.
                </h3>
              </div>
            </div>
          </div>

          {/* Card 5 - Fixed to match structure of Card 4 */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden relative w-full sm:w-3/4 md:w-2/3 lg:w-w1 mx-auto">
            <div className="absolute inset-0 lg:-mt-4 sm:-mt-8">
              <Image
                src="/background/feature3.png?height=400&width=600"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0"></div>
            <div className="p-6 md:p-8 flex flex-col h-36 justify-between relative z-10">
              <div>
                <h3 className="font-poppins font-medium text-xl sm:text-2xl md:text-xl align-middle text-white mb-2">
                  Accept global payments with real-time <br /> exchange rates.
                </h3>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden relative w-full sm:w-3/4 md:w-2/3 lg:w-64 mx-auto lg:ml-40">
            <div className="absolute inset-0">
              <Image
                src="/background/gradient.png?height=400&width=600"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0"></div>
            <div className="p-6 md:p-8 flex flex-col h-36 justify-center items-center text-center relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-white font-nunito leading-8 sm:leading-9 md:leading-10 text-center align-middle">
                Forex Support
              </h3>
            </div>
          </div>

          {/* Card 7 */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden relative w-full sm:w-3/4 md:w-2/3 lg:w-64 mx-auto lg:mr-40">
            <div className="absolute inset-0">
              <Image
                src="/background/gradient.png?height=400&width=600"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0"></div>
            <div className="p-6 md:p-8 flex flex-col h-36 justify-center items-center text-center relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-white font-nunito leading-8 sm:leading-9 md:leading-10 text-center align-middle">
                24/7 Support & Assistance
              </h3>
            </div>
          </div>

          {/* Card 8 - Fixed to match structure of Card 1 */}
          <div className="lg:col-span-6 rounded-3xl shadow-md overflow-hidden relative w-full lg:w-w1 lg:-ml-40">
            <div className="absolute inset-0 lg:w-w2 lg:-ml-5">
              <Image
                src="/background/feature4.png?height=400&width=600"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col h-36 justify-between relative z-10">
              <div>
                <h3 className="font-poppins font-medium text-lg sm:text-xl md:text-xl align-middle mb-2">
                  Dedicated help for seamless <br /> operations.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

