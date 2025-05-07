// Countries data
export const countries = [
    { name: "India", code: "IN" },
    { name: "United States", code: "US" },
    { name: "United Kingdom", code: "GB" },
    { name: "Australia", code: "AU" },
    { name: "Canada", code: "CA" },
    { name: "Germany", code: "DE" },
    { name: "France", code: "FR" },
    { name: "Japan", code: "JP" },
    { name: "Singapore", code: "SG" },
    { name: "United Arab Emirates", code: "AE" },
  ]
  
  // Cities data
  export const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Goa",
    "New York",
    "London",
    "Paris",
    "Tokyo",
    "Sydney",
    "Dubai",
    "Singapore",
    "Berlin",
    "Toronto",
    "Barcelona",
  ]
  
  // Destinations data
  export const destinations = [
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Africa",
    "Australia",
    "Middle East",
    "Southeast Asia",
    "Caribbean",
    "Mediterranean",
    "Scandinavia",
    "Eastern Europe",
    "Western Europe",
    "South Pacific",
    "Indian Subcontinent",
  ]
  
  // DMC data
  export interface DMC {
    id: string
    name: string
    contact: string
    phone: string
    designation: string
    email: string
    status: "Active" | "Inactive"
    logo?: string
    joinSource?: string
  }
  
  export const dmcData: DMC[] = [
    {
      id: "dmc-001",
      name: "EuroVista Travels",
      contact: "Euro",
      phone: "+1-678-901-2345",
      designation: "Manager",
      email: "euro@example.com",
      status: "Active",
      logo: "https://flagcdn.com/w20/eu.png",
      joinSource: "Manually entered",
    },
    {
      id: "dmc-002",
      name: "BlueSky DMC Europe",
      contact: "BlueSky",
      phone: "+1-678-901-2345",
      designation: "Staff",
      email: "bluesky@example.com",
      status: "Active",
      logo: "https://flagcdn.com/w20/eu.png",
      joinSource: "Self registered",
    },
    {
      id: "dmc-003",
      name: "Asian Horizons",
      contact: "John Smith",
      phone: "+91-987-654-3210",
      designation: "Director",
      email: "john@asianhorizons.com",
      status: "Active",
      logo: "https://flagcdn.com/w20/in.png",
      joinSource: "Self registered",
    },
    {
      id: "dmc-004",
      name: "Global Voyagers",
      contact: "Sarah Johnson",
      phone: "+44-123-456-7890",
      designation: "CEO",
      email: "sarah@globalvoyagers.com",
      status: "Inactive",
      logo: "https://flagcdn.com/w20/gb.png",
      joinSource: "Manually entered",
    },
    {
      id: "dmc-005",
      name: "Sunshine Travels",
      contact: "Michael Brown",
      phone: "+61-234-567-8901",
      designation: "Operations Manager",
      email: "michael@sunshinetravels.com",
      status: "Active",
      logo: "https://flagcdn.com/w20/au.png",
      joinSource: "Self registered",
    },
  ]
  