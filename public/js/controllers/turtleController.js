
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
   //var prog =prog + ""
   //prog.insert
   console.log(prog)
   var mypre = document.getElementById("output"); 
   mypre.innerHTML = ''; 
   Sk.pre = "output";
   Sk.configure({output:outf, read:builtinRead}); 
   (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
   var myPromise = Sk.misceval.asyncToPromise(function() {
       return Sk.importMainWithBody("<stdin>", false, prog, true);
   });
   Sk.TurtleGraphics.target.height = 1200;
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
    prog = 'import turtle\nturtle.clear()\n'
    prog =prog.toString();
    mypre.innerHTML = 'Stop'; 
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
         console.log(err);
    });
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
//editor.setSize('100%', '790px');
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
            console.log(data)
            if (data) {
                console.log("Saved");
                editorModalAlert("Successfully! Successfully saved! ")
                //alert('Congratulations!Successfully saved!')
            }else{
                editorModalAlert("Failded! Opps! There was a problem! ")
                //alert('Opps!There was a problem!')
            }
        
            //editorModalAlert("Successfully Saved.")
        })
    }else{
        editorModalAlert("Failded! Opps! Select your code please! ")
        //alert('Opps! Select your code please!')
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
            editorModalAlert("Successfully! Successful saved!")
            //alert('Congratulations!Successful saved!');
            //editorModalAlert("Successfully Saved.")
        });
    }else{
        editorModalAlert("Failed! Type your code title please!")
        //alert('Opps! Type your code title please!');
        //editorModalAlert("Filed Saved. Please type you project name.");
        return;
    }
}
function deleteCode(){
    $.post("deleteCode",data , function(data){
        console.log("deleted success");
    })
}


//Alert 
function editorModalAlert(msg) {
    var if_succeed = msg.indexOf("Successfully");
    $('.modal-alert').modal({ show: false, keyboard: false, backdrop: 'static' });
    if (if_succeed == -1) {
        $('.modal-alert .modal-header h4').text('Fail!');
    } else {
        $('.modal-alert .modal-header h4').text('Success!');
        //setTimeout(function () { window.location.reload(); }, 2000);
    }
    $('.modal-alert .modal-body p').html(msg);
    $('.modal-alert').modal('show');

}