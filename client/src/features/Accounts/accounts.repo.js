import {fetchAll} from '../../shared/http';

export async function fetchAllAccounts() {
  return fetch(`/api/account`)
    .then((res) => {
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
  })
}

export async function fetchAccount(id) {
  return fetch(`/api/account/${id}`)
    .then((res) => {
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
}

export async function createAccount({name, account_type}) {
  return fetch("/api/account", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name, account_type})
  })
}

export async function updateAccount({id, name, account_type}) {
  return fetch(`/api/account/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name, account_type})
  })
}

export async function deleteAccount({id}) {
  return fetch(`/api/account/${id}`, {
    method: "DELETE"
  })
}