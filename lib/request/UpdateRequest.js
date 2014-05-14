var Class = require('ee-class'),
    Request = require('./Request');

var UpdateRequest = {
    inherits: Request

    , init: function initialize (){
        initialize.super.call(this);
        this.action = this.UPDATE;
    }

    , mandatoryArgs: [
        'formats', 'version', 'contentLanguage', 'contentType'
    ]
    , optionalArgs: {}

    , handle: function(handler){
        return handler.handleUpdateRequest(this);
    }
};

module.exports = new Class(UpdateRequest);