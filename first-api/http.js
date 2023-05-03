const http = require('http');

const PORT = 5000

const fs = require('fs') // File System

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        if(req.method === 'GET'){
            res.writeHead(200, 'Get Success')
            res.end('<h1> My First API </h1>')
        }
    }if(req.url === '/users'){
        if(req.method === 'GET'){
            // Provide Data Users
            let findUsers = fs.readFileSync('./db/db.json')
            let {users} = JSON.parse(findUsers)
            users = JSON.stringify(users)
            
            res.writeHead(200, 'Get Data Success')
            res.end(users)
        }
    }
})

server.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
})