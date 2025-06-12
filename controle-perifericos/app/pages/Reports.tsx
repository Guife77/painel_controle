'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ReportDevice {
  id: number;
  tipo: string;
  modelo: string;
  patrimonio: string;
  nome: string;
  status: string;
  colaborador: string;
  departamento?: string;
}

interface Employee {
  id: number;
  nome: string;
  departamento: string;
  email: string;
  status: string;
}

export default function Reports() {
  const [devices, setDevices] = useState<ReportDevice[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    async function fetchData() {
      // Busca dispositivos com vínculo ao colaborador
      const { data: deviceData, error: deviceError } = await supabase
        .from('devices')
        .select(`
          id,
          tipo,
          modelo,
          patrimonio,
          nome,
          status,
          employees:colaborador_id (
            nome,
            departamento
          )
        `);

      if (deviceError) {
        console.error('Erro ao buscar devices:', deviceError);
      } else {
        const mappedDevices: ReportDevice[] = deviceData.map((d: any) => ({
          id: d.id,
          tipo: d.tipo,
          modelo: d.modelo,
          patrimonio: d.patrimonio,
          nome: d.nome,
          status: d.status,
          colaborador: d.employees?.nome || '',
          departamento: d.employees?.departamento || '',
        }));
        setDevices(mappedDevices);
      }

      // Busca lista de todos os colaboradores
      const { data: employeeData, error: employeeError } = await supabase
        .from('employees')
        .select('id, nome, departamento, email, status');

      if (employeeError) {
        console.error('Erro ao buscar colaboradores:', employeeError);
      } else {
        setEmployees(employeeData);
      }
    }

    fetchData();
  }, []);

  const filteredDevices = devices.filter((device) => {
    return (
      (typeFilter ? device.tipo === typeFilter : true) &&
      (employeeFilter ? device.colaborador === employeeFilter : true) &&
      (statusFilter ? device.status === statusFilter : true)
    );
  });

function exportCSV() {
  const headers = ['Tipo', 'Modelo', 'Patrimônio/IP', 'Nome', 'Status', 'Colaborador', 'Departamento'];

  const sanitize = (value: string | undefined | number | null) => {
    if (typeof value === 'string') {
      return `"${value.replace(/"/g, '""')}"`; // Escapa aspas
    }
    return `"${value ?? ''}"`; // Trata null como vazio
  };

  const rows = filteredDevices.map((d) => [
    sanitize(d.tipo),
    sanitize(d.modelo),
    sanitize(d.patrimonio),
    sanitize(d.nome),
    sanitize(d.status),
    sanitize(d.colaborador),
    sanitize(d.departamento),
  ]);

  const BOM = '\uFEFF';
  const csvContent = BOM + [headers.map(sanitize), ...rows]
    .map((row) => row.join(';'))
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <i className="fas fa-file-export mr-2"></i> Exportar Relatório
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Tipo</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
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
            <select
              value={employeeFilter}
              onChange={(e) => setEmployeeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Todos</option>
              {employees.map((e) => (
                <option key={e.id} value={e.nome}>
                  {e.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
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
                  <td colSpan={7} className="px-6 py-4 text-sm text-gray-500 text-center">
                    Nenhum registro encontrado
                  </td>
                </tr>
              ) : (
                filteredDevices.map((dev) => (
                  <tr key={dev.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{dev.tipo}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.modelo}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.patrimonio}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.nome}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.colaborador || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.departamento || '-'}</td>
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
