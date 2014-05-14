var assert = require('assert');

var Collection = require('../lib/util/Collection');

describe('Collection', function(){
    var collect = new Collection();
    it('shoud be empty after initialization', function(){
        assert(collect.isEmpty());
    });

    describe('#last()', function(){
        var coll = new Collection();
        it('should return null if empty', function(){
            assert.equal(null, coll.last());
        });

        it('or the last element', function(){
            coll.push(5);
            coll.push(10);
            assert.equal(10, coll.last());
        });

        it('without modifying its size', function(){
            assert.equal(2, coll.length);
        });
    });

    describe('#first()', function(){
        var coll = new Collection();
        it('should return null if empty', function(){
            assert.equal(null, coll.first());
        });

        it('or the first element', function(){
            coll.push(10);
            coll.push(5);
            assert.equal(10, coll.first());
        });

        it('without modifying its size', function(){
            assert.equal(2, coll.length);
        });
    });

    describe('#push()', function(){
        var coll = new Collection();
        it('should add an element', function(){
            coll.push(2);
            coll.push(10);
            assert(coll.length == 2);
        });
    });

    describe('#pushAll()', function(){
        var coll = new Collection();
        it('should add a collection', function(){
            coll.pushAll([2, 10]);
            assert(coll.length == 2);
        });
    });

    describe('#any()', function(){
        var coll = new Collection();
        coll.pushAll([2, 10]);
        it('should check if any of the values fulfills the predicate', function(){
            assert(coll.any(function(current){ return current > 5; }));
        });
        it('or return false', function(){
            assert.equal(false, coll.any(function(current){ return current > 10; }));
        });
    });


});