var Class = require('ee-class');

var Filter = {

    andFilters: []
    , relations: []
    , operator: null
    , property: {
        name: null
        , value: null
    }

    , init: function initialize(name, operator, value, relations){
        this.setRelations(relations || [])
            .setOperator(operator)
            .setPropertyValue(value)
            .setPropertyName(name);
    }

    , getPropertyValue: function(){
        return this.property.value;
    }

    , setPropertyValue: function(value){
        this.property.value = value;
        return this;
    }

    , getPropertyName: function(){
        return this.property.name;
    }

    , setPropertyName: function(name){
        this.property.name = name;
        return this;
    }

    , getProperty: function(){
        return this.property;
    }

    , setProperty: function(property){
        this.property = property;
        return this;
    }

    , getRelations: function(){
        return this.relations;
    }

    , hasRelations: function(){
        return this.relations.length > 0;
    }

    , setRelations: function(relations){
        this.relations = relations;
        return this;
    }

    , getOperator: function(){
        return this.operator;
    }

    , setOperator: function(operator){
        this.operator = operator;
        return this;
    }

    , getValue: function(){
        return this.value;
    }

    , setValue: function(value){
        this.value = value;
        return this;
    }

    , getAnd: function(){
        return this.andFilters;
    }

    , hasAnd: function(){
        return this.andFilters.length > 0;
    }

    , and: function(filter){
        this.andFilters.push(filter);
        return this;
    }

    , or: function(filter){
        return this.addChoice(filter);
    }

    , addChoice: function(filter){
        return new FilterCollection().pushAll([this, filter]);
    }

    , toString: function(){
        var buffer = '';
        if(this.hasRelations()){
            buffer += buffer + this.getRelations().join('.');
            buffer += '.'
        }

        buffer += this.getPropertyName();
        buffer += this.getOperator();
        buffer += this.getPropertyValue();

        var ands = this.getAnd();

        for(var i = 0; i < ands.length; i++){
            buffer += ' && '+ands.toString();
        }
        return buffer;
    }

    , isCollection: function(){
        return false;
    }
};

module.exports = new Class(Filter);