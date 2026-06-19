import { NavLink, useLocation } from 'react-router'
import { ChevronRight, Package } from 'lucide-react'

export default function Sidebar() {
    const location = useLocation()
    const productsActive = location.pathname.startsWith('/product')

    return (
        <aside className="w-[180px] min-w-[180px] h-screen bg-white border-r border-gray-200 flex flex-col flex-shrink-0 overflow-hidden transition-[width,min-width] duration-200 ease-in-out">
            {/* Brand */}
            <div className="flex items-center gap-2 px-3 py-[14px] border-b border-gray-200">
                <div className="w-[30px] h-[30px] bg-blue-600 rounded-[7px] flex items-center justify-center text-white flex-shrink-0">
                    <Package size={16} />
                </div>
                <span className="text-sm font-semibold text-gray-900 flex-1 whitespace-nowrap">Admin</span>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-2 py-[10px] flex flex-col gap-0.5">
                <NavLink
                    to="/product"
                    className={`flex items-center gap-[9px] px-[10px] py-2 rounded-[7px] no-underline text-[13.5px] font-medium transition-colors duration-[120ms] whitespace-nowrap ${
                        productsActive
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-[#7086bd] hover:text-[rgb(184,176,176)]'
                    }`}
                >
                    <span className="flex items-center justify-center flex-shrink-0 w-[18px] h-[18px]">
                        <Package size={16} />
                    </span>
                    <span className="leading-none">Products</span>
                    <ChevronRight size={13} className="ml-auto" />
                </NavLink>

                {productsActive && (
                    <NavLink
                        to="/product/create"
                        className={({ isActive }) =>
                            `flex items-center gap-2 py-1.5 pl-[38px] pr-[10px] rounded-[7px] no-underline text-[13px] font-normal transition-colors duration-[120ms] whitespace-nowrap ${
                                isActive
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`text-[15px] font-normal leading-none ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>+</span>
                                <span>Create Product</span>
                            </>
                        )}
                    </NavLink>
                )}
            </nav>
        </aside>
    )
}
