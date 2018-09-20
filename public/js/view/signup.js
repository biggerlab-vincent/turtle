$(document).ready(function(){
	var options = {
		url:        "/signup",
		type:       "post",
		dataType:    null,
		success:    function(data){
							console.log(data)
							if (data=="OK"){
								window.location.href="/home"
							}else{
								editorModalAlert("Faild! username used!")
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
