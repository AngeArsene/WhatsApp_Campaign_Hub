import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Clock, X } from 'lucide-react';
import { Campaign, Platform } from '../../types';

interface CampaignScheduleFormProps {
  onSave: (scheduleData: any) => void;
  onCancel: () => void;
}

const CampaignScheduleForm: React.FC<CampaignScheduleFormProps> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [scheduleType, setScheduleType] = useState<'scheduled' | 'recurring'>('scheduled');
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [recurringInterval, setRecurringInterval] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [recurringCount, setRecurringCount] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['whatsapp']);

  const platforms: { id: Platform; name: string }[] = [
    { id: 'whatsapp', name: 'WhatsApp' },
    { id: 'facebook', name: 'Facebook' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'twitter', name: 'X (Twitter)' },
    { id: 'instagram', name: 'Instagram' },
  ];

  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const scheduleData = {
      name,
      description,
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
      status: 'scheduled',
    };

    onSave(scheduleData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Schedule Campaign</h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

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
                Schedule Type
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setScheduleType('scheduled')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    scheduleType === 'scheduled'
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  One-time Schedule
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
                  Recurring Schedule
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Platforms
              </label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      selectedPlatforms.includes(platform.id)
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {platform.name}
                  </button>
                ))}
              </div>
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
                Schedule Campaign
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignScheduleForm;