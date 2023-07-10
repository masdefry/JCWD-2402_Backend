// Import Multer
const {multerUpload} = require('./../lib/multer')

// Import Function Delete
const deleteFiles = require('./../helper/deletefiles')

const upload = (req, res, next) => {
    const multerResult = multerUpload.fields([{name: 'images', maxCount: 3}])
    multerResult(req, res, function (err){
        try { 
            if(err) throw err
           
           // Validate each file size
            req.files.images.forEach(value => {
                if(value.size > 100000000) throw {message: `${value.originalname} is Too Large`, fileToDelete: req.files.images}
            })

            next()
        } catch (error) {
            if(error.fileToDelete){
                deleteFiles(error.fileToDelete)
            }

            return res.status(404).send({
                isError: true, 
                message: error.message, 
                data: null
            })
        }
    })
}

module.exports = upload