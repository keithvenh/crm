import './Sidebar.css';

export default function Sidebar({page, setPage}) {

  return (
    <nav className='Sidebar'>
      <ul>
        <li className={page === "Dashboard" ? "active" : ""} onClick={() => setPage('Dashboard')}>Dashboard</li>
        <li className={page === "Families" ? "active" : ""} onClick={() => setPage('Families')}>Families</li>
      </ul>
    </nav>
  )
}