import './Header.css';

export default function Header({page, setPage}) {

  return (
    <header className='Header'>
      <div onClick={() => setPage('Dashboard')} className='appTitle'>Raise Your Support</div>
      <div></div>
      <div className='titleBar'>{page}</div>
      <div></div>
      <div></div>
    </header>
  )
}