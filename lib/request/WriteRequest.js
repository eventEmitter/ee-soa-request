var Class = require('ee-class'),
    Request = require('./Request');

var WriteRequest = module.exports = new Class({

    inherits: Request

    , init: function initialize (){
        initialize.super.call(this, this.WRITE);
    }

    , mandatoryArgs: [
        'formats',
        'version',
        Request.checkContent
    ]

    , actionName: {
        get: function(){
            return 'createOrUpdate';
        }
    }

    , dispatch: function(handler, options){
        return handler.handleWriteRequest(this, options);
    }
});