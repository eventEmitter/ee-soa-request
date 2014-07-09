"use strict";

var Class = require('ee-class'),
    types = require('ee-types');

var Format = {

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
     * image/* is not compatible to image/jpeg but
     * image/jpeg is compatible to image/*
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
};

module.exports = new Class(Format);