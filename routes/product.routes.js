const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.route('/').get(getProducts).post(upload.single('image'), createProduct);
router.route('/:id').get(getProductById).put(upload.single('image'), updateProduct).delete(deleteProduct);

module.exports = router;