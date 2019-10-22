$(document).ready(function(){

    //The following codes handle users registration

    $('#userForm').submit((e) =>{
        e.preventDefault();
        
        let role = 'user';
        let name = $('#userName').val();
    
        let password = $('#inputPassword').val();
    
        let confirm = $('#confirm').val();

        let matchPwd = true;
    
        let email = $('#inputEmail').val().toLowerCase();
    
        let eValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        let emailStatues = eValidate.test(String(email));
    
        let uniqueUser = false;
        let messages = "";

        //let emailDB = [];
    
        if(!name || name.length <= 1){
            messages = "Please enter a valid name<br>";
            $('#wrong').html(messages);
            
        }
        if(!emailStatues){
            messages += "Please enter a valid email address<br>";
            $('#wrong').html(messages);
            
        }
        if(!password){
            messages += "Please enter a valid password<br>";
            $('#wrong').html(messages);
            
        }
        else if(password !== confirm){
            matchPwd = false;
            messages += "Password doesn't match<br>";
            $('#wrong').html(messages);
            
        }
    
        if(name && emailStatues && password && matchPwd){
    
            $.ajax({
                url: 'http://localhost:3000/user',
                method: 'get',
            }).done((e)=>{

                for(let i = 0; i < e.length; i++){
                     if(e[i].email.includes(email)){
                        messages = "User already exist";
                        $('#wrong').html(messages);
                        $('#wrong').show();
                        uniqueUser = false;
                        break;
                     }
                     else{
                         uniqueUser = true;
                     }
                }
                
                if(uniqueUser){
                    
                    $.ajax({
                        url: 'http://localhost:3000/user',
                        method: 'post',
                        data: {name, email, password, role}
        
                    }).done((e)=>{
        
                        $('#userName').val("");
                        $('#inputEmail').val("");
                        $('#inputPassword').val("");
                        $('#confirm').val("");
                        
                        $('#wrong').html("");
                        $('#wrong').hide();
                        $('#correct').html("Success! Please sign in");
                        $('#correct').show();
                        //$('#regModal').modal('hide');
                    })
        
        
               }

               

            })

        }else{
            $('#wrong').show();
        }
        
    })


    $('[data-toggle="tooltip"]').tooltip();

})