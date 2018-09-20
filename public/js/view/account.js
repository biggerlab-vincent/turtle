$(document).ready(function(){
	$.post('/account',function(data){
		console.log(data)
		$('#username').val(data.username);
		$('#phone').val(data.phone);
		$('#email').val(data.email);
		$('#age').val(data.age);
		$('#bio').val(data.bio);
	},"json")
	//update 
	var options = {
		url:        "/update",
		type:       "post",
		dataType:    null,
		success:    function(data){
							console.log(data)
							if (data=="ok"){
								editorModalAlert("Successfully update!")
							}
					}
	}
	$('.signup').ajaxForm(options); 

})

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