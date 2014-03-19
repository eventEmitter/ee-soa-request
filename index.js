var http        = require('http'),
    url         = require('url'),
    req         = require('./lib/request/request')
    factories   = require('./lib/factory');

var log = console.log;

/**
 * All streams are instances of EventEmitter
 * http://nodejs.org/api/events.html#events_class_events_eventemitter
 */

function getHeaders(prototype, request)
{

    var headers = {};
    for(var name in prototype){
        headers[name.toLowerCase()] = request.headers[name.toLowerCase()] || prototype[name];
    }
    return headers;
}

function getRequestCollection(request)
{
    var headers = getHeaders(
        {   'accept':               'json'                  // -> accept*
            , 'api-version':        '1'                     // -> version*
            , 'accept-language':    'en_us'                 // -> language
            , 'range':              {start:0, stop:10}      // -> range {start, stop}
            , 'select':             null                    // -> fields
            , 'order':              null                    // -> order
            , 'filter':             []                      // -> filters
        }, request);
    log(headers);
}

function getRequest(request)
{
    var headers = getHeaders(
        {   'accept':               'json'              // -> accept*
            , 'api-version':        '1'                 // -> version*
            , 'accept-language':    'en_us'             // -> language
            , 'select':             null                  // -> fields
        }, request);

    var query       = url.parse(request.url, true),
        queryArgs   = req.splitQueryPath(query.path);
    // if this is longer than 1 we need subrequests
    log(queryArgs);
    /**
     * Create a get request for every
     */
}

function postRequest(request)
{
    var headers = getHeaders(
        {   'accept':               'json'              // -> accept*
            , 'content-language':   'en_us'             // -> languages*
            , 'api-version':        '1'                 // -> version*
            , 'content-type':       'json'              // -> format*
            , 'select':             null                // -> fields
        }, request);
    log(headers);
}

function putRequest(request)
{

}

function deleteRequest(request){
    var headers = getHeaders(
        {   'accept':               'json'          // -> accept*
            , 'api-version':        '1'             // -> version*
            , 'select':             null            // -> fields*
            , 'content-language':   'en_us'         // -> language
        }, request);
    log(headers);
}

http.createServer(function(request, response){
    var factory = new factories.HTTPRequestFactory();
        factory.createUnifiedRequest(request, function(err, req){

        });
}).listen(8080);