// Import Sequelize
const { sequelize } = require('../models')

// Import models
const db = require('../models/index')
const product = db.product
const product_image = db.product_image

// Import Delete Files
const deleteFiles = require('../helper/deleteFiles')

module.exports = {
    post: async(req, res) => {
        const t = await sequelize.transaction()
        try {
            // Step-1 Ambil data dari client
            const data = JSON.parse(req.body.data)

            // Step-2 Create data
            let postProduct = await product.create({...data}, {transaction: t})
            
            const dataToCreate = req.files.images.map(value => {
                return { url: value.path, product_id: postProduct.dataValues.id }
            })
            let postProductImage = await product_image.bulkCreatesss(dataToCreate, {transaction: t, ignoreDuplicate: true})

            await t.commit()
        } catch (error) {
            deleteFiles(req.files.images)
            console.log(error)
        }
    }
}