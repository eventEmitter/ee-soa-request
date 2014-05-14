module.exports = {
    OK:                     1   // 200
    , CREATED:              2   // 201

    , TARGET_MOVED:         20  // 301
    , TARGET_FOUND:         21  // 302
    , TARGET_NOT_MODIFIED:  22  // 304
    , TARGET_NOT_FOUND:     26  // 404
    , TARGET_GONE:          29  // 410

    , ACCESS_MALFORMED:     23  // 400
    , ACCESS_UNAUTHORIZED:  24  // 401
    , ACCESS_FORBIDDEN:     25  // 403
    , ACCESS_LIMIT_EXCEEDED:    32  // 429 - request limit

    , FORMAT_UNAVAILABLE:   28  // 406 - not acceptable, we cannot deliver the requested accept type
    , BODY_TOO_LARGE:            30  // 413

    , INVALID_ACTION:       27  // 405 - method not allowed
    , INVALID_RANGE:        31  // 416
    , INVALID_SELECTION:    33  // 460 - selection is not valid
    , INVALID_FILTER:       34  // 461 - filter is not valid
    , INVALID_ORDER:        35  // 462 - ordering is not valid
    , INVALID_API_VERSION:  36  // 463 - api version is not valid

    , SERVICE_EXCEPTION:    37  // 500
    , SERVICE_UNAVAILABLE:  38  // 503
};