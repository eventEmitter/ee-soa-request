var Class = require('ee-class'),
    Request = require('./Request');

var InfoRequest = {
    inherits: Request
    , init: function initialize (){
        initialize.parent();
        this.action = this.INFO;
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

module.exports = new Class(InfoRequest);