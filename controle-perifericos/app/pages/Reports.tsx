'use client';

import { useEffect, useState } from 'react';

interface ReportDevice {
  id: number;
  type: string;
  model: string;
  assetNumber: string;
  name: string;
  status: string;
  employee: string;
  department?: string;
}

export default function Reports() {
  const [devices, setDevices] = useState<ReportDevice[]>([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('devices');
    if (stored) {
      setDevices(JSON.parse(stored));
    }
  }, []);

  const filteredDevices = devices.filter(device => {
    return (
      (typeFilter ? device.type === typeFilter : true) &&
      (employeeFilter ? device.employee === employeeFilter : true) &&
      (statusFilter ? device.status === statusFilter : true)
    );
  });
/*ajustar o formato do csv para o correto*/
  function exportCSV() {
    const headers = ["Tipo", "Modelo", "Patrimônio/IP", "Nome", "Status", "Colaborador", "Departamento"];
    const rows = filteredDevices.map(d => [
      d.type,
      d.model,
      d.assetNumber,
      d.name,
      d.status,
      d.employee || '-',
      d.department || '-'
    ]);
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'relatorio_perifericos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Relatórios e Consultas</h2>
          <button
            onClick={exportCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <i className="fas fa-file-export mr-2"></i> Exportar Relatório
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Tipo</label>
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="Computador">Computador</option>
              <option value="Celular">Celular</option>
              <option value="Mouse/Teclado">Mouse/Teclado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Colaborador</label>
            <input
              type="text"
              value={employeeFilter}
              onChange={e => setEmployeeFilter(e.target.value)}
              placeholder="Nome do colaborador"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Status</label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Modelo</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Patrimônio/IP</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Colaborador</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Departamento</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-sm text-gray-500 text-center">Nenhum registro encontrado</td>
                </tr>
              ) : (
                filteredDevices.map((dev) => (
                  <tr key={dev.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{dev.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.model}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.assetNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.employee || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.department || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
