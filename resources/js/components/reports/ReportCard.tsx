import React from 'react';
import { CampaignReport, Campaign } from '../../types';
import { BarChart3, Calendar, Download, Send, ExternalLink } from 'lucide-react';

interface ReportCardProps {
  report: CampaignReport;
  campaign: Campaign;
  onSend: (report: CampaignReport) => void;
  onDownload: (report: CampaignReport) => void;
  onView: (report: CampaignReport) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ 
  report, 
  campaign,
  onSend, 
  onDownload, 
  onView 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getDeliveryRate = () => {
    return (report.metrics.read / report.metrics.delivered * 100).toFixed(1);
  };
  
  const getClickRate = () => {
    if (!report.metrics.clicked) return 'N/A';
    return (report.metrics.clicked / report.metrics.delivered * 100).toFixed(1);
  };
  
  const getResponseRate = () => {
    if (!report.metrics.responded) return 'N/A';
    return (report.metrics.responded / report.metrics.delivered * 100).toFixed(1);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 size={18} className="text-teal-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">{campaign.name} Report</h3>
          </div>
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${
            report.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {report.status === 'delivered' ? 'Delivered' : 'Generated'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>
              {formatDate(report.date_range.start)} - {formatDate(report.date_range.end)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Created: {formatDate(report.created_at)}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-md text-center">
            <div className="text-2xl font-semibold text-teal-600">{report.metrics.delivered}</div>
            <div className="text-xs text-gray-500">Messages Delivered</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-md text-center">
            <div className="text-2xl font-semibold text-teal-600">{report.metrics.read}</div>
            <div className="text-xs text-gray-500">Messages Read</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-md text-center">
            <div className="text-2xl font-semibold text-teal-600">{report.metrics.clicked || 0}</div>
            <div className="text-xs text-gray-500">Link Clicks</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-md text-center">
            <div className="text-2xl font-semibold text-teal-600">{report.metrics.responded || 0}</div>
            <div className="text-xs text-gray-500">Responses</div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Metrics</h4>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">Read Rate</span>
                <span className="font-medium">{getDeliveryRate()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-teal-500 h-2 rounded-full" 
                  style={{ width: `${getDeliveryRate()}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">Click Rate</span>
                <span className="font-medium">{getClickRate()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${getClickRate() === 'N/A' ? 0 : getClickRate()}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">Response Rate</span>
                <span className="font-medium">{getResponseRate()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${getResponseRate() === 'N/A' ? 0 : getResponseRate()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <button
              onClick={() => onView(report)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <ExternalLink size={12} className="mr-1" />
              View Details
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onDownload(report)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <Download size={12} className="mr-1" />
              Download
            </button>
            <button
              onClick={() => onSend(report)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <Send size={12} className="mr-1" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;