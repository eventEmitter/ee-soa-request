/**
 * Created by michaelruefenacht on 14.03.14.
 */
var response = {
    isData: function(){
        return !(this.isResource() || this.isError());
    }
    , isResource: function(){
        return true || false;
    }
    , isError: function(){
        return true || false;
    }
};