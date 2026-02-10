import {useState} from 'react';
import { useNavigate } from 'react-router';

import { createAccount } from "./accounts.repo";

import AccountForm from "./AccountForm"

export default function AccountNew() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function submitNewAccount(form) {
    setError(null);
    const name = form.name;
    const account_type = form.account_type;

    if(!name.trim()) {
      setError("Name is required");
      return;
    }

    createAccount({name, account_type})
    .then((r) => {
      if(!r.ok) throw new Error("Failed to save");
      return r.json();
    })
    .then(navigate('/accounts'))
    .catch((e) => setError(e.message))
  }

  return (
    <section className="AccountNew">
      <h2>Create A New Account</h2>
      <AccountForm onSubmit={submitNewAccount} />
    </section>
  )
}