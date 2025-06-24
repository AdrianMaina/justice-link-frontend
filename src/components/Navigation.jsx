// =================================================================================
// File: src/components/Navigation.jsx
// =================================================================================
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Menu, X, AlertTriangle, Globe, BarChart3, Heart, MessageCircle, Settings } from 'lucide-react';
import { Button } from './ui/Button';

export default function Navigation({ activeSection, setActiveSection }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();

    const navItems = [
        { id: 'home', label: 'Nyumbani', icon: Shield, protected: false },
        { id: 'report', label: 'Ripoti', icon: AlertTriangle, protected: true },
        { id: 'news', label: 'Habari', icon: Globe, protected: false },
        { id: 'data', label: 'Takwimu', icon: BarChart3, protected: false },
        { id: 'fundraising', label: 'Msaada', icon: Heart, protected: false },
        { id: 'admin', label: 'Msimamizi', icon: Settings, protected: true }
    ];

    const filteredNavItems = navItems.filter(item => !item.protected || isAuthenticated);

    return (
        <nav className="bg-gradient-to-r from-black via-red-600 to-green-700 shadow-lg sticky top-0 z-50 border-b-4 border-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('home')}>
                        <Shield className="h-8 w-8 text-white" />
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-white">JUSTICE LINK KENYA 🇰🇪</h1>
                            <p className="hidden md:block text-xs text-green-100">Sauti dhidi ya ukatili wa polisi Kenya</p>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center space-x-1">
                        {filteredNavItems.map((item) => (
                            <Button key={item.id} variant="ghost" className={`flex items-center gap-2 text-white hover:bg-white/20 ${activeSection === item.id ? 'bg-white text-black' : ''}`} onClick={() => setActiveSection(item.id)}>
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Button>
                        ))}
                        {!isAuthenticated ? 
                            <Button variant="outline" className="ml-2 bg-white text-black" onClick={() => setActiveSection('login')}>Ingia</Button> :
                            <Button variant="outline" className="ml-2 bg-red-500 text-white border-red-500 hover:bg-red-600" onClick={logout}>Toka</Button>
                        }
                    </div>
                    <div className="lg:hidden flex items-center">
                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-white/20">
                        <div className="flex flex-col space-y-2">
                            {filteredNavItems.map((item) => (
                                <Button key={item.id} variant="ghost" className={`justify-start ${activeSection === item.id ? 'bg-white text-black' : 'text-white'}`} onClick={() => { setActiveSection(item.id); setIsMenuOpen(false); }}>
                                    <item.icon className="h-4 w-4 mr-2" />
                                    {item.label}
                                </Button>
                            ))}
                             {!isAuthenticated ? 
                                <Button variant="outline" className="justify-start bg-white text-black" onClick={() => {setActiveSection('login'); setIsMenuOpen(false)}}>Ingia</Button> :
                                <Button variant="outline" className="justify-start bg-red-500 text-white" onClick={() => {logout(); setIsMenuOpen(false)}}>Toka</Button>
                            }
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}