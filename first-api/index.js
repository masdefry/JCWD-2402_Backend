const express = require('express')
const app = express()
app.use(express.json()) // Body Parser: Untuk mengambil data dari client yg dikirimkan melalui body

const PORT = 5001

app.get('/', (req, res) => {
    res.send('<h1> Welcome to My First API </h1>')
})

// Import Routers
const {usersRouter} = require('./routers')
app.use('/users', usersRouter)

app.listen(PORT, () =>  console.log(`API Running on Port ${PORT}`))