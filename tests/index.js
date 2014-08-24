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

  test('client incrementYesVotes : OK', function(done, server, client) {
    server.eval(function() {
      var post = {
        text:"test",
        owner:"test",
        date:new Date(),
        picture:" ",
        parent: 1
      }
      Posts.insert(post);
      Posts.update(1,{
        $inc : {'yes':1},
        $set: {'votedBy': 1}
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

  test('client incrementNoVotes : OK', function(done, server, client) {
    server.eval(function() {
      var post = {
        text:"test",
        owner:"test",
        date:new Date(),
        picture:" ",
        parent: 1
      }
      Posts.insert(post);
      Posts.update(1,{
        $inc : {'no':1},
        $set: {'votedBy': 1}
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

  test('client update question : OK', function(done, server, client) {
    server.eval(function() {
      var post = {
        text:"test",
        owner:"test",
        date:new Date(),
        picture:" ",
        parent: 1
      }
      Posts.insert(post);
      Posts.update(1,{
        $inc : {"parent":2},
        $set: {"parentt": 2}
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

   test('client remove question : OK', function(done, server, client) {
    server.eval(function() {
      var post = {
        text:"test",
        owner:"test",
        date:new Date(),
        picture:" ",
        parent: 1
      }
      Posts.remove({parent:1});
     
      var collection = Posts.find().fetch();
      emit('collection', collection);
    }).once('collection', function(collection) {
      assert.equal(collection.length, 0);
      done();
    });


    client.once('collection', function(collection) {
      assert.equal(Posts.find().fetch().length, 0);
      done();
    });
  });

   test('server remove question : OK', function(done, server, client) {
    server.eval(function() {
      var post = {
        text:"test",
        owner:"test",
        date:new Date(),
        picture:" ",
        parent: 1
      }
      Posts.remove({parent:1});
     
      var collection = Posts.find().fetch();
      emit('collection', collection);
    }).once('collection', function(collection) {
      assert.equal(collection.length, 0);
      done();
    });


    client.once('collection', function(collection) {
      assert.equal(Posts.find().fetch().length, 0);
      done();
    });
  });

    test('client remove all question : OK', function(done, server, client) {
    server.eval(function() {
      Posts.remove({});
     
      var collection = Posts.find().fetch();
      emit('collection', collection);
    }).once('collection', function(collection) {
      assert.equal(collection.length, 0);
      done();
    });


    client.once('collection', function(collection) {
      assert.equal(Posts.find().fetch().length, 0);
      done();
    });
  });

  

});

