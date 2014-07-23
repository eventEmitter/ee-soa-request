var Class = require('ee-class'),
    Request = require('./Request');

var ReadRequest = module.exports = new Class({

      inherits: Request
    
    , mandatoryArgs: [
          'formats'
        , 'version'
        , 'languages'
    ]

    , actionName: {
        get: function(){
            return this.queriesCollection() ? 'list' : 'listOne';
        }
    }

    , init: function initialize (){
        initialize.super.call(this, this.READ);
    }

    , handle: function(handler){
        return handler.handleReadRequest(this);
    }
});