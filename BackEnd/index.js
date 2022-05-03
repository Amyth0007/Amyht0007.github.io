const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

const app = express()
connectToMongo();
require('dotenv').config();
const port = 5000

app.use(cors());
app.use(express.json());

// Available routes
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen( process.env.PORT || port, () => {
  console.log(`Example app listening at ${port}`)
})