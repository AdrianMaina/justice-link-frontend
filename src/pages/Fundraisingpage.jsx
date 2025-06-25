import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Heart, DollarSign, Users, Target, Share2, Calendar, MapPin } from 'lucide-react';

export default function FundraisingPage() {
  const [donationAmount, setDonationAmount] = useState('');

  const campaigns = [
    { id: 1, title: "Support for Johnson Family", description: "Help cover legal fees and support family after tragic incident", location: "Nairobi, Kenya", goal: 2500000, raised: 1729000, donors: 567, daysLeft: 15, urgent: true },
    { id: 2, title: "Legal Defense Fund - Martinez Case", description: "Seeking justice and accountability in police misconduct case", location: "Mombasa, Kenya", goal: 3750000, raised: 921500, donors: 234, daysLeft: 28, urgent: false },
    { id: 3, title: "Community Healing Center", description: "Establishing support center for victims of police violence", location: "Kisumu, Kenya", goal: 5000000, raised: 3394500, donors: 892, daysLeft: 42, urgent: false }
  ];

  const handleDonate = (campaignId) => {
    // NOTE: This should be replaced with a proper toast notification library
    alert("Donation Processed! Thank you for your support.");
    console.log(`Donating ${donationAmount || 'preset amount'} to campaign ${campaignId}`);
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Support Families & Initiatives</h1>
        <p className="text-xl text-muted-foreground">Direct financial support for victims' families and justice initiatives in Kenya</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Total Raised</p><p className="text-3xl font-bold">KSh 11.5M</p><p className="text-sm text-green-600">+15% this month</p></div><DollarSign className="h-8 w-8 text-green-600" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Active Campaigns</p><p className="text-3xl font-bold">47</p><p className="text-sm text-blue-600">Supporting families</p></div><Target className="h-8 w-8 text-blue-600" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Total Donors</p><p className="text-3xl font-bold">15,234</p><p className="text-sm text-purple-600">Growing community</p></div><Users className="h-8 w-8 text-purple-600" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Families Helped</p><p className="text-3xl font-bold">89</p><p className="text-sm text-pink-600">Real impact</p></div><Heart className="h-8 w-8 text-pink-600" /></div></CardContent></Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {campaign.urgent && (<Badge variant="destructive">URGENT</Badge>)}
                      <Badge variant="outline" className="flex items-center gap-1"><MapPin className="h-3 w-3" />{campaign.location}</Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{campaign.title}</CardTitle>
                    <CardDescription>{campaign.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">KSh {campaign.raised.toLocaleString()} raised</span>
                      <span className="text-muted-foreground">KSh {campaign.goal.toLocaleString()} goal</span>
                    </div>
                    <Progress value={(campaign.raised / campaign.goal) * 100} />
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><Users className="h-4 w-4" />{campaign.donors} donors</span>
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{campaign.daysLeft} days left</span>
                    </div>
                    <span className="font-medium text-green-600">{Math.round((campaign.raised / campaign.goal) * 100)}% funded</span>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1" variant="secondary" onClick={() => handleDonate(campaign.id)}><Heart className="mr-2 h-4 w-4" />Donate Now</Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-destructive" />Quick Donate</CardTitle><CardDescription>Support the cause with a quick donation</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {[1250, 2500, 5000].map((amount) => (<Button key={amount} variant="outline" className="h-12" onClick={() => setDonationAmount(amount.toString())}>KSh {amount}</Button>))}
              </div>
              <Input placeholder="Or enter a custom amount" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} />
              <Button className="w-full" variant="secondary" onClick={() => handleDonate(0)}>Donate KSh {donationAmount || '0'}</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>How Your Donation Helps</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3"><div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0"><DollarSign className="h-4 w-4 text-green-600" /></div><div><h4 className="font-medium">Legal Support</h4><p className="text-sm text-muted-foreground">Covers attorney fees and court costs</p></div></div>
              <div className="flex items-start gap-3"><div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0"><Heart className="h-4 w-4 text-blue-600" /></div><div><h4 className="font-medium">Family Support</h4><p className="text-sm text-muted-foreground">Daily expenses and counseling</p></div></div>
              <div className="flex items-start gap-3"><div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0"><Users className="h-4 w-4 text-purple-600" /></div><div><h4 className="font-medium">Community Programs</h4><p className="text-sm text-muted-foreground">Prevention and education initiatives</p></div></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
