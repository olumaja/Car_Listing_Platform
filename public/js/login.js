$(document).ready(function(){

    $('#userForm').submit((e)=>{

        e.preventDefault();
        
        let password = $('#inputPassword').val();
        let email = $('#inputEmail').val().toLowerCase();
        let validity = false;
        let block = false;
        let messages = ""

        if(!email || !password){
            messages = "Please enter a valid email address and password";
            $('#wrong').html(messages); //Sets the content of selected elements (including HTML markup)
            $('#wrong').show();
        }
        else if(email && password){
                $.ajax({
                    url: 'http://localhost:3000/user',
                    method: 'get',
                }).done((e)=>{

                    for(let i = 0; i < e.length; i++){
                        if(e[i].email.includes(email) && e[i].password.includes(password)){
                            if(e[i].status !== "block"){
                                validity = true;
                                sessionStorage.setItem("person",JSON.stringify(e[i]));
                            }else{block = true;}
                            break;
                        }
                        
                    }

                if(validity){
                           let someone = sessionStorage.getItem('person')
                           let somedata = JSON.parse(someone);
                           if(somedata.role == 'user'){
                             window.location.href = "http://localhost:3000/carList.html"
                           }
                           else if(somedata.role == 'admin'){
                            window.location.href = "http://localhost:3000/adminusers.html"
                           }
                            

                    }

                    if(block)
                    {
                        messages = 'Your account has been suspended<br>please contact the admin'
                        $('#wrong').html(messages);
                        $('#wrong').show();
                    }
                    else if(!validity){
                        messages = 'Username or password is not correct!'
                        $('#wrong').html(messages);
                        $('#wrong').show();
                    }

                })
        }
            
    })

})