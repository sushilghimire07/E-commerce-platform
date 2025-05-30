import express from 'express'
import { handleImageUpload,appProduct,editProduct,fetchAllProducts,deleteProduct } from '../../controllers/admin/products-controllers.js'
import { upload } from '../../helpers/cloudinary.js'

const router = express.Router()

router.post('/upload-image',upload.single('my_file'),handleImageUpload)
router.post('/add',appProduct)
router.put('/edit/:id',editProduct)
router.delete('/delete',deleteProduct)
router.get('/get',fetchAllProducts)

export default router