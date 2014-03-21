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
        amount = amount || 1;
        return this.slice(-amount);
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
};

module.exports = new Class(Collection);