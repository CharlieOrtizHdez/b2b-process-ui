import React from 'react';
import StatusBadge from './StatusBadge';

interface StepStatusProps {
  label: string;
  value: 'idle' | 'success' | 'error';
  message?: string;
}

const StepStatus: React.FC<StepStatusProps> = ({ label, value, message }) => {
  const fallbackMessage =
    value === 'idle'
      ? 'Este paso aún no se ha ejecutado.'
      : value === 'success'
      ? 'Paso completado con éxito.'
      : 'Se produjo un error en este paso.';

  return (
    <li className="flex items-center justify-between p-3 border rounded bg-white shadow-sm hover:bg-gray-50 transition">
      <div className="flex items-center space-x-2">
        <span>{label}</span>
        <span
          className={
            value === 'error'
              ? 'text-red-500 text-sm cursor-help'
              : value === 'idle'
              ? 'text-gray-500 text-sm cursor-help'
              : 'text-green-500 text-sm cursor-help'
          }
          title={message || fallbackMessage}
        >
          {value === 'error' ? '⚠️' : value === 'idle' ? '⏳' : '✅'}
        </span>
      </div>
      <StatusBadge value={value} message={message || fallbackMessage} />
    </li>
  );
};

export default StepStatus;
