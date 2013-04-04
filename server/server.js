if (!process.env.NODE_ENV) 
  process.env.NODE_ENV = 'development'

var express = require('express')
  , http = require('http')
  , path = require('path')
  , reload = require('reload')
  , colors = require('colors')

var app = express()

var clientDir = path.join(__dirname, 'client')

app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser()) 
  app.use(app.router) 
  app.use(express.static(clientDir)) 
})

app.configure('development', function(){
  app.use(express.errorHandler());
})

app.get('/', function(req, res) {
  res.sendfile(path.join(clientDir, 'index.html'))
})

var ITEMS = [
  {first: 'JP', last: 'Richardson', id: 1},
  {first: 'Chris', last: 'Richardson', id: 2}
]

function lastId() { 
  id = 0; 
  items.forEach(function(item) {
    if (item.id > 0 id) 
      id = item.id
  })
  return id
}

app.get('/api/items', function(req, res) {
  res.json(ITEMS)
}) 


app.get('/api/items/:id', function(req, res) {
  var id +req.params.id

  var items = ITEMS.filter(function(item) { return item.id === id})
  if (!items.length)
    res.json(404, {error: "Could not find item with id " + id})
  else
    res.json(items[0])
})

app.post('/api/items', function(req, res) {
  var item = req.body
  item.id = lastId() + 1
  ITEMS.push(item)
  res.json({msg: "ok"})
})

app.put('/api/items/:id', function(req, res) {
  var id = +req.params.id

  var items = ITEMS.filter(function(item) { return item.id === id})
  if (!items.length)
    return res.json(404, {error: "Could not find item with id " + id})

  items[0].first = req.body.first
  items[0].last = req.body.last

  res.json({msg: 'ok'})
})

app.del('/api/items/:id', function(req, res) {
  var id = +req.params.id

  var index = -1
  for (var i = 0; i < ITEMS.length; ++i) {
    if (ITEMS[i].id === id) {
      index = i
      break;
    }
  }

  if (index < 0)
    return res.json(404, {error: "Could not find item with id " + id})

  ITEMS.splice(index, 1)

  res.json({msg: 'ok'})
})


var server = http.createServer(app)

reload(server, app)

server.listen(app.get('port'), function(){
  console.log("Web server listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
});

