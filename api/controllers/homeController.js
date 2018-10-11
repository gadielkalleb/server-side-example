const home = (req, res) => {
  res.status(200).send({ status: 'ok', data: 'home api'})
}

module.exports = { home }