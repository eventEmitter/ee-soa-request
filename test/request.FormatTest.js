"use strict";
var request = require('../'),
    assert = require('assert');

var Format = request.Format;

describe('Format', function(){

        var formatJSON      = new Format('application', 'json'),
            formatJPEG      = new Format('image', 'jpeg'),
            formatImages    = new Format('image'),
            formatWildCard  = new Format();

        describe( '#isWildcard', function(){
            it('should identify if its a wildcard or not', function(){
                assert(formatWildCard.isWildCard());
                assert(!formatJSON.isWildCard());
            });

            it('should identify only as wildcard if main type is a wildcard!', function(){
                assert(!formatImages.isWildCard());
            });
        });

        describe( '#isCompatibleTo', function() {

            it('should detect if types are compatible or not', function(){
                assert(formatJSON.isCompatibleTo(formatJSON));
                assert(!formatJSON.isCompatibleTo(formatJPEG));
            });

            it('should detect if main types are compatible', function(){
                assert(formatJPEG.isCompatibleTo(formatImages));
            });

            it('should detect if main types are compatible', function(){
                assert(formatJPEG.isCompatibleTo(formatImages));
            });

            it('should always be true on wildcards', function(){
                assert(formatJPEG.isCompatibleTo(formatWildCard));
            });

            it('should not allow wildcards to be compatible with more specific types!', function(){
                assert(!formatWildCard.isCompatibleTo(formatImages));
            });
        });
    }
);