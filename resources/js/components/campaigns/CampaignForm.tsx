import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { 
  Calendar, 
  Clock, 
  Image as ImageIcon, 
  MessageSquare, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Instagram,
  Sparkles,
  X
} from 'lucide-react';
import { Platform } from '../../types';
import AIContentGenerator from './AIContentGenerator';

interface CampaignFormProps {
  onSave: (campaignData: any) => void;
  onCancel: () => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [scheduleType, setScheduleType] = useState<'immediate' | 'scheduled' | 'recurring'>('immediate');
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [recurringInterval, setRecurringInterval] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [recurringCount, setRecurringCount] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['whatsapp']);
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [useAI, setUseAI] = useState(false);

  const platforms: { id: Platform; name: string; icon: React.ReactNode }[] = [
    { id: 'whatsapp', name: 'WhatsApp', icon: <MessageSquare size={20} /> },
    { id: 'facebook', name: 'Facebook', icon: <Facebook size={20} /> },
    { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin size={20} /> },
    { id: 'twitter', name: 'X (Twitter)', icon: <Twitter size={20} /> },
    { id: 'instagram', name: 'Instagram', icon: <Instagram size={20} /> },
  ];

  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server
      const fakeUrl = URL.createObjectURL(file);
      setImageUrl(fakeUrl);
    }
  };

  const handleAIGenerated = (generatedContent: string) => {
    setContent(generatedContent);
    setUseAI(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const campaignData = {
      name,
      description,
      content: {
        text: content,
        image_url: imageUrl,
      },
      schedule: {
        type: scheduleType,
        ...(scheduleType === 'scheduled' && { scheduled_date: scheduledDate }),
        ...(scheduleType === 'recurring' && {
          recurring_interval: recurringInterval,
          recurring_count: recurringCount,
          start_date: startDate,
          end_date: endDate,
        }),
      },
      platform: selectedPlatforms,
      status: scheduleType === 'immediate' ? 'running' : 'scheduled',
    };

    onSave(campaignData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Create New Campaign</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Platforms
            </label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    selectedPlatforms.includes(platform.id)
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {platform.icon}
                  <span className="ml-2">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule Type
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setScheduleType('immediate')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  scheduleType === 'immediate'
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Send Immediately
              </button>
              <button
                type="button"
                onClick={() => setScheduleType('scheduled')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  scheduleType === 'scheduled'
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Schedule for Later
              </button>
              <button
                type="button"
                onClick={() => setScheduleType('recurring')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  scheduleType === 'recurring'
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Recurring
              </button>
            </div>
          </div>

          {scheduleType === 'scheduled' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule Date & Time
              </label>
              <div className="relative">
                <DatePicker
                  selected={scheduledDate}
                  onChange={(date) => setScheduledDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                  placeholderText="Select date and time"
                />
              </div>
            </div>
          )}

          {scheduleType === 'recurring' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recurring Interval
                </label>
                <select
                  value={recurringInterval}
                  onChange={(e) => setRecurringInterval(e.target.value as any)}
                  className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Occurrences
                </label>
                <input
                  type="number"
                  min="1"
                  value={recurringCount}
                  onChange={(e) => setRecurringCount(parseInt(e.target.value))}
                  className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                    placeholderText="Select start date"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                    placeholderText="Select end date"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Message Content
              </label>
              <button
                type="button"
                onClick={() => setUseAI(true)}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-teal-700 bg-teal-100 rounded-md hover:bg-teal-200"
              >
                <Sparkles size={16} className="mr-2" />
                Generate with AI
              </button>
            </div>
            
            {!useAI ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                placeholder="Enter your message content..."
              />
            ) : (
              <AIContentGenerator
                onGenerate={async (request) => {
                  // In a real app, this would call an AI service
                  return `Generated content based on ${request.type === 'keywords' ? 'keywords' : 'image'}`;
                }}
                onApply={handleAIGenerated}
                platform={selectedPlatforms[0]}
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image (Optional)
            </label>
            
            {imageUrl ? (
              <div className="relative mb-4">
                <img
                  src={imageUrl}
                  alt="Campaign"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>
            ) : (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <ImageIcon size={24} className="mx-auto text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                    >
                      <span>Upload an image</span>
                      <input
                        id="image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Create Campaign
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;