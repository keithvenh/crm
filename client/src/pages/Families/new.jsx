import {useState} from 'react';

export default function NewFamily() {

  const [name, setName] = useState();

  function changeName(e) {
    setName(e.value)
  }

  return (
    <div className="NewFamily">
      <form>
        <label>
          Family Name
          <input type="text" value={name} onChange={changeName}></input>
        </label>
      </form>
    </div>
  )
}