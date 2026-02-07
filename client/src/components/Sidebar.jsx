import './Sidebar.css';

export default function Sidebar({navigate}) {

  return (
    <nav className='Sidebar'>
      <ul className='Navigation'>
        <li data-page='/families' data-pagetitle="Families" onClick={navigate} className='navlink top'>🗂️ Families</li>
      </ul>
    </nav>
  )
}