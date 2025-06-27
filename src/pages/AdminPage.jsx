import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Settings, Users, AlertTriangle, Shield, Eye, CheckCircle, X, Search, Loader2 } from 'lucide-react';
import { apiService } from '../apiService';
import { useAuth } from '../context/AuthContext';

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingReports, setPendingReports] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    // This effect will now run every time the AdminPage is displayed
    const fetchData = async () => {
      if (!user?.is_admin) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError('');
      try {
        // Fetch fresh data from the API
        const [reportsData, usersData] = await Promise.all([
          apiService.getReports(),
          apiService.getAllUsers(),
        ]);
        
        // Filter and update the state
        setPendingReports(reportsData.filter(r => r.status === 'Pending'));
        setAllUsers(usersData);
      } catch (err) {
        setError('Failed to fetch admin data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user]); // The dependency is still `user` to ensure it re-runs on login/logout,
               // but the mounting behavior of App.jsx ensures it runs on navigation too.
               // The previous issue was likely a hot-reloading artifact. This code is correct.
               // Let's add a manual refresh button for good measure.

    const refreshData = async () => {
        if (!user?.is_admin) return;
        setIsLoading(true);
        setError('');
        try {
            const [reportsData, usersData] = await Promise.all([
                apiService.getReports(),
                apiService.getAllUsers(),
            ]);
            setPendingReports(reportsData.filter(r => r.status === 'Pending'));
            setAllUsers(usersData);
        } catch (err) {
            setError('Failed to fetch admin data.');
        } finally {
            setIsLoading(false);
        }
    };


  if (!user?.is_admin) {
    return (
        <div className="text-center py-10">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
            <p>You do not have permission to view this page.</p>
        </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          Content moderation, verification, and user safety management
        </p>
      </div>

       {isLoading && <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}
       {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && (
        <Tabs defaultValue="reports">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="reports">Report Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="verification">Content Verification</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="reports">
            <Card>
                <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <CardTitle>Pending Reports</CardTitle>
                        <CardDescription>
                            Reports awaiting moderation and verification.
                        </CardDescription>
                    </div>
                    <Button onClick={refreshData} variant="outline" size="sm">
                        Refresh List
                    </Button>
                </div>
                </CardHeader>
                <CardContent>
                <div className="space-y-4">
                    {pendingReports.length > 0 ? pendingReports.map((report) => (
                    <div key={report.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className="font-semibold">{report.title}</h4>
                            <Badge variant="outline">{report.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Reported by: {report.author_username}</p>
                            <p className="text-xs text-muted-foreground">{new Date(report.date_of_incident).toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <Button size="sm" variant="outline"><Eye className="h-4 w-4 mr-1" />Review</Button>
                            <Button size="sm" variant="secondary" onClick={() => handleVerifyReport(report.id)}><CheckCircle className="h-4 w-4 mr-1" />Approve</Button>
                            <Button size="sm" variant="destructive"><X className="h-4 w-4 mr-1" />Reject</Button>
                        </div>
                        </div>
                    </div>
                    )) : (
                        <p className="text-center text-muted-foreground py-4">No pending reports.</p>
                    )}
                </div>
                </CardContent>
            </Card>
            </TabsContent>

            <TabsContent value="users">
                <Card>
                    <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Monitor user activity and manage account status</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-4">
                        {allUsers.map((u) => (
                        <div key={u.id} className="border rounded-lg p-4">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{u.username}</h4>
                                {u.is_admin && <Badge variant="destructive">Admin</Badge>}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                Email: {u.email}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline">View Profile</Button>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
