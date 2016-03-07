/**
 * Created by Rahul on 11/2/16.
 */

var q = require("q")
exports.getParams = function  (req){
var D= q.defer()
    var paramJson = {}
    var query = req.query;
    var body = req.body;
    var params = req.params;
    for(var key in params){
        paramJson[key] =  params[key]
    }
    for(var key in query){
        paramJson[key] =  query[key]
    }
    for(var key in body){
        paramJson[key] =  body[key]
    }
    D.resolve(paramJson);
return D.promise;
}