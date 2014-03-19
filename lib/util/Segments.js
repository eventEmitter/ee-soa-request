var Class = require('ee-class');

var Segments = {

    inherits: Array

    , queriesCollection: function()
    {
        return !this.isEmpty() && this.last().queriesCollection();
    }

    , queriesResource: function()
    {
        return !this.queriesCollection();
    }

    , last: function(amount)
    {
        var last = this.peek(1);
        return !last ? last : last[0];
    }

    , peek: function(amount)
    {
        return this.slice(-amount);
    }

    , isEmpty: function()
    {
        return this.length === 0;
    }

    , normalize: function()
    {
        var list                = new Segments(),
            requiredElements    = this.queriesCollection() ? 2 : 1;

        if(this.isEmpty())
        {
            return list;
        }

        return list.pushAll(this.peek(requiredElements));
    }

    , pushAll:function(elements)
    {
        this.push.apply(this, elements);
        return this;
    }
};

module.exports = new Class(Segments);