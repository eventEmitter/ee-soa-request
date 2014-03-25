var http        = require('http'),
    filter      = require('./lib/filter'),
    Request     = require('./lib/request/request');

var log = console.log;
/**
 * Default Headers, should be included in the response.
 * - content-length
 * - connection
 * - accept-encoding
 *
 *
 * Request Headers:
 * ------------------------------------------------------
 * - Content-length:                            -> length:int
 * - Connection: keep-alive                     -> -
 * - Accept-encoding: gzip, deflate             -> -
 * - Accept: application/JSON                   -> format:string
 * - Accept-Language: de, fr;q=0.9, en;q=0.8    -> languages:array
 * - Content-Language: de                       -> language
 * - Range: 0-10                                -> range:object {from, to}
 * - Content-Type: Multipart/Form-Data          -> contentType:string
 * - API-Version: 0.0.1                         -> version:string
 * - Date:
 *
 * Preprocessed
 * - Select: id, name, tenant.id, friend.name, friend.id
 * - Filter: id=in(3,4)
 * - Order: name, friends.name DESC
 *
 * Response Headers:
 * ------------------------------------------------------
 * Content-Type: Application/JSON
 * Accept-Ranges: resources
 * Content-Range: 0-9/6000
 * Content-Language: en
 * Content-Length:
 * Location: /user/1
 * Date:
 * Error Codes:
 */

var fil = new filter.Filter('postalcode', '=', 4500, ['venues', 'address']);
//console.log(fil);
//console.log(fil.toString());

module.exports.Request = Request;
/*http.createServer(function(request, response){
    var factory = new factories.HTTPRequestFactory();
        factory.createUnifiedRequest(request, function(err, req){

        });
}).listen(8080);*/