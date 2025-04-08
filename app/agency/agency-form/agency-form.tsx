"use client"

import { useState, type ChangeEvent } from "react"
import Image from "next/image"
import { HexColorPicker } from "react-colorful"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AgencyForm() {
  const [color, setColor] = useState("#4ECDC4")
  const [tempColor, setTempColor] = useState("#4ECDC4")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [licenseFile, setLicenseFile] = useState<File | null>(null)
  const [logoLoading, setLogoLoading] = useState(false)
  const [licenseLoading, setLicenseLoading] = useState(false)
  const [logoUploaded, setLogoUploaded] = useState(false)
  const [licenseUploaded, setLicenseUploaded] = useState(false)

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.target.files?.[0] || null
    if (file) {
      if (file.size <= 3 * 1024 * 1024) {
        setLogoLoading(true)
        setLogoUploaded(false)
        // Simulate upload process
        setTimeout(() => {
          setLogoFile(file)
          setLogoLoading(false)
          setLogoUploaded(true)
        }, 1000)
      } else {
        alert("File size exceeds 3MB limit")
      }
    }
  }

  const handleLicenseUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.target.files?.[0] || null
    if (file) {
      if (file.size <= 3 * 1024 * 1024) {
        setLicenseLoading(true)
        setLicenseUploaded(false)
        // Simulate upload process
        setTimeout(() => {
          setLicenseFile(file)
          setLicenseLoading(false)
          setLicenseUploaded(true)
        }, 1000)
      } else {
        alert("File size exceeds 3MB limit")
      }
    }
  }

  return (
    <div className="relative w-full overflow-hidden py-6 px-4 sm:px-6 lg:px-8 bg-custom-green z-[10] min-h-screen bg-custom-green flex items-center justify-center p-4 h-auto">
      {/* Logo positioned absolutely on the left */}
      <div className="absolute top-6 left-6 z-20">
        <Image
          src="/img/login/cropped-logo-1_1567c4bc-84c5-4188-81e0-d5dd9ed8ef8d (1) 1.svg"
          alt="Company Logo"
          width={180}
          height={40}
          className="w-[180px] h-auto"
        />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 -z-[10]">
        <Image src="/background/Other details  -bg2.png" alt="" fill className="object-cover opacity-100" priority />
      </div>

      <div className="relative w-full max-w-4xl mt-20 mb-6">
        <div className="bg-white rounded-lg shadow-xl overflow-y-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              // Handle form submission here
              console.log("Form submitted")
              // You can add form validation and submission logic here
            }}
          >
            <div className="p-6 md:p-8">
              <h1 className="text-4xl lg:text-4xl font-normal text-center mb-8 font-nunito">
                Tell Us About Your Business
              </h1>

              <div className="space-y-8">
                {/* Basic Informations Section */}
                <div>
                  <h2 className="text-2xl  mb-6 text-greyish font-poppins ">Basic Informations</h2>
                  <div className="grid md:grid-cols-2 gap-4 ">
                    <div>
                      <Label htmlFor="contact-person font-poppins">Primary contact person*</Label>
                      <Input
                        id="contact-person"
                        placeholder="John Smith"
                        className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="agency-type font-poppins">Agency type*</Label>
                      <Select>
                        <SelectTrigger className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white">
                          <SelectValue placeholder="Private Limited" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private font-poppins">Private Limited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="designation font-poppins">Designation*</Label>
                      <Input
                        id="designation"
                        placeholder="Designation"
                        className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone font-poppins">Phone number*</Label>
                      <div className="flex">
                        <Select defaultValue="+91">
                          <SelectTrigger className="w-20 h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white">
                            <SelectValue placeholder="+91" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+91">+91</SelectItem>
                            <SelectItem value="+1">+1</SelectItem>
                            <SelectItem value="+44">+44</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          id="phone"
                          placeholder="Enter phone number"
                          className="flex-1 ml-2 h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="  text-greyish text-2xl  mb-6 font-poppins ">Company Details</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="owner-name">Owner name*</Label>
                      <Input
                        id="owner-name"
                        placeholder="Johan Smith"
                        className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email font-poppins">Email*</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ex: email@domain.com"
                        className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company-phone font-poppins">Phone number*</Label>
                      <div className="flex">
                        <Select defaultValue="+91">
                          <SelectTrigger className="w-20 h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white">
                            <SelectValue placeholder="+91" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+91">+91</SelectItem>
                            <SelectItem value="+1">+1</SelectItem>
                            <SelectItem value="+44">+44</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          id="company-phone"
                          placeholder="Enter phone number"
                          className="flex-1 ml-2 h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="website font-poppins">Website*</Label>
                      <Input
                        id="website"
                        placeholder="Website URL"
                        className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="logo font-poppins">Logo*</Label>
                      <div className="mt-1 flex items-center relative">
                        <div className="bg-white rounded-l-md border border-gray-300 border-r-0 flex-grow h-12 flex items-center px-3 text-sm">
                          {logoFile
                            ? `${logoFile.name.substring(0, 15)}${logoFile.name.length > 15 ? "..." : ""}`
                            : "No file selected"}
                        </div>
                        <div className="flex">
                          <Button
                            onClick={(e) => {
                              e.preventDefault()
                              const input = document.getElementById("logo-upload") as HTMLInputElement
                              if (input && !logoLoading) {
                                input.value = ""
                                input.click()
                              }
                            }}
                            className="h-12 rounded-l-none bg-greenlight hover:bg-greenlight text-white border border-emerald-500 focus:ring-0 font-poppins"
                            type="button"
                            disabled={logoLoading}
                          >
                            {logoLoading ? "Uploading..." : "Upload"}
                          </Button>
                          <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                      {logoLoading && <p className="text-xs text-amber-600 mt-1">Uploading file...</p>}
                      {logoUploaded && !logoLoading && (
                        <p className="text-xs text-green-600 mt-1">File uploaded successfully!</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">File size should be under 3MB</p>
                    </div>
                    <div>
                      <div>
                        <Label>Landing page skin</Label>
                        <div className="mt-1 relative">
                          <div
                            className="w-8 h-8 rounded cursor-pointer border"
                            style={{ backgroundColor: color }}
                            data-testid="color-picker-button"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                          />

                          {showColorPicker && (
                            <div
                              className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4"
                              onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                  setShowColorPicker(false)
                                  setTempColor(color)
                                }
                              }}
                            >
                              <div
                                className="bg-white rounded-lg shadow-lg max-w-xs w-full p-4 z-50"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <h3 className="font-medium mb-3">Choose Landing Page Color</h3>

                                <div className="w-full h-16 rounded mb-4" style={{ backgroundColor: tempColor }} />

                                <div className="mb-4">
                                  <HexColorPicker color={tempColor} onChange={setTempColor} className="w-full" />
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                  <div className="text-sm w-10">RGB</div>
                                  <Input
                                    value={tempColor}
                                    onChange={(e) => setTempColor(e.target.value)}
                                    className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white text-xs"
                                  />
                                  <div className="text-xs">100%</div>
                                </div>

                                <div className="flex gap-2 justify-end">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setShowColorPicker(false)
                                      setTempColor(color)
                                    }}
                                    className="h-10 border border-gray-300 focus:ring-0 font-poppins"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      setColor(tempColor)
                                      setShowColorPicker(false)
                                    }}
                                    className="bg-greenook hover:bg-bg-greenook h-10 focus:ring-0 font-poppins"
                                  >
                                    Apply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 font-poppins">
                  <div>
                    <Label>GST Registration*</Label>
                    <RadioGroup defaultValue="yes" className="flex gap-4 mt-1" name="gst-registration">
                      <div className="flex items-center space-x-2 h-12">
                        <RadioGroupItem value="yes" id="gst-yes" className="focus:ring-0" />
                        <Label htmlFor="gst-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2 h-12">
                        <RadioGroupItem value="no" id="gst-no" className="focus:ring-0" />
                        <Label htmlFor="gst-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 font-poppins">
                  <div>
                    <Label htmlFor="gst-no">GST No.*</Label>
                    <Input
                      id="gst-no"
                      placeholder="GST Number"
                      className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="year-reg">Year of Registration *</Label>
                    <Input
                      id="year-reg"
                      placeholder="Year of Registration"
                      className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pan-no">PAN No.*</Label>
                    <Input
                      id="pan-no"
                      placeholder="PAN Number"
                      className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white font-poppins"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pan-type">PAN Type*</Label>
                    <Select>
                      <SelectTrigger className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white font-poppins">
                        <SelectValue placeholder="Company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="headquarters">Headquarters*</Label>
                    <Input
                      id="headquarters"
                      placeholder="Address"
                      className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white font-poppins"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country*</Label>
                    <Select>
                      <SelectTrigger className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white font-poppins">
                        <SelectValue placeholder="INDIA" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="india">INDIA</SelectItem>
                        <SelectItem value="usa">USA</SelectItem>
                        <SelectItem value="uk">UK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="years-operation">Years of operation*</Label>
                    <Input
                      id="years-operation"
                      placeholder="Years of operation"
                      className="h-12 border border-gray-300 focus:border-gray-400 focus:ring-0 focus:bg-white font-poppins"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="license">Business License / Registration Certificate*</Label>
                    <div className="mt-1 flex items-center relative">
                      <div className="bg-white rounded-l-md border border-gray-300 border-r-0 flex-grow h-12 flex items-center px-3 text-sm font-poppins">
                        {licenseFile
                          ? `${licenseFile.name.substring(0, 15)}${licenseFile.name.length > 15 ? "..." : ""}`
                          : "No file selected"}
                      </div>
                      <div className="flex">
                        <Button
                          onClick={(e) => {
                            e.preventDefault()
                            const input = document.getElementById("license-upload") as HTMLInputElement
                            if (input && !licenseLoading) {
                              input.value = ""
                              input.click()
                            }
                          }}
                          className="h-12 rounded-l-none bg-greenlight hover:bg-greenlight text-white border border-emerald-500 focus:ring-0 font-poppins"
                          type="button"
                          disabled={licenseLoading}
                        >
                          {licenseLoading ? "Uploading..." : "Upload"}
                        </Button>
                        <input
                          id="license-upload"
                          type="file"
                          accept=".pdf,.doc,.docx,image/*"
                          className="hidden"
                          onChange={handleLicenseUpload}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                    {licenseLoading && <p className="text-xs text-amber-600 mt-1">Uploading file...</p>}
                    {licenseUploaded && !licenseLoading && (
                      <p className="text-xs text-green-600 mt-1">File uploaded successfully!</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">File size should be under 3MB</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full sm:w-[356px] mx-auto rounded-full bg-greenook px-4 py-3 h-12 font-medium text-white hover:bg-greenook focus:outline-none focus:ring-0 transition-colors flex items-center justify-center font-poppins"
                  >
                    Lets get started
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
