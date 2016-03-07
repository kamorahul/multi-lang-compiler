/**
 * Created by Rahul on 11/2/16.
 */
var execute = require("child_process").spawn
var self = require("./Compile")
var q = require("q")
var fs = require("fs")
exports.compile = function(params){
    var P = q.defer()
    var result=""
       if(params.data) {
           if(params.type == "node")
          self.saveFile(params.data);
           //console.log("reacje=")
        result  =   self.executeNode(params.type, "sample.js")
           P.resolve(result);
       }
    else{
           P.resolve("no Data")
       }
    return P.promise;

}

exports.executeNode = function(program,content){
    var process = true
        var D = q.defer();
        var result = ""
        var execution  = execute(program,[content]);

        execution.stdout.on("data",function(data){
            //if(data = ">"){

            //}
            //console.log("stdout");
            result += data+'/n';
        })
        execution.stderr.on("data",function(data){
            result += "Err :"+data;
            //console.log("stderr");

        })
         execution.on("close",function(code){
            //result += "End :"+code;
             process = false
             //console.log("stdclose");

             D.resolve(result)

        })
             setTimeout(function(){
                if(process != false) {
                    execution.kill('SIGHUP')
                    process = true;
                    result += "/nProcess taking Too Long !!! "
                    D.resolve(result)
                }

             },6000)



    return D.promise;
}
exports.executeTerminal = function(program,content){
    var process = true
    var D = q.defer();
    var result = ""
    var execution  = execute("bash",['&']);

    execution.stdout.on("data",function(data){
        //if(data = ">"){

        //}
        //console.log("stdout");
        result += data+'/n';
    })
    execution.stderr.on("data",function(data){
        result += "Err :"+data;
        //console.log("stderr");

    })
    execution.on("close",function(code){
        //result += "End :"+code;
        process = false
        //console.log("stdclose");

        D.resolve(result)

    })
    setTimeout(function(){
        if(process != false) {
            execution.kill('SIGHUP')
            process = true;
            result += "/nProcess taking Too Long !!! "
            D.resolve(result)
        }

    },6000)



    return D.promise;
}

exports.saveFile = function(content){
    var R = q.defer();
    var fd =  fs.openSync("sample.js","w")
    fs.writeSync(fd, content);
    fs.closeSync(fd);
    //console.log("reached");
    R.resolve("sample.js")
    return R.promise;
    }