import {useState, useEffect} from 'react';
import './families.css';
import PageHeader from '../PageHeader';
import Card from '../../components/Card';
import NewFamily from './new';

export default function Families() {
  const [families, setFamilies] = useState([]);
  const [error, setError] = useState();
  const [subpage, setSubpage] = useState('/');

  const subpages = {
    '/': "",
    '/new': <NewFamily />
  }

  useEffect(() => {
    fetch("/api/families")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setFamilies)
      .catch((e) => setError(e.message))
  }, []);

  if(error) {return <div>Error: {error}</div>}

  let letter = "";
  return (
    <section className="Families">
      <div className='alphabet'>
        {families.map((f) => {
          if(f.name.split("")[0] !== letter) {
            letter = f.name.split("")[0];
            return <li key={letter}>{letter}</li>
          }
        })}
      </div>
      <div className='data'>
        <ul>
          {families.map((f) => (<li key={f.id} onClick={() => showFamily(f.id)}>{f.name}</li>))}
        </ul>
      </div>
    </section>
  )
}