// Devices.tsx - atualizado com Supabase
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRef } from 'react';

interface Aparelhos {
  id: number;
  tipo: string;
  modelo: string;
  patrimonio: string;
  nome: string;
  status: string;
  colaborador_id: number;
  colaborador_nome?: string;
  departamento?: string;
}

interface Funcionarios {
  id: number;
  nome: string;
  departamento: string;
}

export default function Aparelhos() {
  const [devices, setAparelhos] = useState<Aparelhos[]>([]);
  const [Funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);
  const [formData, setFormData] = useState({
    tipo: '',
    modelo: '',
    patrimonio: '',
    nome: '',
    status: 'Ativo',
    colaborador_id: 0
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchFuncionarios();
    fetchAparelhos();
  }, []);

  async function fetchAparelhos() {
    const { data, error } = await supabase
      .from('aparelhos')
      .select(`
        id,
        tipo,
        modelo,
        patrimonio,
        nome,
        status,
        colaborador_id,
        employees:colaborador_id (nome, departamento)
      `);

    if (data) {
      const mapped = data.map((d: any) => ({
        id: d.id,
        tipo: d.tipo,
        modelo: d.modelo,
        patrimonio: d.patrimonio,
        nome: d.nome,
        status: d.status,
        colaborador_id: d.colaborador_id,
        colaborador_nome: d.employees?.nome,
        departamento: d.employees?.departamento
      }));
      setAparelhos(mapped);
    }

    if (error) console.error('Erro ao carregar aparelhos:', error);
  }

  async function fetchFuncionarios() {
    const { data, error } = await supabase.from('funcionarios').select('id, nome, departamento');
    if (data) setFuncionarios(data);
    if (error) console.error('Erro ao carregar colaboradores:', error);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: id === 'colaborador_id' ? Number(value) : value }));
  }

  async function handleSave() {
    const { tipo, modelo, patrimonio, nome, status, colaborador_id } = formData;
    if (!tipo || !modelo || !patrimonio || !nome || !colaborador_id) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    if (editingId) {
      await supabase.from('aparelhos').update({ tipo, modelo, patrimonio, nome, status, colaborador_id }).eq('id', editingId);
    } else {
      await supabase.from('aparelhos').insert({ tipo, modelo, patrimonio, nome, status, colaborador_id });
    }

    setFormData({ tipo: '', modelo: '', patrimonio: '', nome: '', status: 'Ativo', colaborador_id: 0 });
    setEditingId(null);
    setShowForm(false);
    fetchAparelhos();
  }

  async function handleDelete(id: number) {
    if (confirm('Deseja excluir este periférico?')) {
      await supabase.from('aparelhos').delete().eq('id', id);
      fetchAparelhos();
    }
  }
  const formRef = useRef<HTMLDivElement | null>(null);
  function handleEdit(dev: Aparelhos) {
    setFormData({
      tipo: dev.tipo,
      modelo: dev.modelo,
      patrimonio: dev.patrimonio,
      nome: dev.nome,
      status: dev.status,
      colaborador_id: dev.colaborador_id
    });
    setEditingId(dev.id);
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
          <h2 className="text-xl font-semibold text-gray-800">Cadastro de Periféricos</h2>
          <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Novo Periférico
          </button>
        </div>

        {showForm && (
          <div 
          ref={formRef}
          className="bg-gray-100 p-4 rounded-md mb-6 transition-all duration-300 ease-in-out animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select id="tipo" value={formData.tipo} onChange={handleChange} className="border p-2 rounded-md">
                <option value="">Tipo</option>
                <option value="Computador">Computador</option>
                <option value="Celular">Celular</option>
                <option value="Mouse/Teclado">Mouse/Teclado</option>
              </select>
              <input id="modelo" value={formData.modelo} onChange={handleChange} placeholder="Modelo" className="border p-2 rounded-md" />
              <input id="patrimonio" value={formData.patrimonio} onChange={handleChange} placeholder="Patrimônio/IP" className="border p-2 rounded-md" />
              <input id="nome" value={formData.nome} onChange={handleChange} placeholder="Nome do dispositivo" className="border p-2 rounded-md" />
              <select id="status" value={formData.status} onChange={handleChange} className="border p-2 rounded-md">
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
              <select id="colaborador_id" value={formData.colaborador_id} onChange={handleChange} className="border p-2 rounded-md">
                <option value={0}>Selecione o colaborador</option>
                {Funcionarios.map(e => (
                  <option key={e.id} value={e.id}>{e.nome}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 border mr-2 rounded-md">Cancelar</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md">{editingId ? 'Atualizar' : 'Salvar'}</button>
            </div>
          </div>
        )}

        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Modelo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patrimônio/IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Colaborador</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {devices.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-sm text-gray-500 text-center">Nenhum periférico cadastrado</td>
              </tr>
            ) : (
              devices.map(dev => (
                <tr key={dev.id}>
                  <td className="px-6 py-4 text-sm">{dev.tipo}</td>
                  <td className="px-6 py-4 text-sm">{dev.modelo}</td>
                  <td className="px-6 py-4 text-sm">{dev.patrimonio}</td>
                  <td className="px-6 py-4 text-sm">{dev.nome}</td>
                  <td className="px-6 py-4 text-sm">{dev.status}</td>
                  <td className="px-6 py-4 text-sm">{dev.colaborador_nome || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                  <button onClick={() => handleEdit(dev)} className="text-blue-600 hover:text-blue-800 mr-3">
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
  );
}
