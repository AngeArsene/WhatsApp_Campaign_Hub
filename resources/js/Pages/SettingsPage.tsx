import React, { useState } from 'react';
import {
    Settings,
    User,
    Bell,
    Key,
    MessageSquare,
    Facebook,
    Linkedin,
    Twitter,
    Instagram,
    ChevronRight
} from 'lucide-react';
import Layout from '@/components/layout/Layout';

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User size={20} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
        { id: 'security', label: 'Security', icon: <Key size={20} /> },
        { id: 'integrations', label: 'API & Integrations', icon: <Settings size={20} /> },
        { id: 'whatsapp', label: 'WhatsApp Settings', icon: <MessageSquare size={20} /> },
        { id: 'socials', label: 'Social Media', icon: <Facebook size={20} /> },
    ];

    return (
        <Layout>
            <div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600">Manage your account settings and preferences</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        <div className="bg-gray-50 border-r border-gray-200 p-4">
                            <nav className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.id
                                                ? 'bg-teal-50 text-teal-700'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <span className={`mr-3 ${activeTab === tab.id ? 'text-teal-500' : 'text-gray-500'}`}>
                                            {tab.icon}
                                        </span>
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="col-span-3 p-6">
                            {activeTab === 'profile' && (
                                <div>
                                    <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Settings</h2>

                                    <div className="mb-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-16 w-16 rounded-full bg-teal-600 flex items-center justify-center text-white text-lg font-medium">
                                                JS
                                            </div>
                                            <div>
                                                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                                    Upload photo
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                                                First Name
                                            </label>
                                            <input
                                                id="first-name"
                                                type="text"
                                                defaultValue="John"
                                                className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Last Name
                                            </label>
                                            <input
                                                id="last-name"
                                                type="text"
                                                defaultValue="Smith"
                                                className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Email Address
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                defaultValue="john.smith@example.com"
                                                className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone Number
                                            </label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                defaultValue="+1234567890"
                                                className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 mt-6">
                                        <div className="flex justify-end">
                                            <button
                                                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'socials' && (
                                <div>
                                    <h2 className="text-lg font-medium text-gray-900 mb-6">Social Media Accounts</h2>

                                    <div className="space-y-4">
                                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                                            <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <Facebook size={20} className="text-blue-600 mr-3" />
                                                    <h3 className="font-medium text-gray-900">Facebook</h3>
                                                </div>
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Connected
                                                </span>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-sm text-gray-600 mb-4">
                                                    Your Facebook page is connected. You can post updates and images directly to your page.
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-700">Connected Page:</span>
                                                        <span className="text-sm text-gray-600 ml-2">My Business Page</span>
                                                    </div>
                                                    <button
                                                        className="px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    >
                                                        Disconnect
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                                            <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <Instagram size={20} className="text-pink-600 mr-3" />
                                                    <h3 className="font-medium text-gray-900">Instagram</h3>
                                                </div>
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Connected
                                                </span>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-sm text-gray-600 mb-4">
                                                    Your Instagram business account is connected.
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-700">Connected Account:</span>
                                                        <span className="text-sm text-gray-600 ml-2">@mybusiness</span>
                                                    </div>
                                                    <button
                                                        className="px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    >
                                                        Disconnect
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                                            <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <Twitter size={20} className="text-blue-400 mr-3" />
                                                    <h3 className="font-medium text-gray-900">X (Twitter)</h3>
                                                </div>
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    Not connected
                                                </span>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-sm text-gray-600 mb-4">
                                                    Connect your X (formerly Twitter) account to post updates directly.
                                                </p>
                                                <button
                                                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                >
                                                    Connect Account
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                                            <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <Linkedin size={20} className="text-blue-700 mr-3" />
                                                    <h3 className="font-medium text-gray-900">LinkedIn</h3>
                                                </div>
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    Not connected
                                                </span>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-sm text-gray-600 mb-4">
                                                    Connect your LinkedIn profile or page to share updates with your professional network.
                                                </p>
                                                <button
                                                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                >
                                                    Connect Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'whatsapp' && (
                                <div>
                                    <h2 className="text-lg font-medium text-gray-900 mb-6">WhatsApp Settings</h2>

                                    <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                                        <div className="flex">
                                            <MessageSquare size={20} className="text-green-600 mr-3 shrink-0" />
                                            <div>
                                                <h3 className="text-sm font-medium text-green-800">WhatsApp Business API Connected</h3>
                                                <p className="text-sm text-green-700 mt-1">
                                                    Your WhatsApp Business account is properly configured and ready to use.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label htmlFor="business-name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Business Display Name
                                            </label>
                                            <input
                                                id="business-name"
                                                type="text"
                                                defaultValue="My Business"
                                                className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="whatsapp-number" className="block text-sm font-medium text-gray-700 mb-1">
                                                WhatsApp Business Number
                                            </label>
                                            <input
                                                id="whatsapp-number"
                                                type="tel"
                                                defaultValue="+1234567890"
                                                disabled
                                                className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Message Settings</h3>

                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <input
                                                    id="include-opt-out"
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="include-opt-out" className="ml-2 block text-sm text-gray-700">
                                                    Include opt-out instructions in all messages
                                                </label>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    id="delivery-reports"
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="delivery-reports" className="ml-2 block text-sm text-gray-700">
                                                    Enable delivery reports
                                                </label>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    id="read-receipts"
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="read-receipts" className="ml-2 block text-sm text-gray-700">
                                                    Enable read receipts
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-sm font-medium text-gray-700 mb-3">API Settings</h3>

                                        <div>
                                            <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">
                                                WhatsApp API Key
                                            </label>
                                            <div className="flex">
                                                <input
                                                    id="api-key"
                                                    type="password"
                                                    defaultValue="••••••••••••••••••••••"
                                                    className="block w-full rounded-l-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                                                />
                                                <button
                                                    className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                >
                                                    Show
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 mt-6">
                                        <div className="flex justify-end">
                                            <button
                                                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            >
                                                Save Settings
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;
