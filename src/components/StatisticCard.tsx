import React from 'react';

interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  primary?: boolean;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, icon, primary }) => {
  return (
    <div className={`rounded-xl ${primary ? 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-200 dark:border-blue-800' : 'bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700'} backdrop-blur-sm p-4 shadow-sm border transition-all duration-300 hover:shadow-md group`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${primary ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'} transition-colors duration-300`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
          <p className={`text-xl font-semibold ${primary ? 'text-blue-700 dark:text-blue-400' : 'text-gray-800 dark:text-white'} transition-colors duration-300`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;