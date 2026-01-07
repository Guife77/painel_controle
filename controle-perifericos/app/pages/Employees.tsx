'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRef } from 'react';

interface Funcionario {
  id: number;
  nome: string;
  departamento: string;
  cargo: string;
  email: string;
  status: string;
}

export default function Funcionarios() {
  const [Funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    departamento: '',
    cargo: '',
    email: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  async function fetchFuncionarios() {
    const { data, error } = await supabase
      .from('funcionarios')
      .select('*')
      .order('id', { ascending: true });

    if (!error && data) {
      setFuncionarios(data);
    } else {
      console.error('Erro ao carregar colaboradores:', error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  async function handleSave() {
    const { nome, departamento, cargo, email } = formData;
    if (!nome || !departamento || !cargo || !email) {
      alert('Preencha todos os campos');
      return;
    }

    setLoading(true);

    if (editingId) {
      // Atualizar colaborador
      const { error } = await supabase
        .from('funcionarios')
        .update({ nome, departamento, cargo, email })
        .eq('id', editingId);

      if (!error) {
        setSuccessMessage('Colaborador atualizado com sucesso!');
      }
    } else {
      // Inserir novo colaborador
      const { error } = await supabase
        .from('funcionarios')
        .insert({ nome, departamento, cargo, email });

      if (!error) {
        setSuccessMessage('Colaborador cadastrado com sucesso!');
      }
    }

    setFormData({ nome: '', departamento: '', cargo: '', email: '' });
    setEditingId(null);
    setShowForm(false);
    await fetchFuncionarios();
    setLoading(false);

    setTimeout(() => setSuccessMessage(''), 3000);
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm('Deseja realmente excluir este colaborador?');
    if (!confirmDelete) return;

    const { error } = await supabase.from('funcionarios').delete().eq('id', id);
    if (!error) {
      await fetchFuncionarios();
    }
  }
  const formRef = useRef<HTMLDivElement | null>(null);
  function handleEdit(emp: Funcionario) {
    setFormData({
      nome: emp.nome,
      departamento: emp.departamento,
      cargo: emp.cargo,
      email: emp.email,
    });
    setEditingId(emp.id);
    setShowForm(true);

    setTimeout(() => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 100);
  }


  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Cadastro de Colaboradores</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Novo Colaborador
          </button>
        </div>

        {showForm && (
          <div 
           ref= {formRef} 
            className="bg-gray-50 p-6 rounded-lg mb-6 transition-all duration-300 ease-in-out animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{editingId ? 'Editar Colaborador' : 'Novo Colaborador'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input id="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" className="border p-2 rounded-md" />
              <input id="cargo" value={formData.cargo} onChange={handleChange} placeholder="Cargo" className="border p-2 rounded-md" />
              <input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="E-mail" className="border p-2 rounded-md" />
              <select id="departamento" value={formData.departamento} onChange={handleChange} className="border p-2 rounded-md">
                <option value="">Selecione o departamento</option>
                <option value="CUSTO">CUSTO</option>
                <option value="DIRETORIA">DIRETORIA</option>
                <option value="FINANCEIRO">FINANCEIRO</option>
                <option value="FISCAL">FISCAL</option>
                <option value="FATURAMENTO">FATURAMENTO</option>
                <option value="IMPORTAÇÃO">IMPORTAÇÃO</option>
                <option value="LOGÍSTICA">LOGÍSTICA</option>
                <option value="MARKETING">MARKETING</option>
                <option value="PROJETOS">PROJETOS</option>
                <option value="QUALIDADE/REGULATORIO">QUALIDADE/REGULATORIO</option>
                <option value="RH">RH</option>
                <option value="TI">TI</option>
                <option value="VENDAS">VENDAS</option>
                <option value="OUTROS">OUTROS</option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 border mr-2 rounded-md">Cancelar</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md" disabled={loading}>
                {loading ? 'Salvando...' : editingId ? 'Atualizar' : 'Salvar'}
              </button>
            </div>
            {successMessage && (
              <p className="mt-4 text-green-600">{successMessage}</p>
            )}
          </div>
        )}

        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
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
            {Funcionarios.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
                  Nenhum colaborador cadastrado
                </td>
              </tr>
            ) : (
              Funcionarios.map(emp => (
                <tr key={emp.id}>
                  <td className="px-6 py-4 text-sm">{emp.nome}</td>
                  <td className="px-6 py-4 text-sm">{emp.departamento}</td>
                  <td className="px-6 py-4 text-sm">{emp.cargo}</td>
                  <td className="px-6 py-4 text-sm">{emp.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => handleEdit(emp)} className="text-blue-600 hover:text-blue-800 mr-3">
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
    </div>
  );
}
