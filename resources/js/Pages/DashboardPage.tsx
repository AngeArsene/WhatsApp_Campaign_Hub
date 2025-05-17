import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Users, MessageSquare, BarChart3, Calendar } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import CampaignOverview from '../components/dashboard/CampaignOverview';
import { mockCampaigns, mockContacts } from '../data/mockData';
import Layout from '@/components/layout/Layout';

const DashboardPage: React.FC = () => {
    //   const navigate = useNavigate();

    const stats = [
        {
            title: 'Total Contacts',
            value: mockContacts.length,
            icon: <Users size={20} />,
            change: { value: 12.5, isPositive: true },
            trend: [30, 40, 45, 50, 55, 70]
        },
        {
            title: 'Active Campaigns',
            value: mockCampaigns.filter(c => c.status === 'running').length,
            icon: <MessageSquare size={20} />,
            change: { value: 8.2, isPositive: true },
            trend: [25, 35, 45, 30, 50, 60]
        },
        {
            title: 'Scheduled Campaigns',
            value: mockCampaigns.filter(c => c.status === 'scheduled').length,
            icon: <Calendar size={20} />,
            trend: [40, 30, 20, 45, 50, 60]
        },
        {
            title: 'Completed Campaigns',
            value: mockCampaigns.filter(c => c.status === 'completed').length,
            icon: <BarChart3 size={20} />,
            change: { value: 3.8, isPositive: false },
            trend: [60, 65, 75, 55, 80, 65]
        }
    ];

    // Get the latest 5 campaigns
    const recentCampaigns = [...mockCampaigns]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

    return (
        <Layout>
            <div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Welcome to your WhatsApp Campaign Hub dashboard</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            change={stat.change}
                            trend={stat.trend}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CampaignOverview
                        campaigns={recentCampaigns}
                        onViewAll={() => { }}
                    />

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={() => { }}
                                className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                            >
                                <Users size={24} className="text-teal-600 mb-2" />
                                <h3 className="font-medium text-gray-900">Add Contacts</h3>
                                <p className="text-sm text-gray-500">Add new contacts to your database</p>
                            </button>

                            <button
                                onClick={() => { }}
                                className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                            >
                                <MessageSquare size={24} className="text-teal-600 mb-2" />
                                <h3 className="font-medium text-gray-900">Create Campaign</h3>
                                <p className="text-sm text-gray-500">Start a new marketing campaign</p>
                            </button>

                            <button
                                onClick={() => { }}
                                className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                            >
                                <BarChart3 size={24} className="text-teal-600 mb-2" />
                                <h3 className="font-medium text-gray-900">View Reports</h3>
                                <p className="text-sm text-gray-500">Analyze campaign performance</p>
                            </button>

                            <button
                                onClick={() => { }}
                                className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                            >
                                <Calendar size={24} className="text-teal-600 mb-2" />
                                <h3 className="font-medium text-gray-900">Schedule Messages</h3>
                                <p className="text-sm text-gray-500">Set up recurring campaigns</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
