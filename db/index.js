require('dotenv').config()
const mongoose = require("mongoose")

mongoose.Promise = require('bluebird')

function MongooseStart() {}

MongooseStart.prototype.start = function () {
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => global.logger.info('Succeeded connected to Db!'))
    .catch(err => {
      global.logger.error('ERROR connecting: ' + err);
      global.connectedToDatabase = err;
  })
}

module.exports = new MongooseStart()
