// File: src/pages/LoginPage.jsx
// Description: The component for user login and registration.
// =================================================================================
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';

export default function LoginPage({ setActiveSection }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleStandardLogin = (e) => {
        e.preventDefault();
        console.log("Simulating login with", { email, password });
        login({ name: email.split('@')[0] || 'User' });
        setActiveSection('home');
    };

    const handleGoogleLogin = () => {
        console.log("Simulating Google Login");
        login({ name: 'Google User' });
        setActiveSection('home');
    };

    return (
        <div className="py-12 px-4 max-w-md mx-auto">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Karibu Tena</CardTitle>
                    <CardDescription>Ingia ili uendelee kupata haki.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleStandardLogin} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Barua pepe</Label>
                            <Input id="email" type="email" placeholder="jina@mfano.com" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="password">Nenosiri</Label>
                            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-white">Ingia</Button>
                    </form>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t"/></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">AU ENDELEA NA</span></div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.5 173.5 58.5l-65.2 64.2C335.5 97.4 294.8 80 248 80c-82.3 0-149.3 67-149.3 149.3s67 149.3 149.3 149.3c96.1 0 133.3-67.9 138-105.2H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
                        Ingia na Google
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

