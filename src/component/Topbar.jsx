import { ChevronLeft, Bell } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function Topbar() {
    const navigate = useNavigate()

    return (
        <header className="flex items-center justify-between px-4 h-11 bg-white border-b border-gray-200">

            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-6 h-6 bg-gray-100 border border-gray-200 rounded-md cursor-pointer text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                aria-label="Go back"
            >
                <ChevronLeft size={13} />
            </button>

            {/* Right side: notifications + user */}
            <div className="flex items-center gap-3">

                {/* Notification bell */}
                <button
                    className="flex items-center justify-center w-7 h-7 rounded-md cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors border-0 bg-transparent"
                    aria-label="Notifications"
                >
                    <Bell size={15} />
                </button>

                {/* User info */}
                <div className="flex items-center gap-2">
                    <div className="text-right">
                        <p className="text-xs font-semibold text-gray-900 m-0">John Doe</p>
                        <p className="text-xs text-gray-400 m-0">Administrator</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold select-none">
                        JD
                    </div>
                </div>
            </div>
        </header>
    )
}
