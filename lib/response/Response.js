var stream    = require('stream');

var Class     = require('ee-class'),
    Types     = require('ee-types');

/**
 * Currently the response does only support object mode.
 */
var Response = {

    inherits: stream.PassThrough
    , _initialized: false
    , _objectMode: false
    , _counter: 0

    , init: function(){
        this._init();
    }

    , _init: function _init() {
       var options = {
           objectMode: true
       };
       stream.PassThrough.call(this, options);
    }
};

module.exports = new Class(Response);