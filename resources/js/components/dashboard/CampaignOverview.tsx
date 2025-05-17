import React from 'react';
import { Campaign } from '../../types';
import { Calendar, Clock, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';

interface CampaignOverviewProps {
  campaigns: Campaign[];
  onViewAll: () => void;
}

const CampaignOverview: React.FC<CampaignOverviewProps> = ({ campaigns, onViewAll }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Clock size={16} className="text-gray-500" />;
      case 'scheduled':
        return <Calendar size={16} className="text-blue-500" />;
      case 'running':
        return <MessageSquare size={16} className="text-green-500" />;
      case 'completed':
        return <CheckCircle size={16} className="text-teal-500" />;
      case 'failed':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-teal-100 text-teal-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Campaign Overview</h2>
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-teal-600 hover:text-teal-800"
          >
            View all
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
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Platform
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                  <div className="text-xs text-gray-500 truncate max-w-xs">
                    {campaign.description || 'No description'}
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campaign.schedule.type === 'scheduled' && campaign.schedule.scheduled_date
                    ? formatDate(campaign.schedule.scheduled_date)
                    : campaign.schedule.type === 'recurring'
                    ? 'Recurring'
                    : 'Immediate'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getStatusColor(
                      campaign.status
                    )}`}
                  >
                    {getStatusIcon(campaign.status)}
                    <span className="ml-1 capitalize">{campaign.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {campaigns.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No campaigns available. Create your first campaign to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignOverview;