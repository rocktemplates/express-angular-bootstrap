var testutil = require('testutil')
  , sa = require('superagent')

var PORT = 3000
  , URL = 'http://localhost:' + PORT

describe('items api', function() {
  describe('GET /api/items', function() {
    it('should return an array of items', function(done) {
      sa.get(URL + '/api/items').
      end(function(resp) {
        //testutil
        EQ (resp.body.length, 2)
        T (resp.body.length === 2)
        
        done()
      })
    })
  })

  describe('POST /api/items', function() {
    it('should create a new car', function(done) {
      var item = {
        first: "Leslie",
        last: "Richardson"
      }

      sa.post(URL + '/api/items').send(item).end(function(req) {
        T (req.body)
        T (req.body.id > 0)
        done()
      })
    })
  })

  describe('GET /api/items/:id', function() {
    it('should GET an item by id', function(done) {
      var id = 2

      sa.get(URL + '/api/items/' + id).end(function(req) {
        T (req.body)
        T (req.body.id === 2)
        T (req.body.first.length > 0)
        done()
      })
    })
  })
})