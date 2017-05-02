#ee-soa-request

[![Greenkeeper badge](https://badges.greenkeeper.io/eventEmitter/ee-soa-request.svg)](https://greenkeeper.io/)

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
    request.getContent(callback)
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

    request.hasRange()
    request.setRange(from, to)
    request.getRange(): {from:mixed, to:mixed}  // Ranges (from, to) are set to null if not present

    // filters
    // projections
    // orderings
    // orderings

## Types and Dispatching
The following request types are defined (based on the http verbs for rest interfaces), please use them and not the generic `Request`.

  - **DeleteRequest** _DELETE_
  - **InfoRequest** _HEAD_
  - **CreateRequest** _PUT_
  - **OptionsRequest** _OPTIONS_
  - **ReadRequest** _GET_
  - **UpdateRequest** _PATCH_
  - **WriteRequest** _POST_

The different types of requests implement a `dispatch` method which takes a handler as its argument (the request performs a so called double-dispatch, this allows you to easily handle the request without knowing its type upfront). A handler is described by the following set of methods (to say it in terms of duck-typing)

    var handler = {
        handleCreateRequest: function(req, options){ ... }
        handleDeleteRequest: function(req, options){ ... }
        handleInfoRequest: function(req, options){ ... }
        handleOptionsRequest: function(req, options){ ... }
        handleReadRequest: function(req, options){ ... }
        handleUpdateRequest: function(req, options){ ... }
        handleWriteRequest: function(req, options){ ... }
    }

You can use the options parameter to pass in additional data e.g. the request if you want to send the your data directly from your handler. See the following (rudimentary) example for a read request:

    var handler = {
        handleReadRequest: function(req, options){
            // list
            var   query = 'SELECT * FROM :collection:'
                , params = {collection: req.getCollection()};

            // listOne
            if(req.hasResourceId()){
                params['id'] = req.getResourceId();
                query += 'WHERE `id`= :id:';
            }

            var data = this.performQuery(query, params);
            options.response.send(options.response.OK, data);
        }
    };

    request.dispatch(handler, {response: response});

## Format
Formats are the internal representation of the internet media types (currently not supporting parameters such as the encoding). All types of `Request` objects provide easy accessors to preserve you from dealing with the internal data format.

### addFormat(type, subtype)
Add a format to the current format collection of the request (type and subtype are `strings` the asterisk represents the wildcard.

### acceptsFormat(type, subtype)
This method can be used to to check if a request accepts a specific response format based on the internet media type (type, subtype). It returns the priority of the passed format to allow your service or controller to check which formats are accepted, and which should be delivered (the relation is `covariant`, so `image/*` accepts `image/jpg` but not the other way round). Lets consider an example for an simple image service:

    // The accepted formats are image/jpg, application/*
    // We can create jpgs and json
    var acceptsJPG  = request.acceptsFormat('image', 'jpg'),
        acceptsJSON = request.acceptsFormat('application', 'json');

    if(acceptsJPG === false && acceptsJSON === false){
        return this.sendUnsatisfiableResponse();
    }

    if(acceptsJPEG > acceptsJSON){
        return this.sendImageResponse();
    }

    return this.sendJSONResponse();

One can immediately see, that we need the priority to be able to distinguish which response to send (because the request accepts both). More formats can easily be checked in a loop.