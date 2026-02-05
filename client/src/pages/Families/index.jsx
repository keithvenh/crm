import {useState, useEffect} from 'react';
import './families.css';
import Card from '../../components/Card';

export default function Families() {
  const [families, setFamilies] = useState([]);
  const [error, setError] = useState();

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

  return (
    <section className="Families">
      <h2>Families</h2>
      <div className='data'>
        <div className="rolodex">
          {families.length === 0 ? 
            (<p>None Yet</p>) :
            (families.map((f) => (<Card key={f.id} content={{title: f.name, synopsis: "Synopsis Empty"}} />)))
          }
        </div>
        <div className="profile">

        </div>
      </div>
    </section>
  )
}