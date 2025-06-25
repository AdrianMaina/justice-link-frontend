// =================================================================================
// File: src/components/FeaturesSection.jsx
// =================================================================================
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/Card';
import { AlertTriangle, Globe, BarChart3, Heart, MessageCircle, Shield } from 'lucide-react';

export default function FeaturesSection({ setActiveSection }) {
    const features = [
        { icon: AlertTriangle, title: "Ripoti za Matukio", description: "Uripotiaji salama, bila kutambulika na upakiaji wa ushahidi.", section: "report", color: "text-destructive" },
        { icon: Globe, title: "Mkusanyiko wa Habari", description: "Ripoti za habari, taarifa za serikali, na majibu ya kimataifa.", section: "news", color: "text-secondary" },
        { icon: BarChart3, title: "Uoneshaji wa Data", description: "Ramani za maingiliano na grafu za kufuatilia matukio.", section: "data", color: "text-primary" },
        { icon: Heart, title: "Ukusanyaji Fedha", description: "Msaada wa moja kwa moja kwa familia za wahanga.", section: "fundraising", color: "text-destructive" },
        { icon: MessageCircle, title: "Mawasiliano Salama", description: "Mawasiliano ya siri na mashirika ya haki za binadamu.", section: "communication", color: "text-secondary" },
        { icon: Shield, title: "Dashibodi ya Msimamizi", description: "Udhibiti wa maudhui na usalama wa watumiaji.", section: "admin", color: "text-primary" }
    ];

    return (
        <section className="py-20 px-4 bg-muted/40">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-primary mb-4">Jukwaa Kamili la Haki Kenya</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Kuwezesha jamii na zana za uwazi na haki nchini Kenya.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-l-4 border-l-destructive" onClick={() => setActiveSection(feature.section)}>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                                    <CardTitle className="text-xl text-primary">{feature.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base leading-relaxed text-muted-foreground">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
