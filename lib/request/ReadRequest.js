var Class = require('ee-class'),
    Request = require('./Request');

var ReadRequest = {
    inherits: Request
    , mandatoryArgs: [
        'accept', 'version', 'languages'
    ]
    , optionalArgs: {
        'select': null
    }
};

module.exports = new Class(ReadRequest);