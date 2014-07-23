"use strict";

var Class = require('ee-class'),

    util = require('../util');

var FormatCollection = module.exports = new Class({
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
     * as false and break compatibility, higher value -> higher priority).
     *
     * Example:
     * Request accepts image/jpeg and image/png
     *
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
});