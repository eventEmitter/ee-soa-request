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
    , optionalArgs: {
        'fields':   null,
        'filters':   null,
        'order':    null
    }
};

module.exports = new Class(ReadRequest);