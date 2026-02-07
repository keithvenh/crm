import './PageHeader.css';

export default function PageHeader({pageTitle}) {

  function createNew() {
    console.log(`Creating new ${pageTitle}`)
  }
  return (
    <div className='PageHeader'>
      {pageTitle}
      <p className='addButton' onClick={createNew}>+</p>
    </div>
  )
}