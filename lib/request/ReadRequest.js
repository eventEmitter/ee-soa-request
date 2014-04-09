var Class = require('ee-class'),
    Request = require('./Request');

var ReadRequest = {
    inherits: Request

    , init: function initialize (){
        initialize.parent();
        this.action = this.READ;
    }
    , mandatoryArgs: [
        'formats', 'version', 'languages'
    ]
    , optionalArgs: {}

    , handle: function(handler){
        return handler.handleReadRequest(this);
    }
};

module.exports = new Class(ReadRequest);