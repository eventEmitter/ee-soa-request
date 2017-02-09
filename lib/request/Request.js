(function(){
    'use strict';



    var   Class                 = require('ee-class')
        , type                  = require('ee-types')
        , semver                = require('semver')
        , filter                = require('../filter')
        , FormatCollection      = require('./FormatCollection')
        , Format                = require('./Format');



    var FilterCollection = filter.FilterCollection;

    /**
     * Request abstraction.
     * We try to keep it independent from the upper layer transport protocol, hence the
     * naming isn't always self explanatory.
     *
     * @type Request
     */
    module.exports = new Class({

        /**
         * Action constants
         * @todo: move them to a file
         */
          READ:     1   // GET
        , CREATE:   4   // POST
        , UPDATE:   8   // PATCH
        , DELETE:   16  // DELETE
        , WRITE:    32  // PUT
        , INFO:     64  // HEAD
        , OPTIONS:  128 // OPTIONS

        /**
         * The collection we are accessing eg 'post'
         *
         * @link #getCollection
         */
        , collection: null

        /**
         * Id of the resource if present, null on collections or on post request.
         *
         * @link #getResource()
         * @link #hasResource()
         */
        , resourceId: null

        /**
         * Which formats are accepted by the client.
         *
         * {@link #acceptsFormat(format)}
         */
        , formats: null

        /**
         * The accepted languages in the order provided by the original request.
         *
         * {@link #getLanguages()}
         * {@link #acceptsLanguage(language)}
         */
        , languages: []

        /**
         * Represents an access token for authentication.
         * {@link #hasAccessToken()}
         * {@link #setAccessToken(type, value)}
         * {@link #getAccessToken()}
         */
        , accessToken: null

        /**
         * Represents a request token for authentication.
         * {@link #hasRequestToken()}
         * {@link #setRequestToken(type, value)}
         * {@link #getRequestToken()}
         */
        , requestToken: null

        /**
         * The version string of the API.
         *
         * {@link #versionCompare(version)}
         */
        , version: null

        /**
         * Range query specification, only on collections.
         *
         * The range is always propagated to the most specific query element (i.e. the last).
         *
         * {@link #getRange()}
         * {@link #hasRange()}
         * {@link #setRange(start, end)}
         */
        , range: null

        /**
         * The content of the request (a stream!!).
         *
         * {@link #getContent()}
         * {@link #getContentType()}
         */
        , content: null

        /**
         * A flag to indicate if there is content without the necessity to access
         * the content itself.
         */
        , contentPresent: false

        /**
         * The content type of the payload.
         *
         * Since we are relying on streams, this is essential!!
         *
         * {@link #getContentType()}
         * {@link #hasContentType(type)}
         * @type String
         */
        , contentType: null

        /**
         * The language of the payload.
         *
         *
         * {@link #getContentLanguage()}
         * {@link #hasContentLanguage()}
         * @type String
         */
        , contentLanguage: null


        /**
         * Additional parameters that cannot be mapped by the current spec.
         *
         * {@link #getOption(key, fallback)}
         * @type Object
         */
        , options: null
        , parameters: null

        /**
         * The set of fields to return.
         *
         * The api allows a projection of the fields (to reduce it to a subset).
         *
         * {@link #getFields()}
         * @type Array
         */
        , fields: null

        /**
         * Used to check if the request is valid.
         * @todo create unified error messages
         * {@link #validate()}
         */
        , mandatoryArgs: []
        , optionalArgs: []

        /**
         * The filters applied to the query.
         *
         * Could contain dedicated criteria as objects or functions which are applied to the collection after retrieval.
         *
         * @todo: how to distinguish the logical operators between the criteria?
         * @type Array
         */
        , filters: null

        /**
         * The type of action, used to distinguish the request types.
         * @type int
         */
        , action: null

        /**
         * The application id to distinguish applications.
         */
        , applicationId: null

        /**
         * Request to a sub resource, subselect.
         *
         * @type Request
         */
        , subRequests: null



        // meta fields
        , meta: null


        /**
         * Used to create relations of the form:
         * @type {model: 'model' id: ''}
         */
        , relatedTo: null
        /**
         * Array filled with objects with a name and a tag.
         * We need an array to preserve ordering.
         */
        , order: []

        , tenant: null

        // cart token => shopping
        , cartToken: null

        , actionName: {
            get: function(){
                return 'read';
            }
        }

        , hasApplicationId: function() {
            return this.applicationId !== null;
        }

        , getApplicationId: function() {
            return this.applicationId
        }

        , setApplicationId: function(applicationId) {
            this.applicationId = applicationId
            return this;
        }

        , init: function initialize(action) {
            this.action     = action || this.READ;
            this.formats    = new FormatCollection();
            this.filters    = new FilterCollection();


            this.subRequests = [];
            this.meta = new Set();


            /** todo: this seems to be too crud specific for me */
            this.relatedTo  = { model: null, id: null };
            this.options    = {};
            this.parameters = {};

            this.fields         = ['*'];
            this.accessToken    = {type: null, value: null};
            this.requestToken   = {type: null, value: null};
            this.range          = {from: 0, to: null};
            this.version        = '1';

            // the request can have multiple accessTokens
            this.accessTokens = [];
        }

        , isReadRequest: function() {
            return this.isOfType(this.READ);
        }

        , isCreateRequest: function() {
            return this.isOfType(this.CREATE);
        }

        , isUpdateRequest: function() {
            return this.isOfType(this.UPDATE);
        }

        , isDeleteRequest: function() {
            return this.isOfType(this.DELETE);
        }

        , isWriteRequest: function() {
            return this.isOfType(this.WRITE);
        }

        , isInfoRequest: function() {
            return this.isOfType(this.INFO);
        }

        , isOptionsRequest: function() {
            return this.isOfType(this.OPTIONS);
        }

        /**
         * Fucking type check.
         *
         * request.isOfType(request.READ);
         *
         * @param type
         * @returns {boolean}
         */
        , isOfType: function(type) {
            return this.getAction() === type;
        }

        , getSubRequests: function() {
            return this.subRequests;
        }

        , hasSubRequests: function() {
            return this.getSubRequests() && this.getSubRequests().length > 0;
        }

        , setMeta: function(items) {
            if (items && items.length) items.forEach(i => this.meta.add(i));
            return this;
        }

        , getMeta: function() {
            return Array.from(this.meta);
        }

        , hasMeta: function(id) {
            return this.meta.has(id);
        }

        , setSubRequests: function(requests) {
            this.subRequests = requests;
            return this;
        }


        , acceptsLanguage: function(lang) {
            return this.languages.indexOf(lang.toLowerCase()) !== -1;
        }

        , _arrayToLowercase: function(arr) {
            return arr.map(function(current){
                return typeof current === 'string' ? current.toLowerCase() : current;
            });
        }

        , setLanguages: function(languages) {
            this.languages = this._arrayToLowercase(languages);
            return this;
        }

        , getLanguage: function() {
            return this.languages.length > 0 ? this.languages[0] : null;
        }

        , getLanguages: function() {
            return this.languages;
        }


        , getVersion: function() {
            return this.version || '0.0.0';
        }


        , satisfiesVersion: function(compareToVersion) {
            semver.satisfies(this.getVersion(), compareToVersion);
        }


        , setVersion: function(version) {
            this.version = type.null(version) || type.undefined(version) ? null : version.toString();
            return this;
        }

        , versionCompare: function(version) {
            var vers = version.toString();
            if(vers === this.getVersion()){
                return 0;
            }
            return (vers > this.getVersion()) ? -1 : 1;
        }

        , setRange: function(from, to) {
            this.range.to   = (!!to || to === 0) ?      to : this.range.to
            this.range.from = (!!from || from === 0) ?  from : this.range.from;
            return this;
        }

        , getRange: function() {
            return this.range;
        }

        , hasRange: function() {
            return this.getRange().to !== null;
        }

        , setFilters: function(filters) {
            this.filters = filters;
            return this;
        }

        , getFilters: function() {
            return this.filters;
        }

        , hasFilters: function() {
            return !!this.filters;
        }

        , getContent: function(cb) {
            // if we want to inject a stream, we could read the stream here.
            cb(null, this.content);
        }

        , setContent: function(content) {
            this.contentPresent = !type.null(content) && !type.undefined(content);
            this.content = content;
            return this;
        }

        , hasContent: function(){
            return this.contentPresent;
        }

        , getOption: function(key, fallback) {
            var opts = this.getOptions();
            return (key in opts) ? opts[key] : fallback;
        }

        , getOptions: function() {
            return this.options;
        }

        , setOptions: function(options) {
            this.options = options;
            return this;
        }

        , getParameter: function(key, fallback) {
            var params = this.getParameters();
            return (key in params) ? params[key] : fallback;
        }

        , getParameters: function() {
            return this.parameters;
        }

        , setParameters: function(parameters) {
            this.parameters = parameters;
            return this;
        }


        , getQuery: function() {
            return this.query;
        }

        , setQuery: function(query) {
            this.query = query;
            return this;
        }


        , getFields: function() {
            return this.fields;
        }

        , setFields: function(fields) {
            this.fields = fields;
            return this;
        }

        , queriesCollection: function() {
            return !this.hasResourceId();
        }

        , getResourceId: function() {
            return this.resourceId;
        }

        , hasResourceId: function() {
            return this.resourceId !== null;
        }

        , setResourceId: function(resource) {
            this.resourceId = resource;
            return this;
        }

        , acceptsFormat: function(type, subtype) {
           var form = new Format(type, subtype);
           return this.getFormats().isCompatibleTo(form);
        }

        , addFormat: function(type, subtype) {
            this.getFormats().push(new Format(type, subtype));
            return this;
        }

        , getFormats: function() {
            return this.formats;
        }

        , setFormats: function(formats) {
            if(!(formats instanceof FormatCollection)) {
                for(var i=0; i<formats.length;i++){
                    this.formats.push(formats[i]);
                }
                return this;
            }
            this.formats = formats;
            return this;
        }

        , getController: function() {
            return this.getCollection();
        }

        , getCollection: function() {
            return this.collection;
        }

        , setCollection: function(collection) {
            this.collection = collection;
            return this;
        }
        , setAction: function(action){
            this.action = action;
            return this;
        }

        , getAction: function(){
            return this.action;
        }

        , getActionName: function() {
            if(this.isReadRequest())    return this.queriesCollection() ? 'list' : 'listOne';
            if(this.isDeleteRequest())  return 'delete';
            if(this.isUpdateRequest())  return 'update';
            if(this.isCreateRequest())  return 'create';
            if(this.isWriteRequest())   return 'createOrUpdate';
            if(this.isOptionsRequest()) return 'describe';
            if(this.isInfoRequest())    return 'info';
        }

        , getMandatoryArgs: function() {
            return this.mandatoryArgs;
        }

        , getContentType: function() {
            return this.contentType;
        }

        , setContentType: function(contentType) {
            this.contentType = contentType;
            return this;
        }

        , hasContentType: function(){
            return this.getContentType() !== null;
        }

        , validate: function() {

            var mandatory   = this.getMandatoryArgs(),
                len         = mandatory.length;

            for(var i = 0; i<len; i++) {

                var   property = mandatory[i];

                if(type.function(property)) {
                    property.call(null, this);
                }
                else {
                    var value = this[property];

                    if(!value || !(value.length)){
                        throw new Error('Malformed request, field '+property+' is mandatory');
                    }
                }
            }
        }

        , hasRelatedTo: function() {
            return this.relatedTo.model !== null;
        }

        , getRelatedTo: function() {
            return this.relatedTo;
        }

        , setRelatedTo: function(model, id) {
            this.relatedTo.model = model;
            this.relatedTo.id = id;
            return this;
        }

        , getContentLanguage: function() {
            return this.contentLanguage;
        }

        , setContentLanguage: function(contentLanguage){
            this.contentLanguage = contentLanguage;
            return this;
        }

        , hasContentLanguage: function(){
            return this.contentLanguage !== null;
        }

        , getOrder: function(){
            return this.order;
        }

        , setOrder: function(order){
            this.order = order;
            return this;
        }

        , hasRequestToken: function(){
            return this.requestToken.value !== null;
        }

        , getRequestToken: function(){
            return this.requestToken;
        }

        , setRequestToken: function(type , value){
            this.requestToken.type = type;
            this.requestToken.value = value;
            return this;
        }

        , hasAccessToken: function(){
            return this.accessToken.value !== null
        }

        , getAccessToken: function(){
            return this.accessToken;
        }

        , setAccessToken: function(type, value){
            this.accessToken.type   = type;
            this.accessToken.value  = value;
            return this;
        }

        , hasCartToken: function() {
            return !!this.cartToken;
        }

        , getCartToken: function() {
            return this.cartToken;
        }

        , setCartToken: function(token) {
            this.cartToken = token;
            return this;
        }

        , populateRequest: function(req){
            return req  .setAction(this.getAction())
                        .setCollection(this.getCollection())
                        .setResourceId(this.getResourceId())
                        .setLanguages(this.getLanguages())
                        .setFormats(this.getFormats())
                        .setContentType(this.getContentType())
                        .setVersion(this.getVersion())
                        .setRequestToken(this.getRequestToken().type, this.getRequestToken().value)
                        .setParameters(this.getParameters())
                        .setTenant(this.getTenant())
                        .setMeta(this.getMeta())
                        .setAccessTokens(this.getAccessTokens().slice(0))
                        .setCartToken(this.getCartToken());
        }

        , setTenant: function(tenant) {
            this.tenant = tenant;
            return this;
        }

        , getTenant: function() {
            return this.tenant;
        }



        , setAccessTokens: function(accessTokens) {
            this.accessTokens = accessTokens;
            return this;
        }

        , getAccessTokens: function() {
            return this.accessTokens;
        }

        , addAccessToken: function(token) {
            this.accessTokens.push(token);

            this.subRequests.forEach(function(subRequest) {
                subRequest.addAccessToken(token);
            });
        }



        , setDiscovery: function(value) {
            this.discovery = value;
        }

        , getDiscovery: function() {
            return this.discovery;
        }

        , hasDiscovery: function() {
            return type.string(this.discovery);
        }

        , handle: function(handler) {
            return this.dispatch(handler);
        }

        , dispatch: function(handler, options){
            throw new Error('Unimplemented dispatch method!')
        }

    });

    module.exports.checkContent = function(me){
        if(me.hasContent() && !(me.hasContentLanguage() && me.hasContentType())){
            throw new Error("Request seems to have content without providing an appropriate type or language.")
        }
    }
}) ();
