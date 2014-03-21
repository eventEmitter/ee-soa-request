#EE-SOA-Request

Application internal, protocol independent request/response implementation.

##Todo
  1 Discuss which errors should be processed by the Services i.e. have to be implemented by the internal response.

##Notes

###Status Codes

Several of the following status codes need to be processed by the application, some can be catched by the server/application proxy

  - 200 OK
  - 201 Created
  - 301 Moved Permanently: the resource was permanently moved to another location
  - 302 Found: The resource was moved temporarily
  - 304 Not Modified: In response to a «If-Not-Modified» headers
  - 400 Bad Request: Syntax error in request, don't try the same request again!
  - 401 Unauthorized: Authentication required, see the «WWW-Authenticate» header
  - 403 Forbidden: Access is forbidden for the current user
  - 404 Not Found
  - 405 Method Not Allowed: The request method is not supported on that resource
  - 406 Not Acceptable: The requested content type could not be accepted. Try another content type
  - 410 Gone: the resource is gone and will not be availabel again ( deleted resource )
  - 411 Length Required: The request did not specify the length of its content, which is required by the requested resource.
  - 413 Request Entity Too Large: The request is larger than the server is willing or able to process
  - 415 Usupported Media Type: The request entity has a media type which the server or resource does not support
  - 416 Requested Range Not Satisfiable
  - 429 Too Many Requests: you hit the request rate limit
  - 431 Request Header Fields Too Large: The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large
  - 460 Select Not Satisfiable: The select statment could not be satisified, one or more of the slected fields do not exist
  - 461 Filter Not Satisfiable: The filter statment could not be satisified, one or more of the filtered fields does not exist or a filter method does not exist
  - 462 Ordering Not Satisfiable: The select statment could not be satisified, one or more of the slected fields do not exist
  - 463 Unsupported API Version: The API Version requested is not supported by the server
  - 500 Internal Server Error