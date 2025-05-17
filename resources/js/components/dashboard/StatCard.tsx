import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  trend?: number[];
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 rounded-md bg-teal-100 flex items-center justify-center">
          <div className="text-teal-600">{icon}</div>
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-end">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <span className={`ml-2 text-sm font-medium ${
                change.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
            )}
          </div>
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 h-10 flex items-end justify-between">
          {trend.map((point, i) => (
            <div 
              key={i}
              className="w-1 bg-teal-200 rounded-t"
              style={{ 
                height: `${Math.max(15, Math.min(100, point))}%`,
                opacity: i === trend.length - 1 ? 1 : 0.7 - (0.5 * (trend.length - i - 1) / trend.length)
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatCard;