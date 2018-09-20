function UserController(){

    $('#logout').click(function(){
        $.post("/logout", function(data){
            if (data == "ok"){
                window.location.href="/login"
            }
        })
    });
   
    
    /*
    $('#account').click(function(){
        var username = $('.user-info').text();
        //console.log(username);
        var postData ={
            username : username
        }
        $.ajax({
            type: 'POST',
            url: "account",
            data: postData,
            success: function(data){
                console.log("test");
                console.log(data);
                $('#username').val(data.username);
                $('#phone').val(data.phone);
                $('#email').val(data.email);
                $('#age').val(data.age);
                $('#bio').val(data.bio);
            }
        });
    });
    */
    
}
UserController();
   



