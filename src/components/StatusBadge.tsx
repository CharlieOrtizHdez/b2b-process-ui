import React from 'react';

interface StatusBadgeProps {
  value: 'idle' | 'success' | 'error';
  message?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ value, message }) => {
  const baseClass = 'inline-flex items-center px-2 py-0.5 rounded text-sm';
  const styles =
    value === 'success'
      ? 'bg-green-100 text-green-700'
      : value === 'error'
      ? 'bg-red-100 text-red-700'
      : 'bg-gray-100 text-gray-600';

  const icon =
    value === 'success' ? '✅' : value === 'error' ? '❌' : '⏳';

  return (
    <span className={`${baseClass} ${styles}`} title={message || ''}>
      {icon}
    </span>
  );
};

export default StatusBadge;
