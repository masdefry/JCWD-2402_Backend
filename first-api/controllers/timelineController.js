const fs = require('fs')

module.exports = {
    upload: (req, res) => {
        try {
            // Get data from client
            const {userId} = req.params
            const {imageUrl, caption} = req.body

            // Get db
            const findData = JSON.parse(fs.readFileSync('db/db.json'))

            // Generate id
            const id = findData.timeline.length? findData.timeline[findData.timeline.length-1].id+1 : 1

            // Manipulate data
            findData.users.forEach((value, index) => {
                if(value.id === Number(userId)){
                    if(value.status === 1){
                        findData.timeline.push({id, caption, imageUrl, userId})
                        fs.writeFileSync('db/db.json', JSON.stringify(findData))
                        return res.status(201).send({ isError: false, message: 'Upload Success', data: null })
                    }else{
                        return res.status(406).send({ isError: true, message: 'Account Not Active', data: null })
                    }
                }
            })
        } catch (error) {
            
        }
    }
}