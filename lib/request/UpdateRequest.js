var Class = require('ee-class'),
    Request = require('./Request');

var UpdateRequest = {
    inherits: Request

    , init: function initialize (){
        initialize.parent();
        this.action = this.UPDATE;
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

module.exports = new Class(UpdateRequest);