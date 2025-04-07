"use client"

import Sidebar from './sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto md:ml-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;