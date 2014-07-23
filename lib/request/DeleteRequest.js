var Class = require('ee-class'),
    Request = require('./Request');

var DeleteRequest = module.exports = new Class({

      inherits: Request
    , init: function initialize (){
        initialize.super.call(this, this.DELETE);
    }

    , mandatoryArgs: [
        'formats',
        'version'
    ]

    , actionName: {
        get: function(){
            return 'delete';
        }
    }

    , dispatch: function(handler, options){
        return handler.handleDeleteRequest(this, options);
    }
});