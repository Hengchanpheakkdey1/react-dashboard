import { Outlet } from "react-router";
import Topbar from "../component/Topbar";
import Sidebar from "../component/sidebar";

export default function AppLayout() {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', width: '100%' }}>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Topbar />
                <main style={{ flex: 1, overflow: 'auto' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
