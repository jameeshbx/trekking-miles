export interface BreadcrumbItem {
    label: string
    href: string
    active?: boolean
  }
  
  export interface NavigationData {
    [path: string]: {
      breadcrumbs: BreadcrumbItem[]
      title: string
      subtitle: string
    }
  }
  
  // Sample navigation data for different paths
  export const navigationData: NavigationData = {
    "/admin": {
      breadcrumbs: [{ label: "Pages", href: "/admin", active: true }],
      title: "Dashboard",
      subtitle: "Overview and summary",
    },
    "/admin/Dashboard": {
      breadcrumbs: [
        { label: "Pages", href: "/admin" },
        { label: "Dashboard", href: "/dashboard", active: true },
      ],
      title: "Manage Users",
      subtitle: "Add or manage details",
    },
    "/admin/Dashboard/manage-subscription": {
      breadcrumbs: [
        { label: "Pages", href: "/admin" },
        { label: "Dashboard", href: "/dashboard", active: true },
      ],
      title: "Manage Subscriptions",
      subtitle: "Add or manage details",
    },
    "/admin/Dashboard/add-managers": {
      breadcrumbs: [
        { label: "Pages", href: "/admin" },
        { label: "Dashboard", href: "/dashboard", active: true },
      ],
      title: "Manage Users",
      subtitle: "Add or manage details",
    },
    "/admin/Dashboard/Manage-DMC": {
      breadcrumbs: [
        { label: "Pages", href: "/admin" },
        { label: "Dashboard", href: "/dashboard", active: true },
      ],
      title: "Manage Agency Signups",
      subtitle: "Add or manage details",
    },
    "/admin/Dashboard/profile": {
      breadcrumbs: [
        { label: "Pages", href: "/admin" },
        { label: "Dashboard", href: "/dashboard", active: true },
      ],
      title: "Profile",
      subtitle: "Profile",
    },
    "/admin/Dashboard/add-DMC": {
      breadcrumbs: [
        { label: "Pages", href: "/admin" },
        { label: "Dashboard", href: "/dashboard", active: true },
      ],
      title: "Manage DMC",
      subtitle: "Add or manage details",
    },
    "/agency/Dashboard/add-users": {
      breadcrumbs: [
        { label: "Pages", href: "/agency" },
        { label: "Dashboard", href: "/dashboard", active: true },
      ],
      title: "Manage Users",
      subtitle: "Add or manage details",
    },
    "/agency/Dashboard/add-dmc": {
      breadcrumbs: [
        { label: "Pages", href: "/agency" },
        { label: "Dashboard", href: "/dashboard", active: true },
      ],
      title: "Manage DMC",
      subtitle: "Add or manage details",
    },
    "/agency/Dashboard/profile": {
      breadcrumbs: [
        { label: "Pages", href: "/agency" },
        { label: "Dashboard", href: "/dashboard", active: true },
      ],
      title: "Profile",
      subtitle: "Profile",
    },
  }
  
  export function getNavigationData(path: string) {
    return (
      navigationData[path] || {
        breadcrumbs: [
          { label: "Pages", href: "/admin" },
          { label: path.split("/admin").filter(Boolean).join("/admin"), href: path, active: true },
        ],
        title: "Page",
        subtitle: "Page description",
      }
    )
  }
  