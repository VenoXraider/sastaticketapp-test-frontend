import React from 'react';
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../protectedRoutes/protectedRoutes";
// containers
import Login from '../containers/login/login';
import Dashboard from '../containers/Dashboard/dashboard';
// components
import NotFound from '../components/notFound/notFound';
import Layout from '../components/layout/layout';

const Navigation = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <Routes>
            <Route path="/test" element={<Layout />}>
                <Route index path="dashboard" element={<ProtectedRoute isLoggedIn={user}> <Dashboard /></ProtectedRoute>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/test/dashboard" />} />
            <Route path="/test" element={<Navigate to="/test/dashboard" />} />
        </Routes>
    )
}

export default Navigation
