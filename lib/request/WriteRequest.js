var Class = require('ee-class'),
    Request = require('./Request');

var WriteRequest = {

    inherits: Request

    , init: function initialize (){
        initialize.super.call(this);
        this.action = this.WRITE;
    }

    , mandatoryArgs: [
        'formats',
        'version',
        Request.checkContent
    ]

    , optionalArgs: {}

    , handle: function(handler) {
        return handler.handleWriteRequest(this);
    }
};

module.exports = new Class(WriteRequest);