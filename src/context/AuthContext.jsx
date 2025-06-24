// File: src/context/AuthContext.jsx
// Description: Provides authentication state to the entire application.
// =================================================================================
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        // In a real app, you would store the JWT here (e.g., localStorage)
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        // In a real app, you would clear the JWT from localStorage
    };

    const value = { isAuthenticated, user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

