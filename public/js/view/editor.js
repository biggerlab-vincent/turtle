$(document).ready(function(){
	
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
	//console.log(id);
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
	var fold = document.getElementById('fold');
	var status = "close";
	//edit my code
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
})