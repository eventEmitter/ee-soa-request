var Class = require('ee-class'),
    Request = require('./Request');

var WriteRequest = {
    inherits: Request

    , init: function initialize (){
        initialize.parent();
        this.action = this.WRITE;
    }
    , mandatoryArgs: [
        'formats', 'version', 'languages'
    ]
    , optionalArgs: {
        'select':   null,
        'filter':   null,
        'order':    null
    }
};

module.exports = new Class(WriteRequests);