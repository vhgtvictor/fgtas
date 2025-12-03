import { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import UserManagement from './components/UserManagement';
import Credores from './components/Credores';
import BasesFisicas from './components/BasesFisicas';
import TiposDespesas from './components/TiposDespesas';
import Lancamentos from './components/Lancamentos';
import Relatorios from './components/Relatorios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('lancamentos');

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'users':
        return <UserManagement />;
      case 'credores':
        return <Credores />;
      case 'bases':
        return <BasesFisicas />;
      case 'tipos':
        return <TiposDespesas />;
      case 'lancamentos':
        return <Lancamentos />;
      case 'relatorios':
        return <Relatorios />;
      default:
        return <Lancamentos />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onLogout={() => setIsAuthenticated(false)}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
