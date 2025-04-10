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
    "/admin/dashboard": {
      breadcrumbs: [
        { label: "Pages", href: "/admin" },
        { label: "Dashboard", href: "/dashboard", active: true },
      ],
      title: "Manage Users",
      subtitle: "Add or manage details",
    },
    "/admin/users": {
      breadcrumbs: [
        { label: "Pages", href: "/admin" },
        { label: "Users", href: "/users", active: true },
      ],
      title: "User Management",
      subtitle: "View and manage system users",
    },
    "/admin/settings": {
      breadcrumbs: [
        { label: "Pages", href: "/admin" },
        { label: "Settings", href: "/settings", active: true },
      ],
      title: "Settings",
      subtitle: "Configure your application",
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
  