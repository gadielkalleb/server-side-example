const express = require('express')
const router = express.Router()

const { listaProdutos, produto, search } = require('../controllers/listaController')
const produtoSchema = require('../models/ProdutosSchema')

router.get('/', listaProdutos.bind(null, produtoSchema))
router.get('/:id', produto.bind(null, produtoSchema))
router.post('/search', search.bind(null, produtoSchema))

module.exports = router
