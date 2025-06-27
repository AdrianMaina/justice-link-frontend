import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Users, Eye, CheckCircle, X, Loader2, RefreshCw, AlertTriangle, Plus, Trash2, Edit, Globe } from 'lucide-react';
import { apiService } from '../apiService';
import { useAuth } from '../context/AuthContext';

const ReportCard = ({ report, onUpdate }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [actionTaken, setActionTaken] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAction = async (action) => {
        setIsProcessing(true);
        try {
            if (action === 'approve') {
                await apiService.verifyReport(report.id);
                setActionTaken('approved');
            } else if (action === 'reject') {
                await apiService.rejectReport(report.id);
                setActionTaken('rejected');
            }
            setTimeout(() => onUpdate(), 1500);
        } catch (err) {
            alert(`Failed to ${action} report: ${err.message}`);
            setActionTaken(null);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="border rounded-lg p-4 space-y-3 transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-semibold">{report.title}</h4>
                        <Badge variant="outline">{report.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Reported by: {report.author_username}</p>
                    <p className="text-xs text-muted-foreground">{new Date(report.date_of_incident).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0 items-center">
                    {isProcessing ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : actionTaken === 'approved' ? (
                        <Badge variant="secondary" className="text-base"><CheckCircle className="h-4 w-4 mr-1"/> Approved</Badge>
                    ) : actionTaken === 'rejected' ? (
                        <Badge variant="destructive" className="text-base"><X className="h-4 w-4 mr-1"/> Rejected</Badge>
                    ) : (
                        <>
                            <Button size="sm" variant="outline" onClick={() => setIsExpanded(!isExpanded)}>
                                <Eye className="h-4 w-4 mr-1" /> {isExpanded ? 'Hide' : 'Review'}
                            </Button>
                            {actionTaken !== 'rejected' && (
                                <Button size="sm" variant="secondary" onClick={() => handleAction('approve')}>
                                    <CheckCircle className="h-4 w-4 mr-1" /> Approve
                                </Button>
                            )}
                            {actionTaken !== 'approved' && (
                                <Button size="sm" variant="destructive" onClick={() => handleAction('reject')}>
                                    <X className="h-4 w-4 mr-1" /> Reject
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </div>
            {isExpanded && (
                <div className="pt-4 border-t mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
                    <div>
                        <h5 className="font-semibold text-sm mb-2">Full Report Details:</h5>
                        <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{report.description}</p>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold text-sm mb-1">Location:</h5>
                        <p className="text-sm text-muted-foreground">{report.location || 'Not provided'}</p>
                    </div>
                    <div>
                        <h5 className="font-semibold text-sm mb-1">Incident Date:</h5>
                        <p className="text-sm text-muted-foreground">{new Date(report.date_of_incident).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <h5 className="font-semibold text-sm mb-1">Report Type:</h5>
                        <p className="text-sm text-muted-foreground">{report.is_anonymous ? 'Anonymous' : 'Identified'}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const NewsManagement = ({ allNews, onUpdate }) => {
    const [isAddingNews, setIsAddingNews] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [newNewsData, setNewNewsData] = useState({
        title: '',
        content: '',
        source: '',
        read_more_link: ''
    });

    const handleAddNews = async () => {
        try {
            await apiService.createNews(newNewsData);
            setNewNewsData({ title: '', content: '', source: '', read_more_link: '' });
            setIsAddingNews(false);
            onUpdate();
        } catch (err) {
            alert(`Failed to add news: ${err.message}`);
        }
    };

    const handleDeleteNews = async (id) => {
        if (window.confirm('Are you sure you want to delete this news article?')) {
            try {
                await apiService.deleteNews(id);
                onUpdate();
            } catch (err) {
                alert(`Failed to delete news: ${err.message}`);
            }
        }
    };

    const handleEditNews = async (id, data) => {
        try {
            await apiService.updateNews(id, data);
            setEditingNews(null);
            onUpdate();
        } catch (err) {
            alert(`Failed to update news: ${err.message}`);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">News Content Management</h3>
                <Button onClick={() => setIsAddingNews(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add News Article
                </Button>
            </div>

            {isAddingNews && (
                <Card className="border-2 border-blue-200">
                    <CardHeader>
                        <CardTitle>Add New News Article</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            placeholder="News Title"
                            value={newNewsData.title}
                            onChange={(e) => setNewNewsData({...newNewsData, title: e.target.value})}
                        />
                        <Textarea
                            placeholder="News Content"
                            value={newNewsData.content}
                            onChange={(e) => setNewNewsData({...newNewsData, content: e.target.value})}
                            rows={4}
                        />
                        <Input
                            placeholder="Source"
                            value={newNewsData.source}
                            onChange={(e) => setNewNewsData({...newNewsData, source: e.target.value})}
                        />
                        <Input
                            placeholder="Soma Zaidi Link (optional)"
                            value={newNewsData.read_more_link}
                            onChange={(e) => setNewNewsData({...newNewsData, read_more_link: e.target.value})}
                        />
                        <div className="flex gap-2">
                            <Button onClick={handleAddNews}>Add Article</Button>
                            <Button variant="outline" onClick={() => {
                                setIsAddingNews(false);
                                setNewNewsData({ title: '', content: '', source: '', read_more_link: '' });
                            }}>Cancel</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="space-y-4">
                {allNews.map((article) => (
                    <Card key={article.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{article.title}</CardTitle>
                                    <CardDescription>
                                        Source: {article.source} | Published: {new Date(article.published_date).toLocaleDateString()}
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={() => setEditingNews(article.id)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => handleDeleteNews(article.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {editingNews === article.id ? (
                                <EditNewsForm
                                    article={article}
                                    onSave={(data) => handleEditNews(article.id, data)}
                                    onCancel={() => setEditingNews(null)}
                                />
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">{article.content.substring(0, 200)}...</p>
                                    {article.read_more_link && (
                                        <p className="text-sm text-blue-600">
                                            <Globe className="h-4 w-4 inline mr-1" />
                                            Soma Zaidi: {article.read_more_link}
                                        </p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const EditNewsForm = ({ article, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: article.title,
        content: article.content,
        source: article.source,
        read_more_link: article.read_more_link || ''
    });

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <div className="space-y-4">
            <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Title"
            />
            <Textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Content"
                rows={4}
            />
            <Input
                value={formData.source}
                onChange={(e) => setFormData({...formData, source: e.target.value})}
                placeholder="Source"
            />
            <Input
                value={formData.read_more_link}
                onChange={(e) => setFormData({...formData, read_more_link: e.target.value})}
                placeholder="Soma Zaidi Link"
            />
            <div className="flex gap-2">
                <Button onClick={handleSave}>Save Changes</Button>
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
            </div>
        </div>
    );
};

export default function AdminPage() {
    const [allReports, setAllReports] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allNews, setAllNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    const fetchData = useCallback(async () => {
        if (!user?.is_admin) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const [reportsData, usersData, newsData] = await Promise.all([
                apiService.getReports(),
                apiService.getAllUsers(),
                apiService.getNews(),
            ]);
            setAllReports(reportsData);
            setAllUsers(usersData);
            setAllNews(newsData);
        } catch (err) {
            setError('Failed to fetch admin data.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!user?.is_admin) {
        return (
            <div className="text-center py-10">
                <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }
    
    const pendingReports = allReports.filter(r => r.status === 'Pending');

    return (
        <div className="py-8 px-4 max-w-7xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
                    <p className="text-xl text-muted-foreground">Report, news, and user management</p>
                </div>
                <Button onClick={fetchData} variant="outline" size="sm" disabled={isLoading}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh Data
                </Button>
            </div>

            {isLoading && <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!isLoading && !error && (
                <Tabs defaultValue="reports">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="reports"><AlertTriangle className="h-4 w-4 mr-2"/>Reports</TabsTrigger>
                        <TabsTrigger value="content"><Globe className="h-4 w-4 mr-2"/>Content</TabsTrigger>
                        <TabsTrigger value="users"><Users className="h-4 w-4 mr-2"/>Users</TabsTrigger>
                    </TabsList>

                    <TabsContent value="reports">
                        <Card>
                            <CardHeader>
                                <CardTitle>Report Management</CardTitle>
                                <CardDescription>Review and moderate submitted reports.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {pendingReports.length > 0 ? pendingReports.map((report) => (
                                        <ReportCard key={report.id} report={report} onUpdate={fetchData} />
                                    )) : (
                                        <p className="text-center text-muted-foreground py-4">No pending reports.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="content">
                        <Card>
                            <CardHeader>
                                <CardTitle>Content Verification</CardTitle>
                                <CardDescription>Manage news articles and content verification.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <NewsManagement allNews={allNews} onUpdate={fetchData} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="users">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Management</CardTitle>
                                <CardDescription>Monitor user activity and manage account status.</CardDescription>
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
                                                    <p className="text-sm text-muted-foreground">Email: {u.email}</p>
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
}