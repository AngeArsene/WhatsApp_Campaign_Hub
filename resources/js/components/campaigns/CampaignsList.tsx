import React, { useState } from 'react';
import { Campaign } from '../../types';
import CampaignCard from './CampaignCard';
import { Plus, Search, Filter, SortDesc } from 'lucide-react';

interface CampaignsListProps {
  campaigns: Campaign[];
  onAdd: () => void;
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
  onView: (campaign: Campaign) => void;
  onViewReports: (campaign: Campaign) => void;
}

const CampaignsList: React.FC<CampaignsListProps> = ({
  campaigns,
  onAdd,
  onEdit,
  onDelete,
  onView,
  onViewReports
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  
  const filteredCampaigns = campaigns.filter(campaign => {
    // Search filter
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (campaign.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    
    // Platform filter
    const matchesPlatform = filterPlatform === 'all' || campaign.platform.includes(filterPlatform as any);
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search campaigns..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none pl-8 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 bg-white"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={16} className="text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="appearance-none pl-8 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 bg-white"
            >
              <option value="all">All Platforms</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SortDesc size={16} className="text-gray-400" />
            </div>
          </div>
          
          <button
            onClick={onAdd}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <Plus size={16} className="mr-2" />
            New Campaign
          </button>
        </div>
      </div>
      
      {filteredCampaigns.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <Search size={48} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No campaigns found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterStatus !== 'all' || filterPlatform !== 'all'
              ? 'Try adjusting your search or filters to find what you\'re looking for.'
              : 'Get started by creating your first campaign.'}
          </p>
          <button
            onClick={onAdd}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <Plus size={16} className="mr-2" />
            New Campaign
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
              onViewReports={onViewReports}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignsList;