$(document).ready(function(){

    $('#userForm').submit((e)=>{

        e.preventDefault();
        
        let password = $('#inputPassword').val();
        let email = $('#inputEmail').val().toLowerCase();
        let validity = false;
        let messages = ""

        if(!email || !password){
            messages = "Please enter a valid email address and password";
            $('#wrong').html(messages);
            $('#wrong').show();
        }
        else if(email && password){
                $.ajax({
                    url: 'http://localhost:3000/user',
                    method: 'get',
                }).done((e)=>{

                    for(let i = 0; i < e.length; i++){
                        if(e[i].email.includes(email) && e[i].password.includes(password)){
                            validity = true; 
                            sessionStorage.setItem("person",JSON.stringify(e[i]));
                            break;
                        }
                        
                    }

                if(validity){
                    
                            window.location.href = "http://localhost:3000/carList.html"

                    }

                    if(!validity){
                        messages = 'Username or password is not correct!'
                        $('#wrong').html(messages);
                        $('#wrong').show();
                    }

                })
        }
            
    })

})