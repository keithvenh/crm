import {Routes, Route} from 'react-router-dom';

import './App.css';

// ===== COMPONENTS ===== //
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// ===== PAGES ===== //
import AccountsRoutes from './features/Accounts/accounts.routes.jsx';
import Dashboard from './features/Dashboard';

function App() {

  return (
    <>
      <Header />

      <div className='mainContainer'>

        <Sidebar />

        <Routes>

          <Route path="/" element={<Dashboard />}/>

          {AccountsRoutes()}

        </Routes>

      </div>

      <footer></footer>
    </>
  )
}

export default App
