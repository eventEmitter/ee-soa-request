var Class = require('ee-class'),
    Request = require('./Request');

var UpdateRequest = module.exports = new Class({

      inherits: Request

    , init: function initialize (){
        initialize.super.call(this, this.UPDATE);
    }

    , mandatoryArgs: [
        'formats',
        'version',
        Request.checkContent
    ]

    , actionName: {
        get: function(){
            return this.hasRelatedTo() ? 'mapping' : 'update';
        }
    }

    , handle: function(handler){
        return handler.handleUpdateRequest(this);
    }
});