import {useState, useEffect} from 'react'

export default function AccountForm({initialValues, onSubmit}) {
  const defaultValues = {name: "", account_type: "Family"}
  const [form, setForm] = useState(() => initialValues ?? defaultValues)

  function handleInput(e) {
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  useEffect(() => {
    if(initialValues) setForm(initialValues);
  }, [initialValues])

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Account Name
        <input onChange={handleInput} value={form.name} name="name"></input>
      </label>
      <label>
        Account Type
        <select value={form.account_type} name="account_type" onChange={handleInput}>
          <option value="Family">Family</option>
          <option value="Business">Business</option>
          <option value="Church">Church</option>
          <option value="Non-Profit">Non-Profit</option>
          <option value="Foundation">Foundation</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <button>Save</button>
    </form>
  )
}