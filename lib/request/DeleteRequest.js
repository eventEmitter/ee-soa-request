var Class = require('ee-class'),
    Request = require('./Request');

var DeleteRequest = {
    inherits: Request
    , init: function initialize (){
        initialize.parent();
        this.action = this.DELETE;
    }
    , mandatoryArgs: [
        'formats', 'version'
    ]
    , optionalArgs: {}

    , handle: function(handler){
        return handler.handleDeleteRequest(this);
    }
};

module.exports = new Class(DeleteRequest);