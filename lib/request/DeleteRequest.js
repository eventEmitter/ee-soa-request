var Class = require('ee-class'),
    Request = require('./Request');

var DeleteRequest = {
    inherits: Request
    , init: function initialize (){
        initialize.parent();
        this.action = this.DELETE;
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

module.exports = new Class(DeleteRequest);