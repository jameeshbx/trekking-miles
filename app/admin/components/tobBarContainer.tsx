"use client"

import { usePathname } from "next/navigation"
import { TopBar } from "./adminTopBar"
import { getNavigationData } from "@/app/data/navigation"

export function TopBarContainer() {
  const pathname = usePathname()
  const { breadcrumbs, title, subtitle } = getNavigationData(pathname)

  return <TopBar breadcrumbs={breadcrumbs} title={title} subtitle={subtitle} />
}
