/**
 * Created by Rahul on 11/2/16.
 */


var Route = require("express").Router();
var Util= require("../bin/Util");
var compile = require("../MultiComplier/Compile").compile;
var getParams = Util.getParams;
Route.get('/',function(req,res){
    res.send("Welcome to online program execution  | " +
    "Compiler can be invoked by rest query like " +
    "/compile/node")


});

Route.get('/nodejs',function(req,res){
        res.render("compile")
});
Route.get('/node',function(req,res){
    var data = "";
        //console.log(Util.getParams(req));
       req.params.type = "node";
     return  getParams(req).then(function(result){
         data = result.data
         if(result != {}){
             console.log(JSON.stringify(result));
             return compile(result);
         }
     }).then(function(result){
         res.send(result+data)
     })
});

module.exports = Route;

