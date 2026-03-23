import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ publicPage }) => {
    const { user } = useSelector((state) => state.auth);
    if (publicPage) {
        return user ? <Navigate to="/" /> : <Outlet />
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute