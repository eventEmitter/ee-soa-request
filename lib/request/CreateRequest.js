var Class = require('ee-class'),
    Request = require('./Request');

var CreateRequest = {
    inherits: Request

    , init: function initialize (){
        initialize.parent();
        this.action = this.CREATE;
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

module.exports = new Class(CreateRequest);