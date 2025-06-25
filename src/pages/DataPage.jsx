import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Map, TrendingUp, Users, Download, Share2, Filter } from 'lucide-react';

export default function DataPage() {
  const [selectedMetric, setSelectedMetric] = useState('incidents');
  const [timeRange, setTimeRange] = useState('6months');

  const incidentData = [
    { month: 'Jul', incidents: 45, resolved: 12 },
    { month: 'Aug', incidents: 52, resolved: 18 },
    { month: 'Sep', incidents: 38, resolved: 25 },
    { month: 'Oct', incidents: 67, resolved: 31 },
    { month: 'Nov', incidents: 59, resolved: 28 },
    { month: 'Dec', incidents: 72, resolved: 35 }
  ];

  const countryData = [
    { country: 'United States', incidents: 245, color: '#ef4444' },
    { country: 'Brazil', incidents: 189, color: '#f97316' },
    { country: 'India', incidents: 156, color: '#eab308' },
    { country: 'Nigeria', incidents: 134, color: '#22c55e' },
    { country: 'Philippines', incidents: 98, color: '#3b82f6' }
  ];

  const typeData = [
    { name: 'Excessive Force', value: 35, color: '#ef4444' },
    { name: 'Wrongful Death', value: 25, color: '#dc2626' },
    { name: 'Unlawful Arrest', value: 20, color: '#f97316' },
    { name: 'Harassment', value: 12, color: '#eab308' },
    { name: 'Other', value: 8, color: '#6b7280' }
  ];

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Data Analytics</h1>
        <p className="text-xl text-muted-foreground">
          Interactive visualizations to track incidents and identify patterns
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        {/* NOTE: The Select component was replaced with a Button as a placeholder. */}
        <Button variant="outline">Metric: Incident Reports</Button>
        <Button variant="outline">Time: Last 6 Months</Button>
        <Button variant="outline" className="flex items-center gap-2"><Filter className="h-4 w-4" />Advanced Filters</Button>
        <Button variant="outline" className="flex items-center gap-2"><Download className="h-4 w-4" />Export Data</Button>
        <Button variant="outline" className="flex items-center gap-2"><Share2 className="h-4 w-4" />Share Report</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Incidents</p>
                <p className="text-3xl font-bold text-foreground">1,547</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <BarChart3 className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cases Resolved</p>
                <p className="text-3xl font-bold text-foreground">234</p>
                <p className="text-sm text-green-600">+8% resolution rate</p>
              </div>
              <TrendingUp className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Countries</p>
                <p className="text-3xl font-bold text-foreground">45</p>
                <p className="text-sm text-blue-600">Global coverage</p>
              </div>
              <Map className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-3xl font-bold text-foreground">12,456</p>
                <p className="text-sm text-purple-600">Community strong</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Incident Trends</CardTitle>
            <CardDescription>Monthly incident reports and resolution rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incidentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="incidents" fill="#ef4444" name="Incidents" />
                <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Incident Types</CardTitle>
            <CardDescription>Distribution of incident categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={typeData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {typeData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Global Heat Map</CardTitle>
            <CardDescription>Incident density by geographic region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Map className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Interactive map visualization</p>
                <p className="text-sm text-muted-foreground/80">Showing incident hotspots and trends</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Countries with highest incident reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countryData.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: country.color }} />
                    <span className="text-sm font-medium">{country.country}</span>
                  </div>
                  <Badge variant="outline">{country.incidents}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
