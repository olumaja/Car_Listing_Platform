$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    
    $('#signout').click(function(){
        sessionStorage.clear();
        window.location.href = 'http://localhost:3000';
    })

})