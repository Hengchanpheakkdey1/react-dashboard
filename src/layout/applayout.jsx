import { Outlet } from "react-router";
import Topbar from "../component/Topbar";
import Sidebar from "../component/sidebar";

export default function AppLayout() {
    return (
        <div className="flex h-screen overflow-hidden w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
