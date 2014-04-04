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

    , optionalArgs: {}
};

module.exports = new Class(CreateRequest);