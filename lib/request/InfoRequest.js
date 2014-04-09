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

    , handle: function(handler){
        return handler.handleInfoRequest(this);
    }
};

module.exports = new Class(InfoRequest);