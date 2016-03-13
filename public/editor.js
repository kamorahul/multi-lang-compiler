/**
 * Created by Rahul on 13/3/16.
 */


var editor = ace.edit("editor");
var terminalEditor = ace.edit("terminal");


//terminalEditor.setTheme("ace/theme/monokai");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");



function sendCode(){
    var data=   editor.getValue();
    $.ajax({
        //url: "http://139.162.50.21:3000/compile/node?data="+data
        url: "http://127.0.0.1:3000/compile/node?data="+data

    }).done(function(result) {
        console.log("Done"+result);
//             $("#output").append('<li><span class="tab">'+result+'</span></li>');
        $("#output").text(result)
    });
}



