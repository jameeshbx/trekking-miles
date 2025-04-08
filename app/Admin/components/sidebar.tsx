"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loginRequestsOpen, setLoginRequestsOpen] = useState(false);

  // Responsive handling
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // On larger screens, sidebar should always be open
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleLoginRequests = () => {
    setLoginRequestsOpen(!loginRequestsOpen);
  };

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/admin/daboard',
      icon: (
        <Image
          src="/dash.svg" 
          alt="Dashboard"
          width={20}
          height={20}
          className="min-w-[20px]"
        />
      ),
    },
    {
      title: 'Login requests',
      href: '/admin/login-requests',
      icon: (
        <Image
          src="/login.svg" 
          alt="Login Requests"
          width={20}
          height={20}
          className="min-w-[20px] mr-1"
        />
      ),
      isDropdown: true,
      dropdownItems: [
        { 
          name: 'DMC', 
          href: '/admin/login-requests/dmc',
          logo: (
            <Image
              src="/dmcagency.svg"
              alt="DMC Agency Logo"
              width={16}
              height={16}
              className="mr-2 min-w-[16px]"
            />
          )
        },
        { 
          name: 'Other Agency', 
          href: '/admin/login-requests/other',
          logo: (
            <Image
              src="/dmcagency.svg"
              alt="Agency Logo"
              width={16}
              height={16}
              className="mr-2 min-w-[16px]"
            />
          )
        },
      ]
    },
    {
      title: 'Subscription Details',
      href: '/admin/advisors',
      icon: (
        <Image
          src="/subscription.svg" 
          alt="Advisors"
          width={20}
          height={20}
          className="min-w-[20px]"
        />
      ),
    },
    {
      title: 'Manage Users',
      href: '/admin/users',
      icon: (
        <Image
          src="/manage.svg" 
          alt="Manage Users"
          width={20}
          height={20}
          className="min-w-[20px]"
        />
      ),
    },
    {
      title:'Add DMC',
      href:'/admin/add dmc',
      icon:(
        <Image
        src="/Vector.svg" 
        alt="Manage Users"
        width={20}
        height={20}
        className="min-w-[20px]"
      />
      )
    }
  ];

  const accountItems = [
    {
      title: 'Profile',
      href: '/admin/profile',
      icon: (
        <Image
          src="/profile.svg" 
          alt="Profile"
          width={20}
          height={20}
          className="min-w-[20px]"
        />
      ),
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: (
        <Image
          src="/settings.svg" 
          alt="Settings"
          width={20}
          height={20}
          className="min-w-[20px]"
        />
      ),
    },
    {
      title: 'Logout',
      href: '/',
      icon: (
        <Image
          src="/logout.svg" 
          alt="Logout"
          width={20}
          height={20}
          className="min-w-[20px]"
        />
      ),
    },
  ];

  return (
    <>
      {/* Mobile menu button - only visible on mobile */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-50 p-2 m-2 text-gray-600 bg-white rounded-md shadow-md transition-opacity duration-300 ${
          isMobile ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Toggle sidebar"
        data-cy="sidebar-toggle"
      >
        {sidebarOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isMobile 
            ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') 
            : 'translate-x-0'
        }`}
        data-cy="sidebar"
      >
        <div className="flex flex-col h-full p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {/* Logo Section */}
          <div className="flex items-center justify-center p-4 mb-4">
            <div className="flex flex-col items-center">
              <Image 
                src="/logo trekking.png" 
                alt="Company Logo"
                width={120}
                height={60}
                className="mb-2"
                priority
                data-cy="sidebar-logo"
              />
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <div key={item.href}>
                {item.isDropdown ? (
                  <div className="relative">
                    <button
                      onClick={toggleLoginRequests}
                      className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                        pathname.startsWith("/admin/login-requests")
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      data-cy={`sidebar-item-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="text-lg">{item.title}</span>
                      <svg
                        className={`w-4 h-4 ml-auto transition-transform ${loginRequestsOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {loginRequestsOpen && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className={`flex items-center px-4 py-2 text-xl rounded-lg ${
                              pathname === dropdownItem.href
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                            data-cy={`sidebar-dropdown-item-${dropdownItem.name.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            {dropdownItem.logo}
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      pathname === item.href ? "bg-blue-100  text-lg text-blue-600" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    data-cy={`sidebar-item-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="text-lg">{item.title}</span>
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-200">
              <h3 className="px-3 mb-2 text-xs font-semibold tracking-wider text-black uppercase">
                ACCOUNT PAGES
              </h3>
              {accountItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname === item.href ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  data-cy={`sidebar-account-item-${item.title.toLowerCase()}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-lg font-poppins">{item.title}</span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="p-3 mt-auto">
            <Image
              src="/Background.svg"
              alt="background"
              width={218}
              height={250}
              className="w-full mt-6"
            />
            <div className="p-3 bg-gray-50 rounded-lg mt-[-160px]">
              <Image
                src="/Icon.svg"
                alt="help icon"
                width={35}
                height={35}
                className="w-10 h-10"
              />
              <h4 className="mt-2 mb-1 text-[15px] text-white font-poppins">Need help?</h4>
              <p className="mb-2 text-[13px] text-white font-poppins">Please check our docs</p>
              <button className="w-full px-3 py-2 text-[13px] text-center text-black font-poppins bg-white rounded-md hover:bg-gray-100">
                DOCUMENTATION
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile - only visible when sidebar is open on mobile */}
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isMobile && sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
        data-cy="sidebar-overlay"
      />
    </>
  );
};

export default Sidebar;