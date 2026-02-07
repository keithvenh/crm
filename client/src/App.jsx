import { useState, useEffect } from 'react'
import './App.css'

import {fetchAll} from './services/fetchAll';
import {FamiliesService} from './services/familiesService';


// ===== COMPONENTS ===== //
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// ===== PAGES ===== //
import Dashboard from './pages/Dashboard';
import Families from './pages/Families'

function App() {

  const [page, setPage] = useState('Dashboard');

  const pages = {
    '/': <Dashboard />,
    'Dashboard': <Dashboard />,
    'Families': <Families />
  }

  const [families, setFamilies] = useState([]);
  const [form, setForm] = useState({name: ""});
  const [error, setError] = useState(null);
  const [subpage, setSubpage] = useState("new");
  const [family, setFamily] = useState(null);

  function submitNewFamily(e) {
    e.preventDefault();
    setError(null);
    const name = form.name;

    if(!name.trim()) {
      setError("Name is required");
      return;
    }

    fetch("/api/families", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name})
    })
    .then((r) => {
      if(!r.ok) throw new Error("Failed to save");
      return r.json();
    })
    .then((newFamily) => {
      setFamilies((prev) => [...prev,newFamily].sort((a,b) => a.name.localeCompare(b.name)));
      setForm({name: ""})
    })
    .catch((e) => setError(e.message))
  }

  function handleInput(e) {
    setForm((prev) => ({...prev, name: e.target.value}));
  }

  function showFamily(id) {
    fetch(`/api/families/${id}`)
      .then((res) => {
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setFamily(data);
        setSubpage("show");
      })
      .catch((e) => setError(e.message))
  }

  function editFamily() {
    setForm({name: family.name});
    setSubpage("edit");
  }

  function updateFamily(e) {
    e.preventDefault();
    setError(null);
    const name = form.name;

    if(!name.trim()) {
      setError("Name is required");
      return;
    }

    fetch(`/api/families/${family.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name})
    })
    .then((r) => {
      if(!r.ok) throw new Error("Failed to save");
      return r.json();
    })
    .then((updatedFamily) => {
      setFamilies((prev) =>
        prev
          .map((f) => (f.id === updatedFamily.id ? updatedFamily : f))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
      setForm({ name: "" });
      setFamily(updatedFamily);
      setSubpage("show");
    })
    .catch((e) => setError(e.message))
  }

  function deleteFamily() {
    if (!window.confirm(`Delete "${family.name}"?`)) return;

    fetch(`/api/families/${family.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        // DELETE returns no body (204)
        setFamilies((prev) => prev.filter((f) => f.id !== family.id));
        setFamily(null);
        setForm({name: ""});
        setSubpage("new");
      })
      .catch((e) => setError(e.message));
  }


  useEffect(() => {
    FamiliesService.all
      .then(setFamilies)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <>
      <Header setPage={setPage} page={page} />
      <div className='mainContainer'>
        <Sidebar page={page} setPage={setPage} />
        {pages[page]}
        <main>
          <h2>Families</h2>
          <div className="screens">
            <div className="screen-left">
              <ul>
                {families.map((f) => (<li key={f.id} onClick={() => showFamily(f.id)}>{f.name}</li>))}
              </ul>
            </div>
            <div className="screen-right">
              {subpage === "new" ? (
                <>
                  <h3>Add a New Family</h3>
                  <form onSubmit={submitNewFamily}>
                    <label>
                      Family Name
                      <input onChange={handleInput} value={form.name}></input>
                    </label>
                    <button>Save</button>
                  </form>
                </>
              ) : subpage === "show" ? (
                <>
                  <h3>Family Record</h3>
                  <p>id: {family.id}</p>
                  <p>name: {family.name}</p>
                  <button onClick={editFamily}>Edit Record</button>
                </>          
              ) : 
                <>
                  <h3>Edit Family Record</h3>
                  <form onSubmit={updateFamily}>
                    <label>
                      Family Name
                      <input onChange={handleInput} value={form.name}></input>
                    </label>
                    <button>Save</button>
                  </form>
                  <button onClick={deleteFamily}>Delete Record</button>
                </>
              }
            </div>
          </div>
        </main>
      </div>
      <footer></footer>
    </>
  )
}


// function App() {
//   const [page, setPage] = useState('/');
//   const [pageTitle, setPageTitle] = useState("Dashboard");

//   const pages = {
//     '/': "",
//     "/families": <Families />
//   }

//   function navigate(e) {
//     const page = e.target.dataset.page || "/";
//     const pageTitle = e.target.dataset.pagetitle || "Dashboard";
//     setPage(page);
//     setPageTitle(pageTitle);
//   }

//   return (
//     <>
//       <Header pageTitle={pageTitle} />
//       <main>
//         <Sidebar navigate={navigate} />
//         {pages[page]}
//       </main>
//     </>
//   )
// }

export default App
