const express = require('express')
const app = express()
app.use(express.json()) // Body Parser: Untuk mengambil data dari client yg dikirimkan melalui body

const PORT = 5001

const fs = require('fs')

app.get('/', (req, res) => {
    res.send('<h1> Welcome to My First API </h1>')
})

app.get('/users', (req, res) => {
    // Provide Data Users Menuju ke Client
    // 1. Ambil dulu dari db.json
    const findUsers = JSON.parse(fs.readFileSync('./db/db.json'))

    // 2. Kirim data yg sudah diambil di step-1
    res.status(200).send({
        isError: false, 
        message: 'Get Data Users Success',
        data: findUsers.users
    })
})

app.post('/users', (req, res) => {
    // Step-1. Get data from client
    const usersData = req.body

    // Step-2. Get data from db.json
    const findData = JSON.parse(fs.readFileSync('./db/db.json'))

    console.log(findData)

    // Step-3. Manipulate Data from db.json
    const id = findData.users.length? findData.users[findData.users.length-1].id + 1 : 1
    
    findData.users.push({id, ...usersData})

    // // Step-4. Save new data into db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(findData))
    
    // Step-5. Send Response
    res.status(201).send({
        isError: false, 
        message: 'Create Data Success', 
        data: null
    })
})

app.delete('/users/:id', (req, res) => {
    console.log(req.params.id)
})

app.listen(PORT, () =>  console.log(`API Running on Port ${PORT}`))