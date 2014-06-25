'use strict'

var assert = require('assert');

suite('submitAnswers', function() {

  test('server initialization', function(done, server) {
    server.eval(function() {
      var collection = Posts.find().fetch();
      emit('collection', collection);
    }).once('collection', function(collection) {
      assert.equal(collection.length, 0);
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

    test('server update : OK', function(done, server, client) {
    server.eval(function() {
      Posts.update(answerID,{
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
