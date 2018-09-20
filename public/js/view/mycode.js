$(document).ready(function(){
	loadCode();
	foldmenu();
})

function loadCode() {
	$.post('/mycode',function(data){
		if(data.length == 0){
			var inserthtml = '<h1 id="code-list-title">Please save your code!</h1>'
			$(".code-container").html(inserthtml)
		}else{
			for(i=1; i<data.length; i++){
				$('.code-demo').eq(0).clone().appendTo('.mycode');
			};
			for(i=0; i<data.length; i++){
				var id = data[i]._id;
				var title = data[i].title;
				var time = data[i].time;
				$('.code-demo').eq(i).attr('id', id  );
				$('.code-title').eq(i).html(title);
				$('.code-time').eq(i).html("Last edited " + time);
			}
		}
	},"json")
}

//edit my code
$(".mycode").on("click",".code-demo" , function(){  
	var id = $(this).attr("id");
	//console.log(id);
	var url = "/home?id=" + id;
	window.location.href = url;
}) 


//拖动删除
var mycode = document.getElementById('mycode');
var codeDemos = document.getElementsByClassName('code-demo');
var gb = document.getElementById('gb');
var selectID = '';
function drag(event){
	selectID = event.target.id;
}
//为目标对象添加事件监听 —— 删除拖动的源对象
gb.ondragover= function(e){
	//console.log(this)
	e.preventDefault();  //阻止默认行为
	this.setAttribute("src","/images/assets/rubbish-icon-05-01.png")
}
//为目标对象添加事件监听 —— 删除拖动的源对象
gb.ondragleave= function(e){
	//console.log(this)
	e.preventDefault();  //阻止默认行为
	this.setAttribute("src","/images/assets/rubbish-icon.png")
}
gb.ondrop= function(e){ //源对象松手释放在了目标对象中
	//删除被拖动的源对象
	this.setAttribute("src","/images/assets/rubbish-icon.png")
	var a = document.getElementById(selectID);
	//console.log(selectID);
	mycode.removeChild(a);  //从父元素中删除子节点
	$.post("/deleteCode",{"id": selectID},function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log("deleted succedd");
			loadCode();
		}
	})
	var codeDemoNumber = document.getElementsByClassName('code-demo');
	if(codeDemoNumber.length == 0){
		var inserthtml = '<h1 id="code-list-title">Please save your code!</h1>'
		$(".code-container").html(inserthtml)
	}

}

function foldmenu() {
	$(".side-info").mouseover(  function(){  
		$('.fold').attr({src:"/images/assets/unfold-icon-03@3x.png"})
		$(".side-info p").removeClass('hide');
		$(".wrapper").addClass('open')
	}) 
	$(".side-info").mouseout(function () { 
		$('.fold').attr({src:"/images/assets/shrink-icon-04@3x.png"})
		$(".side-info  p").addClass('hide');
		$(".wrapper").removeClass('open')
	});
}
















/*


var dsHandler = function(evt){
	// 将被拖动元素的innerHTML属性值设置成被拖动的数据
	evt.dataTransfer.setData("text/plain"
	, "<item>" + evt.target.innerHTML);
	selectID = evt.target.id;
	//$("[id=selectID]").hide();
}

gb.ondrop = function(evt){
	console.log('8')
	var text = evt.dataTransfer.getData("text/plain");
	// 如果该text以<item>开头
	if (text.indexOf("<item>") == 0)
	{
		// 创建一个新的div元素
		var newEle = document.createElement("div");
		// 以当前时间为该元素生成一个唯一的ID
		newEle.id = new Date().getUTCMilliseconds();
		// 该元素内容为“拖”过来的数据
		newEle.innerHTML = text.substring(6);
		// 设置该元素允许拖动
		newEle.draggable="true";
		// 为该元素的开始拖动事件指定监听器
		newEle.ondragstart = function(evt)
		{
			// 将被拖动元素的id属性值设置成被拖动的数据
			evt.dataTransfer.setData("text/plain"
				, "<remove>" + newEle.id);
		}
		dest.appendChild(newEle);
	}
}
//
document.getElementById("gb").ondragover = function(evt){
	$('#gb').attr("src","/images/open.png")
	var id = selectID;
	//console.log(id)
	//$("[id=id]").remove();
}
// 当把被拖动元素“放”到垃圾桶上时激发该方法。
document.getElementById("gb").ondrop = function(evt)
{
	console.log('9')
	var id = selectID;
	console.log(id);
	$("#id").hide();
	$.post("/deleteCode",{"id": id},function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log("deleted succedd");
			loadCode();
		}
	})

}
document.ondragover = function(evt)
{
	
	// 取消事件的默认行为
	return false;
}
document.ondragleave = function(evt){
//取消被拖动的元素离开本元素时触发该事件
	$('#gb').attr("src","/images/close.png")
	//return false;
	
}
document.ondrop = function(evt)
{
	// 取消事件的默认行为
	$('#gb').attr("src","/images/close.png")
	return false;
}
*/


