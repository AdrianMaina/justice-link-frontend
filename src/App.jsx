// File: src/App.jsx
// Description: The root component that manages routing and page views.
// =================================================================================
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';

// Import Pages and Components
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import IncidentReportingPage from './pages/IncidentReportingPage';

export default function App() {
    const [activeSection, setActiveSection] = useState('home');
    const { isAuthenticated } = useAuth();

    // Handler to navigate between pages, with a check for protected routes
    const navigateTo = (section) => {
        // If trying to access a protected route and not authenticated, redirect to login
        if ((section === 'report' || section === 'admin') && !isAuthenticated) {
            setActiveSection('login'); 
        } else {
            setActiveSection(section);
        }
    };
    
    // Renders the component corresponding to the active section
    const renderActiveSection = () => {
        switch (activeSection) {
            case 'report':
                return <IncidentReportingPage />;
            case 'login':
                return <LoginPage setActiveSection={setActiveSection} />;
            case 'home':
            default:
                return <HomePage setActiveSection={navigateTo} />;
        }
    };

    return (
        <div className="min-h-screen">
            <Navigation activeSection={activeSection} setActiveSection={navigateTo} />
            <main>{renderActiveSection()}</main>
        </div>
    );
}


