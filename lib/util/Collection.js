var Class = require('ee-class');

var Collection = {

    inherits: Array

    , last: function()
    {
        var last = this.peek(1);
        return !last ? last : last[0];
    }

    , peek: function(amount)
    {
        amount = -amount || -1;
        if(amount > 0){
            return this.slice(0, amount);
        }
        return this.slice(amount);
    }

    , isEmpty: function()
    {
        return this.length === 0;
    }

    , pushAll:function(elements)
    {
        this.push.apply(this, elements);
        return this;
    }

    , first: function(){
        var first = this.peek(-1);
        return !first ? first : first[0];
    }

    , any: function(callback){
        return this.some(callback);
    }
};

module.exports = new Class(Collection);