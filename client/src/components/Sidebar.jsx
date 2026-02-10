import { Link, useLocation } from 'react-router';
import './Sidebar.css';


export default function Sidebar({page, setPage}) {

  const {pathname} = useLocation();

  return (
    <nav className='Sidebar'>
      <ul>
        <li  role="menuitem">
          <Link to="/" className={pathname === "/" ? "active" : ""}>Dashboard</Link>
        </li>
        <li role="menuitem">
          <Link to="/accounts" className={pathname.startsWith("/accounts") ? "active" : ""}>Accounts</Link>
        </li>
      </ul>
    </nav>
  )
}