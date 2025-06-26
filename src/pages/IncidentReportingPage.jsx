// =================================================================================
// File: src/pages/IncidentReportingPage.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';
import { Checkbox } from '../components/ui/Checkbox';
import { MapPin, Camera, EyeOff, Upload, AlertTriangle, Shield, Loader2 } from 'lucide-react';
import { apiService } from '../apiService';

export default function IncidentReportingPage() {
    // STATE for all form fields must be declared here
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [files, setFiles] = useState([]); // File handling is for future implementation
    
    // State for submission status
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            // Now 'title' and 'description' are correctly defined from state
            const reportData = { 
                title, 
                description, 
                location, 
                is_anonymous: isAnonymous 
            };
            
            await apiService.createReport(reportData);
            setSuccess('Report submitted successfully! Thank you for your contribution.');
            
            // Clear the form on success
            setTitle('');
            setDescription('');
            setLocation('');
            setIsAnonymous(false);

        } catch (err) {
            setError(err.message || 'Failed to submit report.');
        } finally {
            setIsSubmitting(false);
        }
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
                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                            <Label htmlFor="anonymous" className="flex items-center gap-2"><EyeOff className="h-4 w-4" /> Peana ripoti hii bila kujitambulisha</Label>
                        </div>
                        
                        {/* Title Input Field */}
                        <div>
                            <Label htmlFor="title">Title *</Label>
                            <Input 
                                id="title" 
                                placeholder="A brief title for the incident, e.g., 'Unlawful Arrest in CBD'" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                required 
                            />
                        </div>
                        
                        {/* Description Textarea */}
                         <div>
                            <Label htmlFor="description">Maelezo *</Label>
                            <Textarea 
                                id="description" 
                                placeholder="Describe what happened in as much detail as possible..." 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                required 
                            />
                        </div>

                        {/* Location Input Field */}
                        <div>
                            <Label htmlFor="location">Eneo</Label>
                            <div className="flex gap-2">
                                <Input 
                                    id="location" 
                                    placeholder="Ingiza eneo au anwani" 
                                    value={location} 
                                    onChange={(e) => setLocation(e.target.value)} 
                                />
                                <Button type="button" variant="outline" onClick={() => setLocation('Nairobi, Kenya (GPS)')}>
                                    <MapPin className="h-4 w-4 mr-2" /> Pata GPS
                                </Button>
                            </div>
                        </div>

                        {/* File Upload (for future development) */}
                        <div>
                            <Label htmlFor="evidence">Ushahidi (Feature in development)</Label>
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                                <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                                <p className="text-slate-600 mb-2">Pakia picha, video, au hati</p>
                                <Input type="file" multiple onChange={handleFileUpload} id="file-upload" className="sr-only" disabled/>
                                <Label htmlFor="file-upload">
                                    <span className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-white border border-slate-300 cursor-pointer hover:bg-slate-100 opacity-50">
                                        <Camera className="h-4 w-4 mr-2" />Chagua Faili
                                    </span>
                                </Label>
                            </div>
                        </div>

                        {/* Submit Button */}
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
