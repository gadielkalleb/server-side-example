const pagination = require('../../middlewares/pagination')

const listaProdutos = async (produtoSchema, req, res) => {
  const produtosave = {
    nome: 'manta',
    descricao: 'coberto',
    valor: '550',
    ultimovalor: '80',
    fotos: [
      'http://placehold.it/100x75',
		  'http://placehold.it/100x75',
		  'http://placehold.it/100x75',
		  'http://placehold.it/100x75',
    ]
  }

  await produtoSchema.create(produtosave)

  try {
    const results = await pagination(produtoSchema,{}, req.query || req.body )
    res.render('listaProdutos',{ results, total: results.data.length }) 
  } catch (e) {
    res.status(400).send({ error: 'erro ao buscar os produtos' })
    global.logger.debug('erro ao buscar os produtos', e)
  }
}

const produto = async (produtoSchema, req, res) => {
  const { id } = req.param || req.body
  try {
    const getProduto = await produtoSchema.find({ _id: id })
    res.status(200).send({ produto: getProduto })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: 'não foi possivel buscar o produto em especifico' })
  }
}

const search = async (produtoSchema, req, res) => {
  
  try {
    const results = await pagination(produtoSchema,{ nome: /req.query || req.body/ }, req.query || req.body )
    const totalProd = results.data.length
    console.log(results)
    res.render('listaProdutos',{ 
      results,
      titulo: req.query || req.body, 
      totalProd 
    }) 
  } catch (error) {
    console.log(error)
  }
}

module.exports = { 
  listaProdutos, produto, search
}