// =================================================================================
// File: src/components/FeaturesSection.jsx
// =================================================================================
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/Card';
import { AlertTriangle, Globe, BarChart3, Heart, MessageCircle, Shield } from 'lucide-react';

export default function FeaturesSection({ setActiveSection }) {
    const features = [
        { icon: AlertTriangle, title: "Ripoti za Matukio", description: "Uripotiaji salama, bila kutambulika na upakiaji wa ushahidi.", section: "report", color: "text-red-600" },
        { icon: Globe, title: "Mkusanyiko wa Habari", description: "Ripoti za habari, taarifa za serikali, na majibu ya kimataifa.", section: "news", color: "text-green-700" },
        { icon: BarChart3, title: "Uoneshaji wa Data", description: "Ramani za maingiliano na grafu za kufuatilia matukio.", section: "data", color: "text-black" },
        { icon: Heart, title: "Ukusanyaji Fedha", description: "Msaada wa moja kwa moja kwa familia za wahanga.", section: "fundraising", color: "text-red-600" },
        { icon: MessageCircle, title: "Mawasiliano Salama", description: "Mawasiliano ya siri na mashirika ya haki za binadamu.", section: "communication", color: "text-green-700" },
        { icon: Shield, title: "Dashibodi ya Msimamizi", description: "Udhibiti wa maudhui na usalama wa watumiaji.", section: "admin", color: "text-black" }
    ];

    return (
        <section className="py-20 px-4 bg-gradient-to-r from-green-50 to-red-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-black mb-4">Jukwaa Kamili la Haki Kenya</h2>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">Kuwezesha jamii na zana za uwazi na haki nchini Kenya.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-l-4 border-l-red-600 bg-white/90 backdrop-blur-sm" onClick={() => setActiveSection(feature.section)}>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                                    <CardTitle className="text-xl text-black">{feature.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent><CardDescription className="text-base leading-relaxed text-gray-700">{feature.description}</CardDescription></CardContent>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
