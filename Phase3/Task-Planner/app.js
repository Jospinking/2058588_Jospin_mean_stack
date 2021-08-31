// Description: app.js creates the server with the possible routes
// and calls the backend to manage task inputs & deletes
const http = require('http')
const url = require('url')
// Local modules
const pages = require('./pages')
const backend = require('./backend')
// Config variables
const PORT = 8100
const DATA_LOCATION = "data.json"

let server = http.createServer( (req,res) => {
	res.setHeader('content-type','text/html')
	if(req.url != '/favicon.ico'){
		// parse the URL for just path
		var pathInfo = url.parse(req.url,true).pathname
		console.log("[LOG]: Current location: " + pathInfo)

		if(pathInfo == '/'){
			res.write(backend.display(DATA_LOCATION,pages.index))
		}
		else if(pathInfo == '/store'){
			// take the value from the URL
			let query = url.parse(req.url,true).query
			backend.store(DATA_LOCATION,query)
			res.write(backend.display(DATA_LOCATION,pages.index))
		}
		else if(pathInfo == '/delete'){
			let query = url.parse(req.url,true).query
			let task_exists = backend.deleteTask(DATA_LOCATION,query)

			if(task_exists) {
				res.write(backend.display(DATA_LOCATION,pages.index))
			}
			else{
				res.write(backend.display_deletion_error(DATA_LOCATION))
			}
		}
		else if(pathInfo == '/display'){
			backend.display(DATA_LOCATION,pages.table)
		}
		res.end()
	}
})
server.listen(PORT,()=>console.log(`[LOG]: Listening @ http://localhost:${PORT}`))