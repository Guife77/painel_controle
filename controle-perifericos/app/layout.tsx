import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ícones
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painel de Controle',
  description: 'Gerencie os periféricos da sua empresa',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}
            <div id="confirmModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4" id="confirmTitle">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-6" id="confirmMessage">Tem certeza que deseja excluir este item?</p>
            <div className="flex justify-end">
                <button id="cancelConfirmBtn" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-100">Cancelar</button>
                <button id="confirmBtn" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">Confirmar</button>
            </div>
        </div>
    </div>
      </body>
    </html>
  );
}
