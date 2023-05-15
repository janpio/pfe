import { useLocation, Navigate, Outlet } from "react-router"
import useAuthStore from "../store"

const RequireAuth = () => {

    const location = useLocation()
    const store = useAuthStore()

    return (
        store?.user ? <Outlet />
            : <Navigate to="/auth/login" state={{ from: location }} replace />
    )
}

export default RequireAuth