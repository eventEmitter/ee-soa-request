var stream    = require('stream');

var Class           = require('ee-class');
/**
 * Created by michaelruefenacht on 14.03.14.
 * Some of the errors can be left out to an earlier stage.
 */
var Response = {

    inherits: stream.Duplex

    , state: {
        OK:                     1   //200
        , CREATED:              2   //201
        //-------------------------
        , MALFORMED_ERROR:      4   //400
        , AUTHORIZATION_ERROR:  8   //401
        , ACCESS_DENIED_ERROR:  16  //403
        , NOT_FOUND_ERROR:      32  //404
        , INVALID_OPERATION_ERROR: 64  //405
        , INVALID_CONTENT_ERROR: 128 //406
        , RESOURCE_DELETED_ERROR: 256 //410 --> isn't that a 404?
        , UNKNOWN_SIZE_ERROR:     512
        , INVALID_SIZE_ERROR:       1024
        , INVALID_MEDIA_TYPE_ERROR:       2048
        , TOO_MANY_REQUESTS_ERROR: 4096
        , FIELDS_TOO_LARGE_ERROR: 8192
        , UNSUPPORTED_API_ERROR: 16384
        , EXCEPTION_ERROR: 32768
    }

    , isData: function(){
        return !(this.isResource() || this.isError());
    }
    , isResource: function(){
        return true || false;
    }
    , isError: function(){
        return true || false;
    }
};

module.exports = new Class(Response);