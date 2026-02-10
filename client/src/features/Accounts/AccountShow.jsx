import {useState, useEffect} from 'react';
import { useParams, Link } from "react-router"
import { fetchAccount } from "./accounts.repo"

import Loading from '../Loading';

export default function AccountShow() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    fetchAccount(id)
    .then((data) => {
      setAccount(data);
    })
    .catch((e) => setError(e.message))
  }, [])

  if(account === null) return <Loading />

  return (
    <section className="AccountShow">
      <p>ID: {account.id}</p>
      <p>Name: {account.name}</p>
      <p>Type: {account.account_type}</p>
      <Link to="edit">Edit Account</Link>
    </section>
  )
}