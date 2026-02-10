const express = require('express');
const app = express();
const port = 3000

app.use(express.json());

const accountRoutes = require('./routes/account');

app.use('/api/account', accountRoutes);

app.get('/', (req, res) => {
  res.send("Hello, World!")
})

app.listen(port, () => {
  console.log(`CRM Server is listening on port ${port}`)
})