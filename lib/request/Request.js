var Class   = require('ee-class');

/**
 * Request abstraction, basically describes the requests on collections.
 * @todo: remove the id
 * @type Request
 */
var Request = {

    /**
     * The collection we are accessing eg 'post'
     *
     * @link #getResource
     */
    collection: null

    /**
     * Id of the resource if present, null on collections or on post request.
     *
     * @link #getResource()
     * @link #hasResource()
     */
    , resource: null

    /**
     * Which format the payload has.
     *
     * {@link #acceptsFormat(format)}
     */
    , format: null

    /**
     * The accepted languages in the order provided by the original request.
     *
     * {@link #getLanguages()}
     * {@link #acceptsLanguage(language)}
     */
    , languages: []

    /**
     * The version string of the API.
     *
     * {@link #versionCompare(version)}
     */
    , version: '1'

    /**
     * Range query specification, only on collections.
     *
     * The range is always propagated to the most specific query element (i.e. the last).
     *
     * {@link #getRange()}
     * {@link #hasRange()}
     * {@link #setRange(start, end)}
     */
    , range: {}

    /**
     * The content of the request (a stream!!).
     *
     * {@link #getContent()}
     * {@link #getContentType()}
     */
    , content: null

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
     * Additional parameters that cannot be mapped by the current spec.
     *
     * {@link #getOption(key, fallback)}
     * @type Object
     */
    , options: {}

    /**
     * The set of fields to return.
     *
     * The api allows a projection of the fields (to reduce it to a subset).
     *
     * {@link #getFields()}
     * @type Array
     */
    , fields: []

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
    , filters: []

    /**
     * The type of action, used to distinguish the request types.
     * @type int
     */
    , action: null

    /**
     * Action constants.
     * @todo think about creating a list type (i.e. get on a collection)
     */
    , READ:     1   // GET
    , CREATE:   2   // POST
    , UPDATE:   4   // PATCH
    , DELETE:   8   // DELETE
    , WRITE:    16  // PUT
    , INFO:     32  // HEAD
    , OPTIONS:  64  // OPTIONS

    , isReadRequest: function()
    {
        return this.isOfType(this.READ);
    }

    , isCreateRequest: function()
    {
        return this.isOfType(this.CREATE);
    }

    , isUpdateRequest: function()
    {
        return this.isOfType(this.UPDATE);
    }

    , isDeleteRequest: function()
    {
        return this.isOfType(this.DELETE);
    }

    , isWriteRequest: function()
    {
        return this.isOfType(this.WRITE);
    }

    , isInfoRequest: function()
    {
        return this.isOfType(this.INFO);
    }

    , isOptionsRequest: function()
    {
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
    , isOfType: function(type)
    {
        return this.action === type;
    }

    /**
     * Request to a sub resource.
     *
     * @type Request
     */
    , subRequest: null

    , initialize: function initialize(fields)
    {
        parent().initialize(fields);
    }

    , hasSubRequest: function()
    {
        return this.getSubRequest() !== null;
    }

    , setSubRequest: function(request)
    {
        this.sub = request;
        return this;
    }

    , getSubRequest: function()
    {
        return this.subRequest;
    }


    , acceptsLanguage: function(lang)
    {
        return this.languages.indexOf(lang.toLowerCase()) !== -1;
    }

    , setLanguages: function(languages)
    {
        this.languages = languages;
        return this;
    }

    , getLanguage: function()
    {
        return this.languages.length > 0 ? this.languages[0] : null;
    }

    , getLanguages: function()
    {
        return this.languages;
    }


    , getVersion: function()
    {
        return this.version;
    }

    , setVersion: function(version)
    {
        this.version = version;
        return this;
    }

    , versionCompare: function(version){
        var vers = version.toString();
        if(vers === this.getVersion()){
            return 0;
        }
        return (vers > this.getVersion()) ? -1 : 1;
    }

    , setRange: function(to, from){
        this.range      = (this.range) ? this.range : {};
        this.range.to   = to || this.range.to
        this.range.from = from || this.range.from;
        return this;
    }

    , getRange: function(){
        return this.range;
    }

    , hasRange: function()
    {
        return this.getRange() !== null;
    }

    , setFilters: function(filters)
    {
        this.filters = filters;
        return this;
    }

    , getFilters: function()
    {
        return this.filters;
    }

    , getContent: function(cb)
    {
        // if we want to inject a stream, we could read the stream here.
        cb(null, this.content);
    }

    , setContent: function(content)
    {
        this.content = content;
        return this;
    }

    , getPayload: function(){
        return this.getContent();
    }

    , getOption: function(key, fallback)
    {
        var opts = this.getOptions();
        return (key in opts) ? opts[key] : fallback;
    }

    , getOptions: function()
    {
        return this.options;
    }

    , setOptions: function(options)
    {
        this.options = options;
        return this;
    }

    , getFields: function(){
        return this.fields;
    }

    , setFields: function(fields){
        this.fields = fields;
        return this;
    }

    , getResource: function()
    {
        return this.resource;
    }

    , hasResource: function()
    {
        return this.resource !== null;
    }

    , setResource: function(resource)
    {
        this.resource = parseInt(resource);
        return this;
    }

    , acceptsFormat: function(format)
    {
        return this.getFormat().toLowerCase() === format.toLowerCase();
    }

    , getFormat: function()
    {
        return this.format;
    }

    , setFormat: function(format){
        this.format = format;
        return this;
    }

    , getCollection: function()
    {
        return this.collection;
    }

    , setCollection: function(collection)
    {
        this.collection = collection;
        return this;
    }

    , getMandatoryArgs: function()
    {
        return this.mandatoryArgs;
    }

    , validate: function()
    {
        var mandatory   = this.getMandatoryArgs(),
            len         = mandatory.length;

        for(var i = 0; i<len; i++)
        {
            var property = mandatory[i],
                value = this[property];

            if(!value){
                throw new Error('Malformed request, field '+property+' is mandatory');
            }
        }
    }
};

module.exports = new Class(Request);