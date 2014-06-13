"use strict";

var Class = require('ee-class'),

    util = require('../util');

var FormatCollection = {
    inherits: util.Collection
    // for debugging
    , _type: 'FormatCollection'

    /**
     * Returns if any of the formats is compatible
     * to the passed format, by returning a priority
     * or false.
     *
     * The priority is between 1 and length of the
     * collection (to avoid the index 0 to be interpreted
     * as false and break compatibility).
     *
     * image/* is not compatible to image/jpeg
     * image/jpeg is compatible to image/*
     * @param format
     */
    , isCompatibleTo: function(format) {
        var len   = this.length;
        for(var i=0; i<len; i++){
            if(format.isCompatibleTo(this[i])){
                return this.length - i;
            }
        }
        return false;
    }
};

module.exports = new Class(FormatCollection);