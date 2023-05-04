const express = require('express')
const app = express()
app.use(express.json()) // Body Parser: Untuk mengambil data dari client yg dikirimkan melalui body

const PORT = 5001

app.get('/', (req, res) => {
    res.send('<h1> Welcome to My First API </h1>')
})

// Import Routers
const {usersRouter, timelineRouter} = require('./routers')
app.use('/users', usersRouter)
app.use('/timeline', timelineRouter)

app.listen(PORT, () =>  console.log(`API Running on Port ${PORT}`))