import { useLocation, Navigate, Outlet } from "react-router"
import useAuthStore from "../store"


export const RequireAuth = () => {

    const location = useLocation()
    const store = useAuthStore()

    return (
        store?.user ? <Outlet />
            : <Navigate to="/auth/login" state={{ from: location }} replace />
    )
}
export const AlreadyAuth = () => {

    const location = useLocation()
    const store = useAuthStore()

    return (
        store?.user ? <Navigate to="/dashboard" state={{ from: location }} replace />
            : <Outlet />
    )
}