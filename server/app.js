const express = require('express');
const app = express();
const port = 3000

const familiesRoutes = require('./routes/families');

app.use('/api/families', familiesRoutes);

app.get('/', (req, res) => {
  res.send("Hello, World!")
})

app.listen(port, () => {
  console.log(`CRM Server is listening on port ${port}`)
})