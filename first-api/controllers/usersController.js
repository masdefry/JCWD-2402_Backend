const fs = require('fs')

module.exports = {
    register: (req, res) => {
        try {
            const {username, email, password} = req.body     
        
            if(username || email || password) return res.status(406).send({
                isError: true, 
                message: 'Data Not Complete',
                data: null
            })

            // Get db
            const findData = JSON.parse(fs.readFileSync('../db/db.json'))
            
            // Generate Id
            const id = findData.users.length? findData.users[findData.users.length-1].id+1 : 1

            // Generate Unique Code
            const code = Math.floor(Math.random() * 90000) + 10000

            // Manipulate data
            findData.users.push({id, username, email, password, code, isActive: 0})

            // Write db
            fs.writeFileSync('../db/db.json', JSON.stringify(findData))

            res.status(201).send({
                isError: false, 
                message: 'Register Success', 
                data: null
            })

        } catch (error) {
            res.send({
                isError: true, 
                message: error.message, 
                data: null
            })
        }
    },

    activation: (req, res) => {
        // Get data from client
        const {code} = req.body 
        const {id} = req.params

        // Get db
        const findData = JSON.parse(fs.readFileSync('../db/db.json'))

        // Find index data users based on id params
        findData.users.forEach((value, index) => {
            if(value.id === Number(id)){
                if(value.code === code){
                    value.isActive = 1
                }else{
                    return res.status(406).send({
                        isError: true, 
                        message: 'Code Not Valid', 
                        data: null 
                    })
                }
            }
        })

        // Write db
        fs.writeFileSync('../db/db.json', JSON.stringify(findData))

        res.status(200).send({
            isError: false, 
            message: 'Account Active', 
            data: null
        })
    },

    login: (req, res) => {
        try {
            const {username, password} = req.query
            
            // Get db
            const findData = JSON.parse(fs.readFileSync('../db/db.json'))

            // 
            findData.users.forEach((value, index) => {
                if(value.username === username && value.password === password){
                    return res.status(200).send({
                        isError: false, 
                        message: 'Login Success',
                        data: null 
                    })
                }
            })

            res.status(406).send({
                isError: true, 
                message: 'Username/Password Doesnt Match',
                data: null
            })
        } catch (error) {
            
        }
    }
}