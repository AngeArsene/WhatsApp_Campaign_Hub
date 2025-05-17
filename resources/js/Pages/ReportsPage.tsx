import React from 'react';
import { mockReports, mockCampaigns } from '../data/mockData';
import ReportCard from '../components/reports/ReportCard';
import { Calendar, Plus, Send } from 'lucide-react';
import { CampaignReport } from '../types';
import Layout from '@/components/layout/Layout';

const ReportsPage: React.FC = () => {
    const handleSendReport = (report: CampaignReport) => {
        console.log('Send report', report.id);
    };

    const handleDownloadReport = (report: CampaignReport) => {
        console.log('Download report', report.id);
    };

    const handleViewReport = (report: CampaignReport) => {
        console.log('View report', report.id);
    };

    const getCampaignById = (id: string) => {
        return mockCampaigns.find(campaign => campaign.id === id) || mockCampaigns[0];
    };

    return (
        <Layout>
            <div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                    <p className="text-gray-600">View and analyze your campaign performance</p>
                </div>

                <div className="mb-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Generate New Report</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="campaign" className="block text-sm font-medium text-gray-700 mb-1">
                                    Campaign
                                </label>
                                <select
                                    id="campaign"
                                    className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                                >
                                    <option value="">Select campaign</option>
                                    {mockCampaigns.map(campaign => (
                                        <option key={campaign.id} value={campaign.id}>
                                            {campaign.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">
                                    Date Range
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="date-range"
                                        placeholder="Select date range"
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <Plus size={16} className="mr-2" />
                                Generate Report
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Recent Reports</h2>
                    <button
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <Send size={16} className="mr-2" />
                        Schedule Reports
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockReports.map(report => (
                        <ReportCard
                            key={report.id}
                            report={report}
                            campaign={getCampaignById(report.campaign_id)}
                            onSend={handleSendReport}
                            onDownload={handleDownloadReport}
                            onView={handleViewReport}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ReportsPage;
