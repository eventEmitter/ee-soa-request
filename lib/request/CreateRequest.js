var Class = require('ee-class'),
    Request = require('./Request');

var CreateRequest = module.exports = new Class({

      inherits: Request

    , init: function initialize (){
        initialize.super.call(this, this.CREATE);
    }

    , mandatoryArgs: [
        'formats',
        'version',
        Request.checkContent
    ]

    , actionName: {
        get: function(){
            return 'create';
        }
    }

    , dispatch: function(handler, options){
        return handler.handleCreateRequest(this, options);
    }
});