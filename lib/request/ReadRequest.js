var Class = require('ee-class'),
    Request = require('./Request');

var ReadRequest = {
    inherits: Request
    , mandatoryArgs: [
        'formats', 'version', 'languages'
    ]
    , optionalArgs: {
        'select':   null,
        'filter':   null,
        'order':    null
    }
};

module.exports = new Class(ReadRequest);