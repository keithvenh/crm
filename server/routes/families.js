const express = require ('express');
const router = express.Router();

const db = require('../db')

router.get('/', (req,res) => {
  const rows = db.prepare(`SELECT * FROM families ORDER BY name ASC`).all();
  res.json(rows);
})

router.post('/', (req, res) => {
  console.log(req);
  const name = req.body?.name;
  if(!name || String(name).trim() === "") {
    return res.status(400).json({error: "name is required" })
  }

  const result = db
    .prepare("INSERT INTO families (name) VALUES (?)")
    .run(String(name).trim());

  const family = db
    .prepare("SELECT * FROM families WHERE id = ?")
    .get(result.lastInsertRowid);

  return res.status(201).json(family);
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  const family = db
    .prepare("SELECT * FROM families WHERE id = ?")
    .get(id);

  res.json(family)
})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const name = req.body?.name;

  if(!Number.isInteger(id)) {
    return res.status(400).json({error: "invalid id"});
  }
  if(!name || String(name).trim() === "") {
    return res.status(400).json({error: "name is required" });
  }

  const info = db
    .prepare("UPDATE families SET name = ? WHERE id = ?")
    .run(String(name).trim(), id);

  if(info.changes === 0) {
    return res.status(400).json({error: "not found" })
  }

  const family = db
    .prepare("SELECT * FROM families WHERE id = ?")
    .get(id)

  res.json(family)
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if(!Number.isInteger(id)) {
    return res.status(400).json({error: "invalid id" })
  }

  const info = db
    .prepare("DELETE FROM families WHERE id = ?")
    .run(id);

  if(info.changes === 0) {
    return res.status(400).json({error: "not found"})
  }

  res.status(204).send();
})

module.exports = router;