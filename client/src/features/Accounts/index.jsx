import {useState, useEffect, Fragment} from 'react';
import { Link } from 'react-router';

import './accounts.css';

import Loading from '../Loading';

import {fetchAllAccounts} from './accounts.repo';

export default function Accounts() {
  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    fetchAllAccounts()
      .then(setAccounts)
      .catch((e) => setError(e.message));
  }, [])

  if(!accounts) return <Loading />

  const alphaFilters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "9"]
  let currentAlpha = "";

  function alphaSeparators(name) {
    const alpha = name.split("")[0];

    if(alpha !== currentAlpha) {
      currentAlpha = alpha;
      return (
        <div id={alpha} className="alphaSeparator">
          <hr />
          <p>{alpha}</p>
          <hr />
        </div>
      )
    }
  }

  return (
    <main className="Accounts">
      <div className="pageHeader">
        <Link className="createLink" to="/accounts/new">+ New Account</Link>
      </div>
      <ul className="alphaFilter">
        {alphaFilters.map((af) => (
          <li key={af}><a href={`#${af}`}>{af}</a></li>
        ))}
      </ul>
      <ul className="accountsList">
        {accounts.map((a) => (
          <Fragment key={a.id}>
            {alphaSeparators(a.name)}
            <li>
              <Link to={`/accounts/${a.id}`}>{a.name}</Link>
            </li>
          </Fragment>
        ))}
      </ul>
    </main>
  )
}