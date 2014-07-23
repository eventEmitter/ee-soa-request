var Class = require('ee-class'),
    Request = require('./Request');

var OptionsRequest = module.exports = new Class({

      inherits: Request

    , init: function initialize (){
        initialize.super.call(this, this.OPTIONS);

    }
    , mandatoryArgs: [
        'formats',
        'version'
    ]

    , actionName: {
        get: function(){
            return 'describe';
        }
    }

    , handle: function(handler){
        return handler.handleOptionsRequest(this);
    }
});