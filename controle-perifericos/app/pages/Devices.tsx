export default function Devices() {
    return (
        <div id="devices" className="page fade-in">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Cadastro de Periféricos</h2>
                        <button id="newDeviceBtn" className="btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                            <i className="fas fa-plus mr-2"></i> Novo Periférico
                        </button>
                    </div>

                    <div id="deviceForm" className="hidden bg-gray-50 p-6 rounded-lg mb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Novo Periférico</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                <select id="deviceType" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Selecione...</option>
                                    <option value="Computador">Computador</option>
                                    <option value="Celular">Celular</option>
                                    <option value="Mouse/Teclado">Mouse/Teclado</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                                <input type="text" id="deviceModel" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Patrimônio/IP</label>
                                <input type="text" id="deviceAssetNumber" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Dispositivo</label>
                                <input type="text" id="deviceName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Situação</label>
                                <select id="deviceStatus" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Colaborador Vinculado</label>
                                <select id="deviceEmployee" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Selecione...</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button id="cancelDeviceBtn" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-100">Cancelar</button>
                            <button id="saveDeviceBtn" className="btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Salvar</button>
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patrimônio/IP</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Colaborador</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200" id="devicesTable">
                                <tr>
                                    <td className="px-6 py-4 text-sm text-gray-500" colSpan={7}>Nenhum periférico cadastrado</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
}