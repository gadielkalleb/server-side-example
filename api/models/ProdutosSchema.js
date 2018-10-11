const mongoose = require('mongoose')

const ProdutosSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  valor: {
    type: String,
    required: true
  },
  ultimovalor: {
    type: String,
    required: true
  },
  fotos: [{
    type: String,
  }],
})

module.exports = mongoose.model('Produtos', ProdutosSchema)
