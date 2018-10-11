require('dotenv').config()
const os = require('os')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const cluster = require('cluster')
const Logger = require('logplease')
const bodyParser = require('body-parser')
const helmet = require('helmet');
const compression = require('compression')

const logger = Logger.create('log')

const api = require('./api')
const db = require('./db')

const port = process.env.PORT || 3030

const cpus = process.env.MAX_WORKERS || os.cpus().length

if (cluster.isMaster) {
	// Fork workers.
	for (var i = 0; i < 1;i++) {
		const worker = cluster.fork()
	}

	cluster.on('exit', (worker) => {
		logger.debug(`worker ${worker.process.pid} died`)
		cluster.fork()
	})
} else {
	let app = express()

	global.logger = logger

	app.use(express.static('public'))
	
	app.set('views', path.join(__dirname, 'views'))
	app.set('view engine', 'ejs')
	
	app.use(cors())
	app.use(morgan('dev'))
	app.use(helmet())
	app.use(compression());
	app.use(bodyParser.json({
		limit: '50mb'
	}))
	app.use(bodyParser.urlencoded({
		limit: '50mb',
		extended: true
	}))
	app.use(bodyParser.raw({
		inflate: true,
		limit: '100mb',
		type: '*/*'
	}))


	app.use('/', api)

	app.listen(port, () => {
		db.start()
		global.logger.info(`api up on port ${port}`)
	})
}