// File: src/pages/NewsPage.jsx
// =================================================================================
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Globe, Search, Filter, ExternalLink, Calendar, MapPin, Bookmark, Share2 } from 'lucide-react';

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const newsItems = [
    { id: 1, title: "International Human Rights Commission Calls for Police Reform", source: "UN Human Rights", country: "Global", date: "2024-01-15", type: "international", summary: "The UN Human Rights Commission released a comprehensive report...", tags: ["Reform", "International", "Policy"] },
    { id: 2, title: "New Accountability Measures Introduced in Metropolitan Police", source: "Justice Today", country: "United States", date: "2024-01-14", type: "government", summary: "Local government announces new oversight committee...", tags: ["Accountability", "Body Cameras"] },
    { id: 3, title: "Community Leaders Demand Justice in Recent Case", source: "Community Voice", country: "Canada", date: "2024-01-13", type: "news", summary: "Peaceful protests continue as community demands answers...", tags: ["Community", "Protests", "Justice"] },
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8"><h1 className="text-4xl font-bold text-slate-800 mb-4">Habari na Taarifa</h1><p className="text-xl text-slate-600">Ripoti za habari, taarifa za serikali, na majibu ya kimataifa.</p></div>
      <div className="mb-8 grid md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" /><Input placeholder="Tafuta habari..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/></div>
        <Select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
          <option value="all">Vyanzo Vyote</option>
          <option value="news">Ripoti za Habari</option>
          <option value="government">Taarifa za Serikali</option>
          <option value="international">Majibu ya Kimataifa</option>
        </Select>
        <Button variant="outline" className="flex items-center gap-2"><Filter className="h-4 w-4" />Chuja Zaidi</Button>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {filteredNews.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2"><div className="flex items-center gap-2"><Badge variant={item.type === 'international' ? 'default' : 'secondary'}>{item.type}</Badge><span className="text-sm text-slate-500">{item.source}</span></div><div className="flex items-center gap-2"><Button variant="ghost" size="sm"><Bookmark className="h-4 w-4" /></Button><Button variant="ghost" size="sm"><Share2 className="h-4 w-4" /></Button></div></div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-slate-500"><div className="flex items-center gap-1"><Calendar className="h-4 w-4" />{item.date}</div><div className="flex items-center gap-1"><MapPin className="h-4 w-4" />{item.country}</div></div>
              </CardHeader>
              <CardContent><p className="text-slate-600 mb-4">{item.summary}</p><div className="flex items-center justify-between"><div className="flex gap-2">{item.tags.map((tag, i) => (<Badge key={i} variant="outline">{tag}</Badge>))}</div><a href="#" className="text-blue-600 inline-flex items-center">Soma Zaidi <ExternalLink className="h-4 w-4 ml-1" /></a></div></CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-6">
          <Card><CardHeader><CardTitle>Habari Kuu</CardTitle></CardHeader><CardContent><div className="space-y-2">{['Police Reform', 'Body Cameras', 'Community Oversight'].map((topic, i) => (<Button key={i} variant="ghost" className="justify-start w-full text-left p-2">#{topic}</Button>))}</div></CardContent></Card>
        </div>
      </div>
    </div>
  );
};
