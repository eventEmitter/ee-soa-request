var Class = require('ee-class'),
    Request = require('./Request');

var CreateRequest = {
    inherits: Request

    , init: function initialize (){
        initialize.parent();
        this.action = this.CREATE;
    }

    , mandatoryArgs: [
        'formats', 'version', 'languages', 'contentType'
    ]

    , optionalArgs: {
        'select':   null
        , 'filters':   null
        //'order':    null
    }
};

module.exports = new Class(CreateRequest);