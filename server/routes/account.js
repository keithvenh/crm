const express = require ('express');
const router = express.Router();

const db = require('../db')

router.get('/', (req,res) => {
  const rows = db.prepare(`SELECT * FROM account ORDER BY name ASC`).all();
  res.json(rows);
})

router.post('/', (req, res) => {
  console.log(req);
  const name = req.body?.name;
  const account_type = req.body?.account_type
  if(!name || String(name).trim() === "") {
    return res.status(400).json({error: "name is required" })
  }

  const result = db
    .prepare("INSERT INTO account (name, account_type) VALUES (?, ?)")
    .run(String(name).trim(), account_type);

  const account = db
    .prepare("SELECT * FROM account WHERE id = ?")
    .get(result.lastInsertRowid);

  return res.status(201).json(account);
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  const account = db
    .prepare("SELECT * FROM account WHERE id = ?")
    .get(id);

  res.json(account)
})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const name = req.body?.name;
  const account_type = req.body?.account_type;

  if(!Number.isInteger(id)) {
    return res.status(400).json({error: "invalid id"});
  }
  if(!name || String(name).trim() === "") {
    return res.status(400).json({error: "name is required" });
  }

  const info = db
    .prepare("UPDATE account SET (name, account_type) = (?, ?) WHERE id = ?")
    .run(String(name).trim(), account_type, id);

  if(info.changes === 0) {
    return res.status(400).json({error: "not found" })
  }

  const account = db
    .prepare("SELECT * FROM account WHERE id = ?")
    .get(id)

  res.json(account)
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if(!Number.isInteger(id)) {
    return res.status(400).json({error: "invalid id" })
  }

  const info = db
    .prepare("DELETE FROM account WHERE id = ?")
    .run(id);

  if(info.changes === 0) {
    return res.status(400).json({error: "not found"})
  }

  res.status(204).send();
})

module.exports = router;