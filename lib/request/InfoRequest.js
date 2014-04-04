var Class = require('ee-class'),
    Request = require('./Request');

var InfoRequest = {
    inherits: Request
    , init: function initialize (){
        initialize.parent();
        this.action = this.INFO;
    }
    , mandatoryArgs: [
        'formats', 'version'
    ]
    , optionalArgs: {}
};

module.exports = new Class(InfoRequest);