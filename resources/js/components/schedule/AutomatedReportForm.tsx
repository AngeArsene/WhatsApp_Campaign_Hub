import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { X } from 'lucide-react';

interface AutomatedReportFormProps {
  onSave: (reportData: any) => void;
  onCancel: () => void;
}

const AutomatedReportForm: React.FC<AutomatedReportFormProps> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [recipientType, setRecipientType] = useState<'phone' | 'admin'>('admin');
  const [recipientValue, setRecipientValue] = useState('');
  const [nextScheduled, setNextScheduled] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reportData = {
      name,
      frequency,
      recipient_type: recipientType,
      ...(recipientType === 'phone' && { recipient_value: recipientValue }),
      next_scheduled: nextScheduled?.toISOString(),
    };

    onSave(reportData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Automate Report</h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Report Name
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
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Send Report To
              </label>
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setRecipientType('admin')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    recipientType === 'admin'
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => setRecipientType('phone')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    recipientType === 'phone'
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Phone Number
                </button>
              </div>

              {recipientType === 'phone' && (
                <input
                  type="tel"
                  value={recipientValue}
                  onChange={(e) => setRecipientValue(e.target.value)}
                  placeholder="+1234567890"
                  className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                  required
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Report Date
              </label>
              <DatePicker
                selected={nextScheduled}
                onChange={(date) => setNextScheduled(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="block w-full rounded-md shadow-sm px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                placeholderText="Select date and time"
              />
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
                Create Automation
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AutomatedReportForm;