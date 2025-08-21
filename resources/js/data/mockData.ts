import { Campaign, CampaignReport, Contact, ScheduledReport } from '../types';

// Mock data for development
export const mockContacts: Contact[] = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    phone_number: '+1234567890',
    created_at: '2025-01-01T10:00:00Z',
    updated_at: '2025-01-01T10:00:00Z'
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    phone_number: '+1987654321',
    created_at: '2025-01-02T11:30:00Z',
    updated_at: '2025-01-02T11:30:00Z'
  },
  {
    id: 3,
    first_name: 'Michael',
    last_name: 'Johnson',
    phone_number: '+1122334455',
    created_at: '2025-01-03T09:15:00Z',
    updated_at: '2025-01-03T09:15:00Z'
  },
  {
    id: 4,
    first_name: 'Sarah',
    last_name: 'Williams',
    phone_number: '+1555666777',
    created_at: '2025-01-04T14:45:00Z',
    updated_at: '2025-01-04T14:45:00Z'
  },
  {
    id: 5,
    first_name: 'David',
    last_name: 'Brown',
    phone_number: '+1999888777',
    created_at: '2025-01-05T16:20:00Z',
    updated_at: '2025-01-05T16:20:00Z'
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale Announcement',
    description: 'Announcing our summer sale with special discounts',
    content: {
      text: 'Don\'t miss our SUMMER SALE! Get up to 50% off on all products. Limited time only!',
      image_url: 'https://images.pexels.com/photos/3943882/pexels-photo-3943882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      generated_from: 'keywords',
      keywords: ['summer', 'sale', 'discount', 'limited']
    },
    schedule: {
      type: 'scheduled',
      scheduled_date: '2025-06-15T09:00:00Z'
    },
    platform: ['whatsapp', 'facebook', 'instagram'],
    status: 'scheduled',
    created_at: '2025-06-01T10:00:00Z',
    updated_at: '2025-06-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Weekly Newsletter',
    description: 'Weekly updates and news for customers',
    content: {
      text: 'Here\'s your weekly update! Check out our new arrivals and read the latest industry news.',
      generated_from: 'keywords',
      keywords: ['weekly', 'newsletter', 'update', 'news']
    },
    schedule: {
      type: 'recurring',
      recurring_interval: 'weekly',
      recurring_count: 10,
      start_date: '2025-01-10T08:00:00Z',
      end_date: '2025-03-14T08:00:00Z'
    },
    platform: ['whatsapp', 'linkedin'],
    status: 'running',
    created_at: '2025-01-05T11:30:00Z',
    updated_at: '2025-01-05T11:30:00Z'
  },
  {
    id: '3',
    name: 'Product Launch',
    description: 'New product announcement',
    content: {
      text: 'Introducing our revolutionary new product! Be the first to experience it.',
      image_url: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      generated_from: 'keywords',
      keywords: ['product', 'launch', 'new', 'innovation']
    },
    schedule: {
      type: 'immediate'
    },
    platform: ['whatsapp', 'facebook', 'linkedin', 'twitter', 'instagram'],
    status: 'completed',
    created_at: '2025-02-20T09:45:00Z',
    updated_at: '2025-02-20T09:45:00Z'
  }
];

export const mockReports: CampaignReport[] = [
  {
    id: '1',
    campaign_id: '1',
    date_range: {
      start: '2025-06-15T00:00:00Z',
      end: '2025-06-22T23:59:59Z'
    },
    metrics: {
      delivered: 120,
      read: 98,
      clicked: 45,
      responded: 12
    },
    status: 'generated',
    created_at: '2025-06-23T10:00:00Z'
  },
  {
    id: '2',
    campaign_id: '2',
    date_range: {
      start: '2025-01-10T00:00:00Z',
      end: '2025-01-17T23:59:59Z'
    },
    metrics: {
      delivered: 85,
      read: 72,
      clicked: 28,
      responded: 8
    },
    status: 'delivered',
    created_at: '2025-01-18T09:30:00Z'
  },
  {
    id: '3',
    campaign_id: '3',
    date_range: {
      start: '2025-02-20T00:00:00Z',
      end: '2025-02-27T23:59:59Z'
    },
    metrics: {
      delivered: 200,
      read: 175,
      clicked: 95,
      responded: 32
    },
    status: 'delivered',
    created_at: '2025-02-28T11:15:00Z'
  }
];

export const mockScheduledReports: ScheduledReport[] = [
  {
    id: '1',
    name: 'Weekly Performance Report',
    frequency: 'weekly',
    recipient_type: 'admin',
    last_sent: '2025-05-21T08:00:00Z',
    next_scheduled: '2025-05-28T08:00:00Z'
  },
  {
    id: '2',
    name: 'Monthly Summary',
    frequency: 'monthly',
    recipient_type: 'phone',
    recipient_value: '+1234567890',
    last_sent: '2025-04-30T09:00:00Z',
    next_scheduled: '2025-05-31T09:00:00Z'
  }
];
