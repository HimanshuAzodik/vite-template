import React from 'react'

import { useAuthStore } from "../../store/store";
import { Navigate } from 'react-router-dom';

 const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = useAuthStore((state) => state.token);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;

}
export default ProtectedRoute