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

    , handle: function(handler){
        return handler.handleDeleteRequest(this);
    }
});