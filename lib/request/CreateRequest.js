var Class = require('ee-class'),
    Request = require('./Request');

var CreateRequest = {
    inherits: Request

    , init: function initialize (){
        initialize.parent();
        this.action = this.CREATE;
    }

    , mandatoryArgs: [
        'formats', 'version', 'languages', 'contentType'
    ]

    , optionalArgs: {}

    , handle: function(handler){
        return handler.handleCreateRequest(this);
    }
};

module.exports = new Class(CreateRequest);