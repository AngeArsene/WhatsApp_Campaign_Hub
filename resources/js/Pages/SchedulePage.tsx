import React, { useState } from 'react';
import { mockCampaigns, mockScheduledReports } from '../data/mockData';
import { Calendar, Clock, Plus, Trash2, Edit } from 'lucide-react';
import { ScheduledReport, Campaign } from '../types';
import CampaignScheduleForm from '../components/schedule/CampaignScheduleForm';
import AutomatedReportForm from '../components/schedule/AutomatedReportForm';
import Layout from '@/Layouts/Main/Layout';

const SchedulePage: React.FC = () => {
    const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>(mockScheduledReports);
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [showAutomateForm, setShowAutomateForm] = useState(false);

    const handleDeleteSchedule = (id: string) => {
        setScheduledReports(scheduledReports.filter(report => report.id !== id));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatFrequency = (frequency: string) => {
        return frequency.charAt(0).toUpperCase() + frequency.slice(1);
    };

    const handleSaveSchedule = (scheduleData: any) => {
        // In a real app, this would save to the backend
        console.log('Save schedule:', scheduleData);
        setShowScheduleForm(false);
    };

    const handleSaveAutomation = (reportData: any) => {
        const newReport: ScheduledReport = {
            id: Date.now().toString(),
            ...reportData,
            last_sent: undefined,
        };

        setScheduledReports([...scheduledReports, newReport]);
        setShowAutomateForm(false);
    };

    return (
        <Layout>
            <div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
                    <p className="text-gray-600">Manage your scheduled campaigns and reports</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="p-4 sm:p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-medium text-gray-900">Scheduled Campaigns</h2>
                                <button
                                    onClick={() => setShowScheduleForm(true)}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <Plus size={14} className="mr-1" />
                                    Schedule
                                </button>
                            </div>
                        </div>

                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Campaign
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Schedule
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Platforms
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative px-6 py-3"
                                        >
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {mockCampaigns
                                        .filter(campaign => campaign.status === 'scheduled')
                                        .map((campaign) => (
                                            <tr key={campaign.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        {campaign.schedule.type === 'scheduled' && campaign.schedule.scheduled_date ? (
                                                            <>
                                                                <Calendar size={14} className="mr-1" />
                                                                {new Date(campaign.schedule.scheduled_date).toLocaleDateString()}
                                                            </>
                                                        ) : campaign.schedule.type === 'recurring' ? (
                                                            <>
                                                                <Clock size={14} className="mr-1" />
                                                                {campaign.schedule.recurring_interval === 'daily' && 'Daily'}
                                                                {campaign.schedule.recurring_interval === 'weekly' && 'Weekly'}
                                                                {campaign.schedule.recurring_interval === 'monthly' && 'Monthly'}
                                                            </>
                                                        ) : (
                                                            'Immediate'
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex space-x-1">
                                                        {campaign.platform.map((p) => (
                                                            <span
                                                                key={p}
                                                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize"
                                                            >
                                                                {p}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <button className="text-gray-500 hover:text-teal-600">
                                                            <Edit size={16} />
                                                        </button>
                                                        <button className="text-gray-500 hover:text-red-600">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>

                            {mockCampaigns.filter(campaign => campaign.status === 'scheduled').length === 0 && (
                                <div className="py-8 text-center text-gray-500">
                                    No scheduled campaigns. Create one by scheduling a campaign.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="p-4 sm:p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-medium text-gray-900">Automated Reports</h2>
                                <button
                                    onClick={() => setShowAutomateForm(true)}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <Plus size={14} className="mr-1" />
                                    Automate
                                </button>
                            </div>
                        </div>

                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Report Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Frequency
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Next Send
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative px-6 py-3"
                                        >
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {scheduledReports.map((report) => (
                                        <tr key={report.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{report.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatFrequency(report.frequency)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(report.next_scheduled)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button className="text-gray-500 hover:text-teal-600">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        className="text-gray-500 hover:text-red-600"
                                                        onClick={() => handleDeleteSchedule(report.id)}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {scheduledReports.length === 0 && (
                                <div className="py-8 text-center text-gray-500">
                                    No automated reports. Set up automated reporting to send reports on a schedule.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {showScheduleForm && (
                    <CampaignScheduleForm
                        onSave={handleSaveSchedule}
                        onCancel={() => setShowScheduleForm(false)}
                    />
                )}

                {showAutomateForm && (
                    <AutomatedReportForm
                        onSave={handleSaveAutomation}
                        onCancel={() => setShowAutomateForm(false)}
                    />
                )}
            </div>
        </Layout>
    );
};

export default SchedulePage;
