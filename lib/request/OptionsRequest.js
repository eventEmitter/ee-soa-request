var Class = require('ee-class'),
    Request = require('./Request');

var OptionsRequest = {
    inherits: Request
    , init: function initialize (){
        initialize.parent();
        this.action = this.OPTIONS;
    }
    , mandatoryArgs: [
        'formats', 'version'
    ]
    , optionalArgs: {}
};

module.exports = new Class(OptionsRequest);