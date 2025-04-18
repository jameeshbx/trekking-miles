"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  ChevronDown,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  CalendarIcon,
  Eye,
  Edit,
  Trash2,
  Circle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Subscription } from "@/app/data/subscriptions"

interface SubscriptionTableProps {
  subscriptions: Subscription[]
}

export function SubscriptionTable({ subscriptions }: SubscriptionTableProps) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>(subscriptions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPaymentStatuses, setSelectedPaymentStatuses] = useState<Record<string, boolean>>({
    Paid: true,
    Pending: true,
    Failed: true,
    "Not Required": true,
  })
  const [showPaymentStatusFilter, setShowPaymentStatusFilter] = useState(false)
  const [showPlanFilter, setShowPlanFilter] = useState(false)
  const [selectedPlans, setSelectedPlans] = useState<Record<string, boolean>>({
    Business: true,
    Basic: true,
    "Business (Free Trial)": true,
  })
  const [selectAll, setSelectAll] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({})
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date("2025-03-28"),
    to: new Date("2025-04-10"),
  })
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [sortBy, setSortBy] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [showDownloadOptions, setShowDownloadOptions] = useState(false)

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredSubscriptions.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage)

  // Filter subscriptions based on search term, status filters, and date range
  useEffect(() => {
    const filtered = subscriptions.filter((subscription) => {
      const matchesSearch =
        subscription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscription.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscription.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscription.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscription.agencyName.toLowerCase().includes(searchTerm.toLowerCase())

      const paymentStatusSelected = selectedPaymentStatuses[subscription.paymentStatus] || false
      const planSelected = selectedPlans[subscription.plan] || false

      // Date range filter
      let matchesDateRange = true
      if (dateRange.from && dateRange.to && subscription.requestDate) {
        const requestDate = new Date(subscription.requestDate)
        matchesDateRange = requestDate >= dateRange.from && requestDate <= dateRange.to
      }

      return matchesSearch && paymentStatusSelected && planSelected && matchesDateRange
    })

    // Apply sorting
    const sortedSubscriptions = [...filtered].sort((a, b) => {
      let comparison = 0

      if (sortBy === "date") {
        if (a.requestDate && b.requestDate) {
          comparison = new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime()
        }
      } else if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

    setFilteredSubscriptions(sortedSubscriptions)
    setCurrentPage(1)
  }, [searchTerm, selectedPaymentStatuses, selectedPlans, dateRange, sortBy, sortDirection, subscriptions])

  // Handle pagination
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      let startPage = Math.max(2, currentPage - Math.floor((maxVisiblePages - 2) / 2))
      let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3)

      if (currentPage <= 2) {
        endPage = Math.min(totalPages - 1, maxVisiblePages - 1)
      }

      if (currentPage >= totalPages - 1) {
        startPage = Math.max(2, totalPages - (maxVisiblePages - 1))
      }

      if (startPage > 2) {
        pages.push("ellipsis-start")
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end")
      }

      pages.push(totalPages)
    }

    return pages
  }

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    const newSelectedItems: Record<string, boolean> = {}
    currentItems.forEach((item) => {
      newSelectedItems[item.id] = checked
    })
    setSelectedItems(newSelectedItems)
  }

  // Handle individual item selection
  const handleSelectItem = (id: string, checked: boolean) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: checked,
    }))
    const allSelected = currentItems.every((item) => selectedItems[item.id] === true || (item.id === id && checked))
    setSelectAll(allSelected)
  }

  // Handle sort change
  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("asc")
    }
  }

  // Format date range for display
  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      try {
        return `${format(dateRange.from, "dd MMM")} - ${format(dateRange.to, "dd MMM")}`
      } catch {
        return "Select dates"
      }
    }
    return "Select dates"
  }

  // Navigate to detail page
  const navigateToDetail = (id: string) => {
    router.push(`/subscription/${id}`)
  }

  return (
    <>
      {/* Search and Filters */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-input"
              placeholder="Search for..."
              className="pl-8 w-full h-10 border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative inline-block w-full sm:w-auto">
            <Button
              variant="outline"
              className="bg-greenlight text-white hover:bg-green-700 border-0 h-10 flex sm:w-auto items-center gap-1 w-full justify-between"
              onClick={() => setShowPaymentStatusFilter(!showPaymentStatusFilter)}
            >
              <div className="flex items-center gap-1">
                <Filter className="h-4 w-4 font-Nunito" />
                <span>Payment Status</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
            {showPaymentStatusFilter && (
              <div className="absolute z-10 mt-1 w-full sm:w-[200px] bg-white border border-gray-200 rounded-md shadow-lg">
                <div className="p-2 border-b border-gray-200">
                  <div className="text-sm text-gray-500">Filter Status</div>
                </div>
                <div className="p-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="paid"
                      checked={selectedPaymentStatuses.Paid}
                      onChange={(e: { target: { checked: any } }) => setSelectedPaymentStatuses((prev) => ({ ...prev, Paid: e.target.checked }))}
                    />
                    <label htmlFor="paid" className="text-sm">
                      Paid
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="pending"
                      checked={selectedPaymentStatuses.Pending}
                      onChange={(e: { target: { checked: any } }) => setSelectedPaymentStatuses((prev) => ({ ...prev, Pending: e.target.checked }))}
                    />
                    <label htmlFor="pending" className="text-sm">
                      Pending
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="failed"
                      checked={selectedPaymentStatuses.Failed}
                      onChange={(e: { target: { checked: any } }) => setSelectedPaymentStatuses((prev) => ({ ...prev, Failed: e.target.checked }))}
                    />
                    <label htmlFor="failed" className="text-sm">
                      Failed
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="not-required"
                      checked={selectedPaymentStatuses["Not Required"]}
                      onChange={(e: { target: { checked: any } }) =>
                        setSelectedPaymentStatuses((prev) => ({ ...prev, "Not Required": e.target.checked }))
                      }
                    />
                    <label htmlFor="not-required" className="text-sm">
                      Not Required
                    </label>
                  </div>
                </div>
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <Button
                    variant="default"
                    className="bg-gradient-to-b from-custom-green to-light-green hover:bg-gradient-to-b from-light-green to-custom-green text-xs h-8"
                    onClick={() => setShowPaymentStatusFilter(false)}
                  >
                    Apply
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-xs h-8"
                    onClick={() => {
                      setSelectedPaymentStatuses({
                        Paid: true,
                        Pending: true,
                        Failed: true,
                        "Not Required": true,
                      })
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="relative inline-block w-full sm:w-auto">
            <Button
              variant="outline"
              className="border-gray-300 h-10 flex sm:w-auto items-center gap-1 w-full justify-between"
              onClick={() => setShowPlanFilter(!showPlanFilter)}
            >
              <span>Plan</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            {showPlanFilter && (
              <div className="absolute z-10 mt-1 w-full sm:w-52 bg-white border border-gray-200 rounded-md shadow-lg">
                <div className="p-2 border-b border-gray-200">
                  <div className="text-sm text-gray-500">Filter Plan</div>
                </div>
                <div className="p-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="business"
                      checked={selectedPlans.Business}
                      onChange={(e: { target: { checked: any } }) => setSelectedPlans((prev) => ({ ...prev, Business: e.target.checked }))}
                    />
                    <label htmlFor="business" className="text-sm">
                      Business
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="basic"
                      checked={selectedPlans.Basic}
                      onChange={(e: { target: { checked: any } }) => setSelectedPlans((prev) => ({ ...prev, Basic: e.target.checked }))}
                    />
                    <label htmlFor="basic" className="text-sm">
                      Basic
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="business-trial"
                      checked={selectedPlans["Business (Free Trial)"]}
                      onChange={(e: { target: { checked: any } }) =>
                        setSelectedPlans((prev) => ({ ...prev, "Business (Free Trial)": e.target.checked }))
                      }
                    />
                    <label htmlFor="business-trial" className="text-sm">
                      Business (Free Trial)
                    </label>
                  </div>
                </div>
                <div className="p-2 border-t border-gray-200 flex justify-between">
                  <Button
                    variant="default"
                    className="bg-gradient-to-b from-custom-green to-light-green hover:bg-gradient-to-b from-light-green to-custom-green text-xs h-8"
                    onClick={() => setShowPlanFilter(false)}
                  >
                    Apply
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-xs h-8"
                    onClick={() => {
                      setSelectedPlans({
                        Business: true,
                        Basic: true,
                        "Business (Free Trial)": true,
                      })
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-10 flex items-center gap-1 border-gray-300 w-full sm:w-auto justify-between sm:justify-start"
              >
                <CalendarIcon className="h-4 w-4" />
                <span className="text-sm">{formatDateRange()}</span>
                <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-gray-200 shadow-lg" align="start">
              <div className="p-3 border-b border-gray-100 bg-gray-50">
                <h3 className="text-sm font-medium">Select Date Range</h3>
              </div>
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={(range) => {
                  if (range?.from) {
                    setDateRange({
                      from: range.from,
                      to: range.to || range.from,
                    })
                    if (range.to) {
                      setCalendarOpen(false)
                    }
                  }
                }}
                numberOfMonths={1}
                className="p-3"
              />
              <div className="flex items-center justify-between p-3 border-t border-gray-100 bg-gray-50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDateRange({
                      from: new Date("2025-03-28"),
                      to: new Date("2025-04-10"),
                    })
                  }}
                >
                  Reset
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => setCalendarOpen(false)}>
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex sm:ml-auto gap-2 justify-center sm:justify-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 flex items-center gap-1 border-gray-300 w-30 sm:w-auto"
                >
                  <span className="text-sm">Sort by</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="p-2 border-b border-gray-100">
                  <p className="text-xs text-gray-500">Sort Options</p>
                </div>
                {[
                  { id: "date", label: "Date" },
                  { id: "name", label: "Name" },
                ].map((option) => (
                  <DropdownMenuItem
                    key={option.id}
                    onClick={() => handleSortChange(option.id)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span>{option.label}</span>
                    {sortBy === option.id && (
                      <span className="text-green-600 font-bold">{sortDirection === "asc" ? "↑" : "↓"}</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={showDownloadOptions} onOpenChange={setShowDownloadOptions}>
              <Button
                variant="outline"
                className="h-10 w-10 p-0 flex items-center justify-center"
                aria-label="Download"
                onClick={() => setShowDownloadOptions(true)}
              >
                <Download className="h-4 w-4" />
              </Button>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Download Options</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setShowDownloadOptions(false)}
                  >
                    Download as CSV
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setShowDownloadOptions(false)}
                  >
                    Download as Excel
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setShowDownloadOptions(false)}
                  >
                    Download as PDF
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Table/Card View (Responsive) */}
      <div className="w-full rounded-lg border border-gray-200">
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="w-full overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-3 text-left" style={{ width: "40px" }}>
                    <Checkbox checked={selectAll} onChange={(e: { target: { checked: boolean } }) => handleSelectAll(e.target.checked)} />
                  </th>
                  <th className="p-3 text-left font-medium text-sm font-Poppins" style={{ width: "8%" }}>
                    Subscription ID
                  </th>
                  <th className="p-3 text-left font-medium text-sm font-Poppins" style={{ width: "10%" }}>
                    Agency/DMC
                  </th>
                  <th className="p-3 text-left font-medium text-sm font-Poppins" style={{ width: "10%" }}>
                    Contact Name
                  </th>
                  <th
                    className="p-3 text-left font-medium text-sm hidden md:table-cell font-Poppins"
                    style={{ width: "8%" }}
                  >
                    Phone no.
                  </th>
                  <th className="p-3 text-left font-medium text-sm font-Poppins" style={{ width: "12%" }}>
                    Email
                  </th>
                  <th className="p-3 text-left font-medium text-sm font-Poppins" style={{ width: "8%" }}>
                    Plan
                  </th>
                  <th className="p-3 text-left font-medium text-sm font-Poppins" style={{ width: "10%" }}>
                    Payment Status
                  </th>
                  <th className="p-3 text-left font-medium text-sm font-Poppins" style={{ width: "12%" }}>
                    Subscription status
                  </th>
                  <th className="p-3 text-left font-medium text-sm font-Poppins" style={{ width: "8%" }}>
                    Trial Status
                  </th>
                  <th className="p-3 text-left font-medium text-sm font-Poppins" style={{ width: "8%" }}>
                    Trial Start date
                  </th>
                  <th className="p-3 text-left" style={{ width: "6%" }}></th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((subscription) => (
                  <tr key={subscription.id} className="border-b border-gray-200 hover:bg-gray-50 font-Poppins">
                    <td className="p-3">
                      <Checkbox
                        checked={selectedItems[subscription.id] || false}
                        onChange={(e: { target: { checked: boolean } }) => handleSelectItem(subscription.id, e.target.checked)}
                      />
                    </td>
                    <td className="p-3 text-sm font-Poppins">{subscription.id}</td>
                    <td className="p-3 text-sm">
                      <div className="truncate" title={subscription.agencyName}>
                        {subscription.agencyName}
                      </div>
                    </td>
                    <td className="p-3 text-sm font-Poppins">
                      <div className="truncate" title={subscription.name}>
                        {subscription.name}
                      </div>
                    </td>
                    <td className="p-3 text-sm hidden md:table-cell font-Poppins">{subscription.phoneNumber}</td>
                    <td className="p-3 text-sm">
                      <div className="truncate font-Poppins" title={subscription.email}>
                        {subscription.email}
                      </div>
                    </td>
                    <td className="p-3 text-sm font-Poppins">
                      <div className="truncate" title={subscription.plan}>
                        {subscription.plan}
                      </div>
                    </td>
                    <td className="p-3 text-sm">
                      <span
                        className={`${getPaymentStatusColor(subscription.paymentStatus)} px-3 py-1 rounded-md text-xs`}
                      >
                        {subscription.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Circle
                          className={`h-2 w-2 ${subscription.subscriptionStatus === "Active" ? "text-green-500" : subscription.subscriptionStatus === "Inactive" ? "text-red-500" : "text-blue-500"}`}
                          fill="currentColor"
                        />
                        <span
                          className={`text-sm px-2 py-1 rounded-md ${getSubscriptionStatusColor(subscription.subscriptionStatus)}`}
                        >
                          {subscription.subscriptionStatus}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{subscription.trialStatus}</td>
                    <td className="p-3 text-sm">{subscription.trialStartDate || "-"}</td>
                    <td className="p-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigateToDetail(subscription.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                          {subscription.dateCaptured && (
                            <DropdownMenuItem className="cursor-default">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              <span>Data captured on: {subscription.dateCaptured}</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                {currentItems.length === 0 && (
                  <tr>
                    <td colSpan={12} className="p-8 text-center text-gray-500">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tablet View */}
        <div className="hidden sm:block md:block lg:hidden overflow-x-auto">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 text-left w-10">
                  <Checkbox checked={selectAll} onChange={(e: { target: { checked: boolean } }) => handleSelectAll(e.target.checked)} />
                </th>
                <th className="p-3 text-left font-medium text-sm font-Poppins">Subscription ID</th>
                <th className="p-3 text-left font-medium text-sm font-Poppins">Agency/DMC</th>
                <th className="p-3 text-left font-medium text-sm font-Poppins">Contact Name</th>
                <th className="p-3 text-left font-medium text-sm font-Poppins">Payment Status</th>
                <th className="p-3 text-left font-medium text-sm font-Poppins">Status</th>
                <th className="p-3 text-left w-10"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((subscription) => (
                <tr key={subscription.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">
                    <Checkbox
                      checked={selectedItems[subscription.id] || false}
                      onChange={(e: { target: { checked: boolean } }) => handleSelectItem(subscription.id, e.target.checked)}
                    />
                  </td>
                  <td className="p-3 text-sm">{subscription.id}</td>
                  <td className="p-3 text-sm">{subscription.agencyName}</td>
                  <td className="p-3 text-sm">{subscription.name}</td>
                  <td className="p-3 text-sm">
                    <span
                      className={`${getPaymentStatusColor(subscription.paymentStatus)} px-3 py-1 rounded-md text-xs`}
                    >
                      {subscription.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Circle
                        className={`h-2 w-2 ${subscription.subscriptionStatus === "Active" ? "text-green-500" : subscription.subscriptionStatus === "Inactive" ? "text-red-500" : "text-blue-500"}`}
                        fill="currentColor"
                      />
                      <span
                        className={`text-sm px-2 py-1 rounded-md ${getSubscriptionStatusColor(subscription.subscriptionStatus)}`}
                      >
                        {subscription.subscriptionStatus}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigateToDetail(subscription.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                        {subscription.dateCaptured && (
                          <DropdownMenuItem className="cursor-default">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            <span>Data captured on: {subscription.dateCaptured}</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden">
          {currentItems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No records found</div>
          ) : (
            <div className="w-full">
              {currentItems.map((subscription) => (
                <div key={subscription.id} className="border-b border-gray-200 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedItems[subscription.id] || false}
                        onChange={(e: { target: { checked: boolean } }) => handleSelectItem(subscription.id, e.target.checked)}
                      />
                      <span className="font-medium text-sm">{subscription.id}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => navigateToDetail(subscription.id)}
                          aria-label="View"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600">
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                        {subscription.dateCaptured && (
                          <DropdownMenuItem className="cursor-default">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            <span>Data captured on: {subscription.dateCaptured}</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Agency/DMC:</span> {subscription.agencyName}
                    </div>
                    <div>
                      <span className="text-gray-500">Name:</span> {subscription.name}
                    </div>
                    <div>
                      <span className="text-gray-500">Payment:</span>{" "}
                      <span
                        className={`${getPaymentStatusColor(subscription.paymentStatus)} px-2 py-0.5 rounded-md text-xs`}
                      >
                        {subscription.paymentStatus}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>{" "}
                      <span className="flex items-center gap-1">
                        <Circle
                          className={`h-2 w-2 ${
                            subscription.subscriptionStatus === "Active"
                              ? "text-green-500"
                              : subscription.subscriptionStatus === "Inactive"
                                ? "text-red-500"
                                : "text-blue-500"
                          }`}
                          fill="currentColor"
                        />
                        <span
                          className={`px-1 py-0.5 rounded-md ${getSubscriptionStatusColor(subscription.subscriptionStatus)}`}
                        >
                          {subscription.subscriptionStatus}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-center sm:justify-end mt-4 gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {getPageNumbers().map((page, index) =>
            typeof page === "string" ? (
              <Button
                key={`ellipsis-${index}`}
                variant="outline"
                size="icon"
                className="h-8 w-8 hidden sm:flex"
                disabled
              >
                ...
              </Button>
            ) : (
              <Button
                key={`page-${page}`}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className={`h-8 w-8 ${currentPage === page ? "bg-green-600 hover:bg-green-700" : ""}`}
                onClick={() => paginate(page)}
                aria-label={currentPage === page ? "Current page" : `Go to page ${page}`}
              >
                {page}
              </Button>
            ),
          )}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )
}

// Helper function to get the color for payment status
function getPaymentStatusColor(status: string): string {
  switch (status) {
    case "Paid":
      return "bg-custom-green text-white"
    case "Pending":
      return "bg-yellow-500 text-white"
    case "Failed":
      return "bg-red-500 text-white"
    case "Not Required":
      return "bg-white text-gray-700"
    default:
      return "bg-gray-500 text-white"
  }
}

// Helper function to get the background color for subscription status
function getSubscriptionStatusColor(status: string): string {
  switch (status) {
    case "Active":
      return "bg-custom-green text-white"
    case "Inactive":
      return "bg-gray-300 text-black"
    case "Trial Active":
      return "bg-custom-green text-white"
    default:
      return ""
  }
}
