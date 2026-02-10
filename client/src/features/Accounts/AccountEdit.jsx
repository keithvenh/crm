import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router';

import { fetchAccount, updateAccount, deleteAccount } from "./accounts.repo";

import Loading from '../Loading';

import AccountForm from "./AccountForm"

export default function AccountEdit() {
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);

  const {id} = useParams();
  const navigate = useNavigate();

  function submitEditAccount(form) {
    setError(null);
    const name = form.name;
    const account_type = form.account_type;

    if(!name.trim()) {
      setError("Name is required");
      return;
    }

    updateAccount({id, name, account_type})
    .then((r) => {
      if(!r.ok) throw new Error("Failed to save");
      return r.json();
    })
    .then(navigate(`/accounts/${id}`))
    .catch((e) => setError(e.message))
  }

  function handleDeleteAccount() {
    if (!window.confirm(`Delete "${account.name}"?`)) return;

    deleteAccount({id})
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        // DELETE returns no body (204)
        navigate("/accounts");
      })
      .catch((e) => setError(e.message));
  }

  useEffect(() => {
    fetchAccount(id)
    .then((data) => {
      setAccount(data);
    })
    .catch((e) => setError(e.message))
  }, [])

  if(account === null) return <Loading />

  return (
    <section className="AccountNew">
      <h2>Create A New Account</h2>
      <AccountForm onSubmit={submitEditAccount} initialValues={account}/>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </section>
  )
}