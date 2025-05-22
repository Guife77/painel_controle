import React from "react";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setPage: (page: string) => void;
}
export default function Sidebar({ isOpen, setIsOpen, setPage }: SidebarProps) {
  const menuItems = [
    { label: "Início", page: "home", icon: "home" },
    { label: "Colaboradores", page: "employees", icon: "users" },
    { label: "Periféricos", page: "devices", icon: "desktop" },
    { label: "Relatórios", page: "reports", icon: "chart-bar" },
  ];

  return (
    <>
      {/* Botão hambúrguer / X no topo direito, só mobile */}
      <button
        id="menuToggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-11 left-7 z-50 p-3 bg-none rounded-md md:hidden"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        <i className={`fas fa-${isOpen ? "times" : "bars"} text-l text-gray-700`}></i>
      </button>
      {/* Menu mobile que abre e fecha */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <nav className="mt-16 px-4">
          <ul>
            {menuItems.map(({ label, page, icon }) => (
              <li key={page} className="mb-4">
                <button
                  onClick={() => {
                    setPage(page);
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 p-3 w-full text-gray-700 hover:bg-blue-50 rounded-md"
                >
                  <i className={`fas fa-${icon} w-5`} />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Menu desktop sempre visível */}
      <aside className="hidden md:block fixed top-0 left-0 h-full w-64 bg-white shadow-md px-4 py-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Painel</h1>
        <nav>
          <ul>
            {menuItems.map(({ label, page, icon }) => (
              <li key={page} className="mb-2">
                <button
                  onClick={() => setPage(page)}
                  className="w-full text-left flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                >
                  <i className={`fas fa-${icon} w-5 mr-3`} />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
