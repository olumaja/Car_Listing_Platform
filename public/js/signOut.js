$(document).ready(function(){

    $('#signout').click(function(){
        sessionStorage.clear();
        window.location.href = 'http://localhost:3000';
    })

})