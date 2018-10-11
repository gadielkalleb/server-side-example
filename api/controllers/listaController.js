const pagination = require('../../middlewares/pagination')

const listaProdutos = async (produtoSchema, req, res) => {
  

  try {
    const results = await pagination(produtoSchema,{}, req.query || req.body )
    res.render('listaProdutos',{ results, total: results.data.length }) 
  } catch (e) {
    res.status(400).send({ error: 'erro ao buscar os produtos' })
    global.logger.debug('erro ao buscar os produtos', e)
  }
}


const search = async (produtoSchema, req, res) => {
  const pesquisa = req.query.pesquisa
  console.log('campo pesquisa ' + pesquisa)
  try {
    const results = await pagination(produtoSchema,{ nome : pesquisa }, req.query || req.body )
    results.titulo = req.query || req.body,
    results.totalProd = results.data.length
    res.render('listaProdutosSearch',{ 
      results,
    }) 
  } catch (error) {
    console.log(error)
  }
}

module.exports = { 
  listaProdutos, search
}