'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Devices from './pages/Devices';
import Reports from './pages/Reports';

export default function Page() {
  const [page, setPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (page) {
      case 'employees': return <Employees />;
      case 'devices': return <Devices />;
      case 'reports': return <Reports />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} setPage={setPage} />
      <main className="flex-1 md:ml-64 p-6">
        {renderPage()}
      </main>
    </div>
  );
}
