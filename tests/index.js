'use strict'

var assert = require('assert');

suite('Meteor App tests', function() {

  test('server initialization', function(done, server) {
    server.eval(function() {
      var collection = Posts.find().fetch();
      emit('collection', collection);
    }).once('collection', function(collection) {
      assert.equal(collection.length, 0);
      done();
    });
  });


  test('insert : OK', function(done, server, client) {
    server.eval(function() {
      Posts.insert({commenttext: "tests"  });
      var collection = Posts.find().fetch();
      emit('collection', collection);
    }).once('collection', function(collection) {
      assert.equal(collection.length, 1);
      done();
    });



    client.once('collection', function(collection) {
      assert.equal(Posts.find().fetch().length, 1);
      done();
    });
  });



  test('server insert : OK', function(done, server, client) {
    server.eval(function() {
      Posts.insert({commenttext: "testss"  });
      var collection = Posts.find().fetch();
      emit('collection', collection);
    }).once('collection', function(collection) {
      assert.equal(collection.length, 1);
      done();
    });

    

    client.once('collection', function(collection) {
      assert.equal(Posts.find().fetch().length, 1);
      done();
    });
  });

  test('access granted for loggedin users', function(done, server, client) {
    server.eval(function() {
      Accounts.createUser({email: 'a@a.com', password: '123456'});
      emit('done');
    }).once('done', function() {
      server.eval(observeCollection);
    });
    function observeCollection() {
      Posts.find().observe({
        added: function(doc) {
          emit('added', doc);
        }
      });
    }
    server.once('added', function(doc) {
      assert.equal(doc.title, 'hello');
      done();
    });
    client.eval(function() {
      Meteor.loginWithPassword('a@a.com', '123456', function() {
        Posts.insert({commenttext: 'hello'});
      });
    });
  });
  
  test('access denied for normal users', function(done, server, client) {
    client.eval(function() {
      Posts.find().observe({
        removed: function(doc) {
          emit('remove', doc);
        }
      });
      Posts.insert({commenttext: 'hello'});
    });
    client.once('remove', function(doc) {
      assert.equal(doc.title, 'hello');
      done();
    });
  });

});
