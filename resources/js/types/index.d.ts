export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

// Define our core types for the application

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

export type StrippedContact = Omit<Contact, 'id' | 'created_at' | 'updated_at'>;

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  content: CampaignContent;
  schedule: CampaignSchedule;
  platform: Platform[];
  status: CampaignStatus;
  created_at: string;
  updated_at: string;
}

export interface CampaignContent {
  text?: string;
  image_url?: string;
  generated_from?: 'keywords' | 'image';
  keywords?: string[];
  source_image_url?: string;
}

export interface CampaignSchedule {
  type: 'immediate' | 'scheduled' | 'recurring';
  scheduled_date?: string;
  recurring_interval?: 'daily' | 'weekly' | 'monthly';
  recurring_count?: number;
  start_date?: string;
  end_date?: string;
}

export type Platform = 'whatsapp' | 'facebook' | 'linkedin' | 'twitter' | 'instagram';

export type CampaignStatus = 'draft' | 'scheduled' | 'running' | 'completed' | 'failed';

export interface CampaignReport {
  id: string;
  campaign_id: string;
  date_range: {
    start: string;
    end: string;
  };
  metrics: {
    delivered: number;
    read: number;
    clicked?: number;
    responded?: number;
  };
  status: 'generated' | 'delivered';
  created_at: string;
}

export interface AIGenerationRequest {
  type: 'keywords' | 'image';
  keywords?: string[];
  image_url?: string;
  target_platform: Platform;
  tone?: 'professional' | 'casual' | 'friendly' | 'urgent';
  max_length?: number;
}

export interface ScheduledReport {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  recipient_type: 'phone' | 'admin';
  recipient_value?: string;
  last_sent?: string;
  next_scheduled: string;
}
