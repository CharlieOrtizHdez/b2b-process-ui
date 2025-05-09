import React, { useEffect, useState } from 'react';
import { fetchStatusList } from '../api';
import { useNavigate } from 'react-router-dom';

interface PendingAuth {
  id: string;
  name: string;
  company: string;
}

const PendingList: React.FC = () => {
  const [items, setItems] = useState<PendingAuth[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStatusList()
      .then(setItems)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (id: string) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Autorizaciones pendientes</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No hay autorizaciones pendientes.</p>
      ) : (
        <table className="w-full border border-gray-200 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Empresa</th>
              <th className="px-4 py-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.company}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleClick(item.id)}
                  >
                    Ver y aprobar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingList;
