var Class = require('ee-class'),
    Request = require('./Request');

var ReadRequest = module.exports = new Class({

      inherits: Request
    
    , mandatoryArgs: [
          'formats'
        , 'version'
        , 'languages'
    ]

    , init: function initialize (){
        initialize.super.call(this);
        this.action = this.READ;
    }

    , handle: function(handler){
        return handler.handleReadRequest(this);
    }
});