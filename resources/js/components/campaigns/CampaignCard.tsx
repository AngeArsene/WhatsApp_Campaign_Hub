import React from 'react';
import { Campaign } from '../../types';
import { Clock, Calendar, CheckCircle, AlertCircle, MessageSquare, BarChart3, Edit, Trash2, ExternalLink } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
  onView: (campaign: Campaign) => void;
  onViewReports: (campaign: Campaign) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ 
  campaign, 
  onEdit, 
  onDelete, 
  onView, 
  onViewReports 
}) => {
  const getStatusIcon = () => {
    switch (campaign.status) {
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
  
  const getStatusColor = () => {
    switch (campaign.status) {
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
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
      {campaign.content.image_url && (
        <div className="relative h-40 bg-gray-200">
          <img 
            src={campaign.content.image_url} 
            alt={campaign.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 flex space-x-1">
            {campaign.platform.includes('whatsapp') && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                WhatsApp
              </span>
            )}
            {campaign.platform.includes('facebook') && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                FB
              </span>
            )}
            {campaign.platform.includes('instagram') && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-pink-100 text-pink-800">
                IG
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-900 truncate">{campaign.name}</h3>
          <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="ml-1 capitalize">{campaign.status}</span>
          </span>
        </div>
        
        {campaign.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{campaign.description}</p>
        )}
        
        <div className="mb-3">
          <p className="text-sm text-gray-600 line-clamp-2">
            {campaign.content.text || 'No text content'}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div>
            {campaign.schedule.type === 'scheduled' && campaign.schedule.scheduled_date && (
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{formatDate(campaign.schedule.scheduled_date)}</span>
              </div>
            )}
            {campaign.schedule.type === 'recurring' && (
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>Recurring {campaign.schedule.recurring_interval}</span>
              </div>
            )}
            {campaign.schedule.type === 'immediate' && (
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>Immediate</span>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{formatDate(campaign.created_at)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(campaign)}
              className="p-1 text-gray-500 hover:text-teal-600 transition-colors"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={() => onDelete(campaign.id)}
              className="p-1 text-gray-500 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => onViewReports(campaign)}
              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <BarChart3 size={16} />
            </button>
            <button 
              onClick={() => onView(campaign)}
              className="p-1 text-gray-500 hover:text-teal-600 transition-colors"
            >
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;