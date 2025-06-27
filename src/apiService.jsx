const API_URL = 'http://127.0.0.1:5000/api';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

const request = async (endpoint, method = 'GET', data = null) => {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const token = getAuthToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (data) {
        config.body = JSON.stringify(data);
    }
    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        if (response.status === 204 || (response.status === 200 && method === 'DELETE')) {
            return { message: 'Action successful' };
        }
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'An unknown error occurred.');
        }
        return responseData;
    } catch (error) {
        console.error(`API Error on ${method} ${endpoint}:`, error);
        throw error;
    }
};

export const apiService = {
    // Authentication
    login: (credentials) => request('/auth/login', 'POST', credentials),
    signup: (userData) => request('/auth/signup', 'POST', userData),
    googleLogin: (token) => request('/auth/google-login', 'POST', { token }),
    
    // General data
    getHomeSummary: () => request('/home_summary'),
    
    // Reports
    createReport: (reportData) => request('/reports', 'POST', reportData),
    getReports: () => request('/reports'),
    
    // News
    getNews: () => request('/news'),
    createNews: (newsData) => request('/admin/news', 'POST', newsData),
    updateNews: (id, newsData) => request(`/admin/news/${id}`, 'PUT', newsData),
    deleteNews: (id) => request(`/admin/news/${id}`, 'DELETE'),
    
    // Admin - Users
    getAllUsers: () => request('/admin/users'),
    
    // Admin - Reports
    verifyReport: (id) => request(`/admin/reports/verify/${id}`, 'PUT'),
    rejectReport: (id) => request(`/admin/reports/reject/${id}`, 'PUT'),
};