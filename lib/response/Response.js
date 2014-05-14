var stream    = require('stream');

var Class     = require('ee-class'),
    Types     = require('ee-types'),
    status    = require('./status');

/**
 * Currently the response does only support object mode.
 */
var Response = {

    inherits:       stream.PassThrough

    , status: null

    , init: function(){
        this._init();
        this.status = status;
    }

    , _init: function _init() {
       var options = {
           objectMode: true
       };
       stream.PassThrough.call(this, options);
    }
    /**
     * todo: create an event different from 'end'
     * @param status
     * @param content
     */
    , send: function(status, content){
        this.emit('end', {
            status: status
            , content: content
        });
    }

};
var ResponseClass = new Class(Response);
ResponseClass.status = status;
module.exports = ResponseClass;