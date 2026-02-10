import { Link, useLocation } from 'react-router';
import './Header.css';


export default function Header({page, setPage}) {
  const {pathname} = useLocation();

  function pageTitle(pathname) {
    if(pathname.startsWith('/accounts')) return "Accounts";
    return "Dashboard";
  }
  return (
    <header className='Header'>
      <div className='appTitle'><Link to="/">Raise Your Support</Link></div>
      <div></div>
      <div className='titleBar'><h1 className="pageTitle">{pageTitle(pathname)}</h1></div>
      <div></div>
      <div></div>
    </header>
  )
}