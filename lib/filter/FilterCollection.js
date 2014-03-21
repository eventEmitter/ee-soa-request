var Class = require('ee-class'),
    Collection  = require('../util/Collection');

var FilterCollection = {
    inherits: Collection

    , or: function(filter){
        this.addChoice(filter);
    }
    /**
     * And has a higher precedence than or!
     * @param filter
     */
    , and: function(filter){
        if(this.last()){
            this.last().and(filter);
        }
    }

    , hasChoices: function(filter){
        return !this.isEmpty();
    }

    , addChoice: function(filter){
        return this.push(filter);
    }

    , toString: function(){
        var len = this.length;
        return this.join(' || ');
    }

    , isCollection: function(){
        return true;
    }

};

module.exports = new Class(FilterCollection);