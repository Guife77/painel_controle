'use client';

import { useState, useEffect } from 'react';

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  email: string;
}

export default function Employees() {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    email: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('employees');
    if (stored) {
      setEmployees(JSON.parse(stored));
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  function handleSave() {
    if (!formData.name || !formData.department || !formData.position || !formData.email) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (editingId !== null) {
        const updated = employees.map(emp => emp.id === editingId ? { id: editingId, ...formData } : emp);
        setEmployees(updated);
        localStorage.setItem('employees', JSON.stringify(updated));
        setSuccessMessage('Colaborador atualizado com sucesso!');
      } else {
        const newEmployee: Employee = {
          id: Date.now(),
          ...formData,
        };
        const updatedEmployees = [...employees, newEmployee];
        setEmployees(updatedEmployees);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        setSuccessMessage('Colaborador cadastrado com sucesso!');
      }

      setFormData({ name: '', department: '', position: '', email: '' });
      setEditingId(null);
      setShowForm(false);
      setLoading(false);

      setTimeout(() => setSuccessMessage(''), 3000);
    }, 500);
  }

  function handleCancel() {
    setFormData({ name: '', department: '', position: '', email: '' });
    setEditingId(null);
    setShowForm(false);
  }

  function handleEdit(id: number) {
    const employee = employees.find(e => e.id === id);
    if (employee) {
      setFormData({
        name: employee.name,
        department: employee.department,
        position: employee.position,
        email: employee.email,
      });
      setEditingId(id);
      setShowForm(true);
    }
  }

  function handleDelete(id: number) {
    setEmployeeToDelete(id);
    setShowConfirm(true);
  }

  function confirmDelete() {
    if (employeeToDelete === null) return;
    const updated = employees.filter(e => e.id !== employeeToDelete);
    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
    setShowConfirm(false);
    setEmployeeToDelete(null);
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Cadastro de Colaboradores</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <i className="fas fa-plus mr-2"></i> Novo Colaborador
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6 transition-all duration-300 ease-in-out animate-fade-in">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              {editingId !== null ? 'Editar Colaborador' : 'Novo Colaborador'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                <select id="department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Selecione...</option>
                  <option value="TI">TI</option>
                  <option value="RH">RH</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Vendas">Vendas</option>
                  <option value="Operações">Operações</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                <input type="text" id="position" value={formData.position} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={handleCancel} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-100">Cancelar</button>
              <button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                {loading ? 'Salvando...' : editingId !== null ? 'Atualizar' : 'Salvar'}
              </button>
            </div>
            {successMessage && (
              <div className="mt-4 text-green-600 font-medium">{successMessage}</div>
            )}
          </div>
        )}

        <div className="table-container">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cargo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-mail</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-500" colSpan={5}>Nenhum colaborador cadastrado</td>
                </tr>
              ) : (
                employees.map(emp => (
                  <tr key={emp.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{emp.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{emp.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{emp.position}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{emp.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <button onClick={() => handleEdit(emp.id)} className="text-blue-600 hover:text-blue-800 mr-4">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(emp.id)} className="text-red-600 hover:text-red-800">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmar Exclusão</h3>
              <p className="text-gray-600 mb-6">Tem certeza que deseja excluir este colaborador?</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-100"
                >Cancelar</button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >Confirmar</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
