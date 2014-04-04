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
    , optionalArgs: {}
};

module.exports = new Class(ReadRequest);