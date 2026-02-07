export async function fetchAll({apiRoute}) {
  const res = await fetch(`/api/${apiRoute}`)
    .then((res) => {
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
  return res
} 