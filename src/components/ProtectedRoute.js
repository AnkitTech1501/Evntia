import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const token = sessionStorage.getItem('token');
    return token ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
