var Class = require('ee-class'),
    Request = require('./Request');

var OptionsRequest = {
    inherits: Request
    , init: function initialize (){
        initialize.parent();
        this.action = this.OPTIONS;
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

module.exports = new Class(OptionsRequest);