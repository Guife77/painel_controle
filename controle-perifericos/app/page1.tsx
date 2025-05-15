/* app/page.tsx */
'use client';
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 h-full bg-white shadow-md p-4 hidden md:block">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Painel</h1>
        <nav>
          <ul>
            <li className="mb-2">
              <button onClick={() => setCurrentPage('home')} className="flex w-full items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all">
                <i className="fas fa-home w-5 mr-3" />
                <span>Início</span>
              </button>
            </li>
            <li className="mb-2">
              <button onClick={() => setCurrentPage('employees')} className="flex w-full items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all">
                <i className="fas fa-users w-5 mr-3" />
                <span>Colaboradores</span>
              </button>
            </li>
            <li className="mb-2">
              <button onClick={() => setCurrentPage('devices')} className="flex w-full items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all">
                <i className="fas fa-desktop w-5 mr-3" />
                <span>Periféricos</span>
              </button>
            </li>
            <li className="mb-2">
              <button onClick={() => setCurrentPage('reports')} className="flex w-full items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all">
                <i className="fas fa-chart-bar w-5 mr-3" />
                <span>Relatórios</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {currentPage === 'home' && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Página Inicial</h2>
            <p className="text-gray-600">Bem-vindo ao painel de controle de periféricos.</p>
          </section>
        )}
        {currentPage === 'employees' && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Colaboradores</h2>
            <p className="text-gray-600">Cadastro e gerenciamento de colaboradores aqui.</p>
          </section>
        )}
        {currentPage === 'devices' && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Periféricos</h2>
            <p className="text-gray-600">Cadastro de dispositivos e vinculação a usuários.</p>
          </section>
        )}
        {currentPage === 'reports' && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Relatórios</h2>
            <p className="text-gray-600">Consultas e filtros de dados cadastrados.</p>
          </section>
        )}
      </div>
    </div>
  );
}
