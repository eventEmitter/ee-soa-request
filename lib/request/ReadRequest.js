var Class = require('ee-class'),
    Request = require('./Request');

var ReadRequest = {

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
};

module.exports = new Class(ReadRequest);