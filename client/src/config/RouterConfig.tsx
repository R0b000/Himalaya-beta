import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Homepage from "../module/Homepage/Homepage"
import { lazy, Suspense } from "react"
import Logo from '../assets/Himalaya logo.png'

const AdminLogin = lazy(() => import("../module/Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("../module/Admin/AdminDashboard"));

const RouterConfig = () => {
    const router = createBrowserRouter([
        {
            path: "",
            element: <Homepage />
        },
        {
            path: "/v1",
            element: <Homepage />
        },
        {
            path: "/v1/admin",
            element: (
                <Suspense fallback={
                    <div className="w-screen h-dvh overflow-clip shrink-0 flex items-center justify-center">
                        <img src={Logo} alt="" className="w-[15%] md:w-[5%] animate-pulse" />
                    </div>
                }>
                    <AdminLogin />
                </Suspense>
            )
        },
        {
            path: "/v1/admin/dashboard",
            element: (
                <Suspense fallback={
                    <div className="w-screen h-dvh overflow-clip shrink-0 flex items-center justify-center">
                        <img src={Logo} alt="" className="w-[15%] md:w-[5%] animate-pulse" />
                    </div>
                }>
                    <AdminDashboard />
                </Suspense>
            )
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default RouterConfig;