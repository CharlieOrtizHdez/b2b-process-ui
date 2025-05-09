import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStatus, startProcess } from '../api';
import StepStatus from '../components/StepStatus';
import type { ProcessStatus } from '../api';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<ProcessStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchStatus(id)
        .then(setStatus)
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleStart = () => {
    if (!id) return;
    setLoading(true);
    startProcess(id)
      .then(setStatus)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  if (!id) return <p className="text-center text-red-600">Falta el parámetro \"id\".</p>;
  if (!status) return <p className="text-center">Cargando estado...</p>;

  const containerColor =
    status.status === 'done'
      ? 'bg-green-50 border-green-300'
      : status.status === 'error'
      ? 'bg-red-50 border-red-300'
      : 'bg-white border-gray-200';

  return (
    <div className={`max-w-2xl mx-auto mt-10 px-4 py-6 border rounded ${containerColor}`}>
      <h1 className="text-2xl font-bold mb-6">Estado del proceso</h1>

      <ul className="space-y-2">
        <StepStatus label="Verificación en Cin7" value={status.stepCin7} message={status.stepCin7Message} />
        <StepStatus label="Crear contacto" value={status.stepContact} message={status.stepContactMessage} />
        <StepStatus label="Crear cuenta en B2B" value={status.stepAccount} message={status.stepAccountMessage} />
        <StepStatus label="Enviar correo" value={status.stepEmail} message={status.stepEmailMessage} />
      </ul>

      <div className="mt-8 text-sm text-gray-600 border-t pt-4">
        <p className="mb-1 font-medium">Leyenda:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><span className="text-green-600">✅ Éxito:</span> paso completado correctamente.</li>
          <li><span className="text-red-600">❌ Error:</span> falló el paso, pasa el cursor para ver el mensaje.</li>
          <li><span className="text-gray-600">⏳ Pendiente:</span> paso aún no ejecutado.</li>
        </ul>
      </div>

      {status.status === 'error' && (
        <p className="text-red-600 mt-4">Error: {status.errorMessage}</p>
      )}

      {status.status === 'pending' && (
        <button
          onClick={handleStart}
          disabled={loading}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Procesando...' : 'Iniciar proceso'}
        </button>
      )}

      {status.status === 'done' && (
        <p className="text-green-600 mt-4">✅ Proceso completado correctamente.</p>
      )}
    </div>
  );
};

export default DetailPage;
