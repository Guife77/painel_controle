interface Props {
  setPage: (page: string) => void;
}

export default function Sidebar({ setPage }: Props) {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-md px-4 py-6 hidden md:block">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Painel</h1>
      <nav>
        <ul>
          <li className="mb-2">
            <button onClick={() => setPage('home')} className="w-full text-left flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600">
              <i className="fas fa-home w-5 mr-3" />
              Início
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => setPage('employees')} className="w-full text-left flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600">
              <i className="fas fa-users w-5 mr-3" />
              Colaboradores
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => setPage('devices')} className="w-full text-left flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600">
              <i className="fas fa-desktop w-5 mr-3" />
              Periféricos
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => setPage('reports')} className="w-full text-left flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600">
              <i className="fas fa-chart-bar w-5 mr-3" />
              Relatórios
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
