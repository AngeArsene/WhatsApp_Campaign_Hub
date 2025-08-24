import React, { useState } from 'react';
import CampaignsList from '../components/campaigns/CampaignsList';
import CampaignForm from '../components/campaigns/CampaignForm';
import { mockCampaigns } from '../data/mockData';
import { Campaign } from '../types';
import Layout from '@/Layouts/Main/Layout';

const CampaignsPage: React.FC = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
    const [showForm, setShowForm] = useState(false);

    const handleAddCampaign = (campaignData: any) => {
        const newCampaign: Campaign = {
            id: Date.now().toString(),
            ...campaignData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        setCampaigns([...campaigns, newCampaign]);
        setShowForm(false);
    };

    const handleEditCampaign = (campaign: Campaign) => {
        // In a real app, this would navigate to a campaign edit page
        console.log('Edit campaign', campaign.id);
    };

    const handleDeleteCampaign = (id: string) => {
        setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    };

    const handleViewCampaign = (campaign: Campaign) => {
        // In a real app, this would navigate to a campaign details page
        console.log('View campaign', campaign.id);
    };

    const handleViewReports = (campaign: Campaign) => {
        // In a real app, this would navigate to a campaign reports page
        console.log('View reports for campaign', campaign.id);
    };

    return (
        <Layout>
            <div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
                    <p className="text-gray-600">Create and manage your marketing campaigns</p>
                </div>

                {showForm ? (
                    <CampaignForm
                        onSave={handleAddCampaign}
                        onCancel={() => setShowForm(false)}
                    />
                ) : (
                    <CampaignsList
                        campaigns={campaigns}
                        onAdd={() => setShowForm(true)}
                        onEdit={handleEditCampaign}
                        onDelete={handleDeleteCampaign}
                        onView={handleViewCampaign}
                        onViewReports={handleViewReports}
                    />
                )}
            </div>
        </Layout>
    );
};

export default CampaignsPage;
