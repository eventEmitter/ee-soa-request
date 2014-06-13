"use strict";
var request = require('../'),
    assert = require('assert');

var FormatCollection    = request.FormatCollection,
    Format              = request.Format;

describe('FormatCollection', function(){

        var formatJSON      = new Format('application', 'json'),
            formatJPEG      = new Format('image', 'jpeg'),
            formatImages    = new Format('image'),
            formatPlainText = new Format('text', 'plain'),
            formatWildCard  = new Format();


        describe( '#isCompatibleTo', function() {

            it('should detect if types are compatible or not and return the priority', function(){
                var collection = new FormatCollection().pushAll([formatJSON, formatImages]);
                assert(collection.isCompatibleTo(formatJSON));
                assert.strictEqual(collection.isCompatibleTo(formatJSON), 2);
            });

            it('should should be compatible to subtypes (contravariance)', function(){
                var collection = new FormatCollection().pushAll([formatJSON, formatImages]);
                assert(collection.isCompatibleTo(formatJPEG));
                assert.strictEqual(collection.isCompatibleTo(formatJPEG), 1);
            });

            it('should should be incompatible to supertypes and return false', function(){
                var collection = new FormatCollection().pushAll([formatJSON, formatJPEG]);
                assert.strictEqual(collection.isCompatibleTo(formatImages), false);
                assert.strictEqual(collection.isCompatibleTo(formatWildCard), false);
            });

            it('should correctly accept a wildcard if the wildcard is also in the formats', function(){
                var collection = new FormatCollection().pushAll([formatJSON, formatJPEG, formatWildCard]);
                assert(collection.isCompatibleTo(new Format()));
                assert(collection.isCompatibleTo(formatPlainText));
                assert.strictEqual(collection.isCompatibleTo(formatPlainText), 1);
            });

            it('should should be incompatible to other types and return false', function(){
                var collection = new FormatCollection().pushAll([formatJSON, formatJPEG]);
                assert.strictEqual(collection.isCompatibleTo(formatPlainText), false);
            });
        });
    }
);