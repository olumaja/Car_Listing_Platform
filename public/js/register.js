$(document).ready(function(){

    //The following codes handle users registration

    $('#userForm').submit((e) =>{
        e.preventDefault();
        
        const role = 'user';
        const status = 'unblock';
        const name = $('#userName').val();
    
        const password = $('#inputPassword').val();
    
        const confirm = $('#confirm').val();

        let matchPwd = true;
    
        const email = $('#inputEmail').val().toLowerCase();
    
        const eValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        let emailStatues = eValidate.test(String(email));
    
        let uniqueUser = false;
        let messages = "";
    
        if(!name || name.length <= 1){
            messages = "Please enter a valid name<br>";
            $('#wrong').html(messages);
            
        }
        else if(!emailStatues){
            messages = "Please enter a valid email address<br>";
            $('#wrong').html(messages);
            
        }
        else if(!password){
            messages = "Please enter a valid password<br>";
            $('#wrong').html(messages);
            
        }
        else if(password !== confirm){
            matchPwd = false;
            messages = "Password doesn't match<br>";
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
                        data: {name, email, password, role, status}
        
                    }).done((e)=>{
        
                        $('#userName').val("");
                        $('#inputEmail').val("");
                        $('#inputPassword').val("");
                        $('#confirm').val("");
                        
                        $('#wrong').html("");
                        $('#wrong').hide();
                        $('#correct').html("Success! Please sign in");
                        $('#correct').show();
                       
                    })
        
        
               }

               

            })

        }else{
            $('#wrong').show();
        }
        
    })


    $('[data-toggle="tooltip"]').tooltip();

})