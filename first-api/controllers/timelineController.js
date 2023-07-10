const fs = require('fs')

module.exports = {
    upload: (req, res) => {
        
    },

    test: (req, res) => {
        try {
            const {status, location, time} = req.query
            console.log(status, location, time)
            // Get db
            const findData = JSON.parse(fs.readFileSync('db/db.json'))

            const filterData = findData.movies.filter((value) => {
                if(status && value.status !== status) return null 
                if(location && value.location !== location) return null
                if(time && value.time !== time) return null 
                return value
            })
            console.log(filterData)
        } catch (error) {
            console.log(error)
        }
    }
}