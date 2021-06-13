define(function(require, module, exports){
    
    var fs = {};
    
    Object.defineProperty(fs, "location", {
        get: x=>window.location.pathname
    });
    
    fs.cwd = function(){
        var location = this.location;
        return location.substring(0, location.lastIndexOf("/"));
    };
    
    return fs;
});