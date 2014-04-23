"use strict";

var Class = require('ee-class'),

    util = require('../util');

var FormatCollection = {
    inherits: util.Collection
    // for debugging
    , _type: 'FormatCollection'
    /**
     * Returns if any of the formats is compatible to the passed format.
     * image/* is not compatible to image/jpeg
     * image/jpeg is compatible to image/*
     * @param format
     */
    , isCompatibleTo: function(format) {
        return this.any(function(element){ return format.isCompatibleTo(element); })
    }
};

module.exports = new Class(FormatCollection);