// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) { 
    var mypre = document.getElementById("output"); 
    mypre.innerHTML = mypre.innerHTML + text; 
} 
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
function runit() { 
    $(".glyphicon-remove-sign").addClass("hide"); 
   var prog = editor.getValue(); 
   console.log(editor.getValue())
   var mypre = document.getElementById("output"); 
   mypre.innerHTML = ''; 
   Sk.pre = "output";
   Sk.configure({output:outf, read:builtinRead}); 
   (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
   var myPromise = Sk.misceval.asyncToPromise(function() {
       return Sk.importMainWithBody("<stdin>", false, prog, true);
   });
   myPromise.then(function(mod) {
        $(".glyphicon-remove-sign").addClass("hide"); 
        console.log('success');
   },
       function(err) {
           $(".glyphicon-remove-sign").removeClass("hide");
        mypre.innerHTML = err.toString(); 
        console.log(err.toString());
   });
} 
function stopit() { 
    var mypre = document.getElementById("output"); 
    mypre.innerHTML = 'Stop'; 
   // $('#mycanvas').width = $('#mycanvas').width

 } 


var myTextarea = document.getElementById('yourcode')
var editor = CodeMirror.fromTextArea(myTextarea, {
    mode: {name: "python",
               version: 3,
               singleLineStringErrors: false},
    lineNumbers: true,  //显示行号
    theme: "solarized", //设置主题
    lineWrapping: true, //代码折叠
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    matchBrackets: true,  //括号匹配
  });
//editor.setSize('600px', '754px');
$("#result-btn").click(function(){
    $("#mycanvas").removeClass("hide");
    $("#output").addClass("hide");
    $("#result-btn").addClass("active");
    $("#console-btn").removeClass("active");
  });
$("#console-btn").click(function(){
    $("#mycanvas").addClass("hide");
    $("#output").removeClass("hide");
    $("#result-btn").removeClass("active");
    $("#console-btn").addClass("active");
  });

  //save save-as
function save(){
    var id = $.getUrlParam('id');
    if(id){
        var code = editor.getValue();
        var date  = new Date();
        var time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
        var data = {
            id: id,
            title: name,
            time: time,
            code: code
        }
        $.post('save',data,function(data){
            if (data) {
                console.log("Saved");
                alert('Congratulations!Successfully saved!')
            }else{
                alert('Opps!There was a problem!')
            }
        
            //editorModalAlert("Successfully Saved.")
        })
    }else{
        alert('Opps! Select your code please!')
    }
    
}
function saveas(){
    var name = prompt("Please type you project name.", "");
    if (name){
        var code = editor.getValue();
        console.log(code);
        var date  = new Date();
        var time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
        var data = {
            title: name,
            time: time,
            code: code
        }
        $.post("saveas", data, function (data) {
            console.log("Saved");
            alert('Congratulations!Successful saved!');
            //editorModalAlert("Successfully Saved.")
        });
    }else{
        alert('Opps! Type your code title please!');
        //editorModalAlert("Filed Saved. Please type you project name.");
        return;
    }
}
function deleteCode(){
    $.post("deleteCode",data , function(data){
        console.log("deleted success");
    })
}
function editorModalAlert(){

}
//接收edit-code参数
(function ($) {  
    //扩展方法获取url参数  
    $.getUrlParam = function (name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
        if (r != null) return unescape(r[2]); return null; //返回参数值  
}  
})(jQuery);  
var id = $.getUrlParam('id');
console.log(id);
if(id){
    $.ajax({
        type: "POST",
        url: "codeEdit",
        data: {"id": id },
        success: function(data){
            //var prog = editor.getValue(); 
            console.log(data.code);
            editor.setValue(data.code);
        },
        dataType: "json"
    })
} 