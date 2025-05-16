// Devices.tsx
'use client';

import { useEffect, useState } from 'react';

interface Device {
  id: number;
  type: string;
  model: string;
  assetNumber: string;
  name: string;
  status: string;
  employee: string;
  department?: string;
}

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  email: string;
}

export default function Devices() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState({
    type: '',
    model: '',
    assetNumber: '',
    name: '',
    status: 'Ativo',
    employee: ''
  });

  useEffect(() => {
    const storedDevices = localStorage.getItem('devices');
    if (storedDevices) setDevices(JSON.parse(storedDevices));

    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) setEmployees(JSON.parse(storedEmployees));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  function handleSave() {
    if (!formData.type || !formData.model || !formData.assetNumber || !formData.name) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const selectedEmployee = employees.find(e => e.name === formData.employee);
    const department = selectedEmployee?.department || '';

    if (editingId !== null) {
      const updated = devices.map(dev =>
        dev.id === editingId ? { id: editingId, ...formData, department } : dev
      );
      setDevices(updated);
      localStorage.setItem('devices', JSON.stringify(updated));
    } else {
      const newDevice: Device = {
        id: Date.now(),
        ...formData,
        department
      };
      const updatedDevices = [...devices, newDevice];
      setDevices(updatedDevices);
      localStorage.setItem('devices', JSON.stringify(updatedDevices));
    }

    setFormData({
      type: '', model: '', assetNumber: '', name: '', status: 'Ativo', employee: ''
    });
    setEditingId(null);
    setShowForm(false);
  }

  function handleEdit(id: number) {
    const device = devices.find(d => d.id === id);
    if (device) {
      setFormData({
        type: device.type,
        model: device.model,
        assetNumber: device.assetNumber,
        name: device.name,
        status: device.status,
        employee: device.employee
      });
      setEditingId(id);
      setShowForm(true);
    }
  }

  function handleDelete(id: number) {
    if (!confirm('Deseja excluir este periférico?')) return;
    const updated = devices.filter(d => d.id !== id);
    setDevices(updated);
    localStorage.setItem('devices', JSON.stringify(updated));
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Cadastro de Periféricos</h2>
          <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <i className="fas fa-plus mr-2"></i> Novo Periférico
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              {editingId !== null ? 'Editar Periférico' : 'Novo Periférico'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select id="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">Selecione...</option>
                  <option value="Computador">Computador</option>
                  <option value="Celular">Celular</option>
                  <option value="Mouse/Teclado">Mouse/Teclado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                <input type="text" id="model" value={formData.model} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patrimônio/IP</label>
                <input type="text" id="assetNumber" value={formData.assetNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Dispositivo</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Situação</label>
                <select id="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Colaborador Vinculado</label>
                <select id="employee" value={formData.employee} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">Selecione...</option>
                  {employees.map(e => (
                    <option key={e.id} value={e.name}>{e.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-100">Cancelar</button>
              <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Salvar</button>
            </div>
          </div>
        )}

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
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {devices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-sm text-gray-500">Nenhum periférico cadastrado</td>
                </tr>
              ) : (
                devices.map(dev => (
                  <tr key={dev.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{dev.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.model}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.assetNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dev.employee || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <button onClick={() => handleEdit(dev.id)} className="text-blue-600 hover:text-blue-800 mr-3">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(dev.id)} className="text-red-600 hover:text-red-800">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
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
