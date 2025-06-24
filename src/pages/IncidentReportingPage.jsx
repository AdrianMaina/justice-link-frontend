// =================================================================================
// File: src/pages/IncidentReportingPage.jsx
// Description: The page containing the incident report form.
// =================================================================================
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';
import { Checkbox } from '../components/ui/Checkbox';
import { Badge } from '../components/ui/Badge';
import { MapPin, Camera, EyeOff, Upload, AlertTriangle, Shield, Loader2 } from 'lucide-react';

export default function IncidentReportingPage() {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [location, setLocation] = useState('');
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            alert("Report Submitted! (This is a placeholder)");
            setIsSubmitting(false);
        }, 1500);
    };

    const handleFileUpload = (e) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    return (
        <div className="py-8 px-4 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl"><AlertTriangle className="h-6 w-6 text-red-600" />Fomu ya Kuripoti Tukio</CardTitle>
                    <CardDescription>Toa maelezo mengi iwezekanavyo. Sehemu zilizo na * ni za lazima.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                            <Label htmlFor="anonymous" className="flex items-center gap-2"><EyeOff className="h-4 w-4" /> Peana ripoti hii bila kujitambulisha</Label>
                        </div>
                        {!isAnonymous && (
                            <div className="grid md:grid-cols-2 gap-4">
                                <div><Label htmlFor="name">Jina Kamili *</Label><Input id="name" placeholder="Ingiza jina lako kamili" required /></div>
                                <div><Label htmlFor="contact">Njia ya Mawasiliano</Label><Input id="contact" placeholder="Barua pepe au nambari ya simu" /></div>
                            </div>
                        )}
                        <div>
                            <Label htmlFor="location">Eneo *</Label>
                            <div className="flex gap-2">
                                <Input id="location" placeholder="Ingiza eneo au anwani" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                <Button type="button" variant="outline" onClick={() => setLocation('Nairobi, Kenya (GPS)')}><MapPin className="h-4 w-4 mr-2" /> Pata GPS</Button>
                            </div>
                        </div>
                         <div><Label htmlFor="description">Maelezo *</Label><Textarea id="description" placeholder="Eleza kilichotokea..." required /></div>
                        <div>
                            <Label htmlFor="evidence">Ushahidi</Label>
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                                <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                                <p className="text-slate-600 mb-2">Pakia picha, video, au hati</p>
                                <Input type="file" multiple onChange={handleFileUpload} id="file-upload" className="sr-only" />
                                <Label htmlFor="file-upload"><span className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-white border border-slate-300 cursor-pointer hover:bg-slate-100"><Camera className="h-4 w-4 mr-2" />Chagua Faili</span></Label>
                            </div>
                        </div>
                        <Button type="submit" variant="destructive" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin"/> : <Shield className="h-4 w-4 mr-2" />}
                            {isSubmitting ? 'Inatuma...' : 'Tuma Ripoti kwa Usalama'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}


