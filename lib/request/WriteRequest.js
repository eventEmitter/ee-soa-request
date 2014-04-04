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
};

module.exports = new Class(WriteRequest);