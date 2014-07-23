"use strict";

var Class = require('ee-class'),
    types = require('ee-types');

/**
 * Represents an internet media (or MIME) type.
 *
 * Media types are represented by a
 *
 *  type / subtype
 *
 * identifier (currently this class does not include parameters).
 *
 * todo: add Parameters.
 */
var Format = module.exports = new Class({

      WILDCARD: '*'

    , type: null
    , subtype: null

    , init: function initialize(type, subtype) {
        type = (types.string(type)) ? type : this.WILDCARD;
        subtype = subtype || this.WILDCARD;

        this.type       = type.toLowerCase();
        this.subtype    = subtype.toLowerCase();
    }

    , getType: function(){
        return this.type
    }

    , setType: function(type){
        this.type = type
        return this;
    }

    , getSubtype: function(){
        return this.subtype
    }

    , setSubtype: function(subtype){
        this.subtype = subtype
        return this;
    }

    /**
     * Determines if the current format can be delivered
     * if the passed format is requested.
     *
     * Models covariance for the passed formats, see
     * http://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science).
     *
     * Example:
     * image/* not compatible to image/jpeg
     * (because we are not allowed to deliver image/png)
     * ergo: image/png compatible to image/*
     *
     * @param format
     * @returns {boolean}
     */
    , isCompatibleTo: function(format){
        if(format.isWildCard()){
            return true;
        }
        return  this.getType() == format.getType() &&
                (   this.getSubtype() == format.getSubtype()
                    || format.getSubtype() == this.WILDCARD);
    }

    , isWildCard: function(){
        return this.getType() === this.WILDCARD;
    }

    , toString: function(){
        return this.getType()+'/'+this.getSubtype();
    }

});