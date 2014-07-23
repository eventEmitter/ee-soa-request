var Class = require('ee-class'),
    Request = require('./Request');

var InfoRequest = module.exports = new Class({

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

    , dispatch: function(handler, options){
        return handler.handleInfoRequest(this, options);
    }
});