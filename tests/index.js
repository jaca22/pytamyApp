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


  test('client insert question : OK', function(done, server, client) {
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

  test('client insert empty question : OK', function(done, server, client) {
    server.eval(function() {
      Posts.insert({commenttext: " "  });
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

  test('server insert question: OK', function(done, server, client) {
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

  test('server insert empty question : OK', function(done, server, client) {
    server.eval(function() {
      Posts.insert({commenttext: " "  }, {_id : 1});
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

  test('vote : OK', function(done, server, client) {
    server.eval(function() {
      Posts.update('1',{
        $inc : {'yes':1},
        $set: {'votedBy': Meteor.userId()}
      });
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

  

});

