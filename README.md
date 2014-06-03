#ee-soa-request

Application internal, protocol independent request/response implementation.

## installation

    npm install ee-soa-request

## build status

[![Build Status](https://travis-ci.org/eventEmitter/ee-soa-request.png?branch=master)](https://travis-ci.org/eventEmitter/ee-soa-request)

## usage

  var Request = require('ee-soa-request');

  var myRequest = new Request();

  var myReadRequest = new Request.ReadRequest();

## api

Some of the important methods the read request object provides (incomplete):

### Base Accessors

    // needs a callback to support asynchronous loading in the future
    request.getContent(cb)
    request.setContent(content)

    request.setContentType(type)
    request.getContentType()

### Type
The type of the request is based on the action code (for crud/rest mapping, analogous to http methods).

    request.setAction(actionCode)
    request.getAction()

    request.isOfType(actionCode)

    request.isReadRequest()
    request.isCreateRequest()
    request.isUpdateRequest()
    request.isDeleteRequest()
    request.isWriteRequest()
    request.isInfoRequest()
    request.isOptionsRequest()

### Relations
A request is often created to query specific relations/models.

    request.getCollection() :string
    // alias
    request.getController() :string
    request.setCollection(collection:string)
    request.queriesCollection() :boolean

    request.getResourceId()
    request.setResourceId(id:mixed)
    request.hasResourceId()

    request.hasRelatedTo()
    request.getRelatedTo() : {model:string, id: mixed}
    request.setRelatedTo(model, id)

### Accessors and Helpers

    request.getVersion()                    // api version
    request.setVersion(version)
    request.versionCompare(version)         // 0 if equal, -1 if request version is smaller, 1 if bigger

    request.addFormat(type, subtype)        // e.g. 'application' 'json'
    request.acceptsFormat(type, subtype)

    request.setLanguages(languageArray)
    request.getLanguages()
    request.acceptsLanguage(languageString)

    // filters
    // projections
    // orderings
    // orderings





