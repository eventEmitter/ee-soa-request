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

            it('should detect if types are compatible or not', function(){
                var collection = new FormatCollection().pushAll([formatJSON, formatImages]);
                assert(collection.isCompatibleTo(formatJSON));
            });

            it('should should be compatible to subtypes (contravariance)', function(){
                var collection = new FormatCollection().pushAll([formatJSON, formatImages]);
                assert(collection.isCompatibleTo(formatJPEG));
            });

            it('should should be incompatible to supertypes', function(){
                var collection = new FormatCollection().pushAll([formatJSON, formatJPEG]);
                assert(!collection.isCompatibleTo(formatImages));
                assert(!collection.isCompatibleTo(formatWildCard));
            });

            it('should should be incompatible to other types', function(){
                var collection = new FormatCollection().pushAll([formatJSON, formatJPEG]);
                assert(!collection.isCompatibleTo(formatPlainText));
            });
        });
    }
);