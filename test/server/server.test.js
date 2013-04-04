var testutil = require('testutil')
  , sa = require('superagent')

var PORT = 3000
  , URL = 'http://localhost:' + PORT


describe('server', function() {
  it('should connect to the default web page and grab the content', function(done) {
    sa.get(URL).end(function(resp) {
      done()
    })
  })
})