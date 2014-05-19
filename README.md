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
