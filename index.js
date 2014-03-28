var filter      = require('./lib/filter'),
    req         = require('./lib/request'),
    util        = require('./lib/util');

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
new req.UpdateRequest();
module.exports.request          = req;
module.exports.filter           = filter;
module.exports.util             = util;