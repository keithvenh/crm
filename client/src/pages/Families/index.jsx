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

  return (
    <section className="Families">
      <div className='data'>
        <div className="rolodex">
          <PageHeader pageTitle={subpage} />
          {families.length === 0 ? 
            (<p>None Yet</p>) :
            (families.map((f) => (<Card key={f.id} content={{title: f.name, synopsis: "Synopsis Empty"}} />)))
          }
        </div>
        <div className="profile">
          {subpages[subpage]}
        </div>
      </div>
    </section>
  )
}