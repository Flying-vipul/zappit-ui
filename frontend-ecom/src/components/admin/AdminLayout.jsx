import React, { useState } from 'react'
import SideBar from '../shared/SideBar'
import { Outlet } from 'react-router-dom'
import { IoIosMenu, IoMdClose } from "react-icons/io";

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen relative'>
        {/* Desktop Sidebar Container (Hidden on Mobile) */}
        <div className="hidden md:flex fixed inset-y-0 left-0 z-40 w-72 flex-col">
            <SideBar setSidebarOpen={() => {}} />
        </div>

        {/* Main Content Area */}
        <div className='flex-1 md:ml-72 p-4 sm:p-6 w-full max-w-[100vw] overflow-x-hidden'>
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout
