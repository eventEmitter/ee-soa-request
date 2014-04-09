var Class = require('ee-class'),
    Request = require('./Request');

var WriteRequest = {
    inherits: Request

    , init: function initialize (){
        initialize.parent();
        this.action = this.WRITE;
    }
    , mandatoryArgs: [
        'formats', 'version', 'languages', 'contentType'
    ]

    , optionalArgs: {}

    , handle: function(handler) {
        return handler.handleWriteRequest(this);
    }
};

module.exports = new Class(WriteRequest);