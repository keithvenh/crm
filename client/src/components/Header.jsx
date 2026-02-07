import './Header.css';

export default function Header({pageTitle}) {

  return (
    <header className='Header'>
      <div></div>
      <div></div>
      <div className='titleBar'>{pageTitle}</div>
      <div></div>
      <div></div>
    </header>
  )
}