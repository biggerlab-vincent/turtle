$(document).ready(function(){
	$.post('/account',function(data){
		console.log(data)
		$('#username').val(data.username);
		$('#phone').val(data.phone);
		$('#email').val(data.email);
		$('#age').val(data.age);
		$('#bio').val(data.bio);
	},"json")
	
})


//edit my code 
$('.code-demo').on('click', function () {
	var id=$(".code-demo").attr('class');
	console.log(id);
	//var lessonID = $('.codeId').eq(index).val();
	//var id = $('.id').eq(index).val();
	var url = "/home?id=" + id;
	window.location.href = url;
	//console.log(index,lessonID,id);
	/*
	$.ajax({
		type: "POST",
		url: "edit_code",
		data: {"id":id },
		success: function(data){
			console.log(data);
			id_edit = data._id;
			code_edit = data.code;
			console.log(id_edit,code_edit);
			var url = "/home?code_edit=" + code_edit+ "&id_edit=" + id_edit;
			window.location.href = url;
		}
	  })
	  */
  })
  
  