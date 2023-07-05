import { useLocation, Navigate, Outlet } from "react-router"
//import useAuthStore from "../state/store"
import { useStore } from "../state/store"


export const RequireAuth = () => {

    const location = useLocation()
    const user = useStore((state: any) => state.user)

    return (
        user ? <Outlet />
            : <Navigate to="/auth/login" state={{ from: location }} replace />
    )
}
export const AlreadyAuth = () => {

    const location = useLocation()
    const user = useStore((state: any) => state.user)

    return (
        user ? <Navigate to="/teams" state={{ from: location }} replace />
            : <Outlet />
    )
}