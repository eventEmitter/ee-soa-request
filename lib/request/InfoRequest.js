var Class = require('ee-class'),
    Request = require('./Request');

var InfoRequest = {

      inherits: Request

    , init: function initialize (){
        initialize.super.call(this, this.INFO);
    }
    , mandatoryArgs: [
        'formats',
        'version'
    ]

    , actionName: {
        get: function(){
            return 'head';
        }
    }

    , handle: function(handler){
        return handler.handleInfoRequest(this);
    }
};

module.exports = new Class(InfoRequest);