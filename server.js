const express = require('express')
const app = express()
const port = 8888
const routes = require('./routes.js');


app.use(express.json());
app.use(express.static('public'))

app.use('/', routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
