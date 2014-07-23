var Class = require('ee-class'),
    Request = require('./Request');

var CreateRequest = {

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
            return this.hasRelatedTo() ? 'mapping' : 'create';
        }
    }

    , handle: function(handler){
        return handler.handleCreateRequest(this);
    }
};

module.exports = new Class(CreateRequest);