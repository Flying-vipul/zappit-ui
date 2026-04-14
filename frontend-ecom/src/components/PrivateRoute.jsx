import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ publicPage = false, adminOnly = false}) => {
    const { user } = useSelector((state) => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
    // SECURITY: Ensure user object is structurally valid, not just a mocked empty object from local storage
    const isAuthenticated = user && user.id;

    if (publicPage) {
        return isAuthenticated ? <Navigate to="/" /> : <Outlet />
    }

    if(adminOnly) {
        if (!isAdmin){
            return <Navigate to="/" />
        }
        
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute