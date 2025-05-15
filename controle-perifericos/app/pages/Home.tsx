interface Props {
  setPage: (page: string) => void;
}

export default function Home({ setPage }: Props) {
     
    return (
        <div className="flex-1 relative">
            {/* Top Bar */}
            <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center rounded-lg">
                <div className="flex items-center">
                    <button id="menuToggle" className="md:hidden mr-4 text-gray-600">
                        <i className="fas fa-bars"></i>
                    </button>
                    <h2 id="pageTitle" className="text-xl font-semibold text-gray-800">Início</h2>
                </div>
                <div className="flex items-center">
                    <div className="relative">
                        <span className="text-sm text-gray-600 mr-2">Admin</span>
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                            <i className="fas fa-user-circle"></i>
                        </div>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main className="p-6">
                {/* Home Page */}
                <div id="home" className="page fade-in">
                    <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-6 md:mb-0 md:mr-8">
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">Painel de Controle de Periféricos</h1>
                                <p className="text-gray-600 mb-6 max-w-2xl">
                                    Sistema integrado para gerenciamento e controle de periféricos corporativos. 
                                    Cadastre, monitore e gere relatórios sobre computadores, celulares e kits de mouse/teclado 
                                    vinculados aos colaboradores da empresa.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        className="btn-primary bg-blue-600 text-white px-5 py-2 rounded-md flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                        onClick={() => setPage('employees')}>
                                        <i className="fas fa-user-plus mr-2 "></i> Cadastrar Colaborador
                                    </button>
                                    <button
                                        className="btn-primary bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                        onClick={() => setPage('devices')}
                                    >
                                        <i className="fas fa-laptop mr-2"></i> Cadastrar Periférico
                                    </button>
                                    <button
                                        className="btn-primary bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                        onClick={() => setPage('reports')}
                                    >
                                        <i className="fas fa-file-alt mr-2"></i> Ver Relatórios
                                    </button>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                                    <rect x="9" y="9" width="6" height="6"></rect>
                                    <line x1="9" y1="1" x2="9" y2="4"></line>
                                    <line x1="15" y1="1" x2="15" y2="4"></line>
                                    <line x1="9" y1="20" x2="9" y2="23"></line>
                                    <line x1="15" y1="20" x2="15" y2="23"></line>
                                    <line x1="20" y1="9" x2="23" y2="9"></line>
                                    <line x1="20" y1="14" x2="23" y2="14"></line>
                                    <line x1="1" y1="9" x2="4" y2="9"></line>
                                    <line x1="1" y1="14" x2="4" y2="14"></line>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 ">Computadores</h3>
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <i className="fas fa-desktop text-blue-600 text-xl"></i>
                                </div>
                            </div>
                            <div className="flex items-end">
                                <span className="text-3xl font-bold text-gray-800" id="computerCount">0</span>
                                <span className="text-gray-500 ml-2">/ 20 disponíveis</span>
                            </div>
                            <div className="mt-4 bg-gray-200 h-2 rounded-full">
                                <div className="bg-blue-600 h-2 rounded-full" id="computerProgress" style={{ width: "0%" }}></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Kits Mouse/Teclado</h3>
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <i className="fas fa-keyboard text-blue-600 text-xl"></i>
                                </div>
                            </div>
                            <div className="flex items-end">
                                <span className="text-3xl font-bold text-gray-800" id="kitCount">0</span>
                                <span className="text-gray-500 ml-2">/ 20 disponíveis</span>
                            </div>
                            <div className="mt-4 bg-gray-200 h-2 rounded-full">
                                <div className="bg-blue-600 h-2 rounded-full" id="kitProgress" style={{ width: "0%" }}></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Celulares</h3>
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <i className="fas fa-mobile-alt text-blue-600 text-xl"></i>
                                </div>
                            </div>
                            <div className="flex items-end">
                                <span className="text-3xl font-bold text-gray-800" id="phoneCount">0</span>
                                <span className="text-gray-500 ml-2">/ 20 disponíveis</span>
                            </div>
                            <div className="mt-4 bg-gray-200 h-2 rounded-full">
                                <div className="bg-blue-600 h-2 rounded-full" id="phoneProgress" style={{ width: "0%" }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Últimos Registros</h3>
                        <div className="table-container">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patrimônio</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Colaborador</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200" id="recentDevicesTable">
                                    <tr>
                                        <td className="px-6 py-4 text-sm text-gray-500" colSpan={5}>Nenhum registro encontrado</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}