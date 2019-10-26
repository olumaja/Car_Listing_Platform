$(document).ready(function(){

    if(sessionStorage.getItem('person') === null){window.location.href = 'http://localhost:3000/logIn.html'}
    else{

        let userData = sessionStorage.getItem('person');
        let navPerson = JSON.parse(userData);
        $('#navPerson').text(navPerson.name);
        let userId = navPerson.id;

        $.ajax({
            url: 'http://localhost:3000/user',
            method: 'get',
        }).done((e)=>{
            for (let i = 0; i < e.length; i++){
                if(e[i].role != 'admin'){
                    $('#tbody').append(
                        `<tr id="tr-${e[i].id}">
                            <td>${i}
                            </td>
                            
                            <td>
                                ${e[i].name} 
                            </td>
                            <td>
                                ${e[i].email} 
                            </td>
                            <td>
                                <!--<a id='usercars' href="userCars.html">View User Cars</a>-->
                                <button id="view-${e[i].id}" class='btn btn-outline-info view-btn'>View User Cars</button>
                            </td>
                            
                                
                        </tr>`
        
                            )
                }

                        //The count variable ensure that the serial number (SN) in get is consistence in post
                        //count++;
    
                    }

                    //This is the view more button function
                    $('.view-btn').on('click', (e) =>{
                        let viewId = e.target.id.split('view-').join('');
                        
                        $.ajax({
                            url: `http://localhost:3000/car/${viewId}`,
                            method: 'get'
                        }).done((e) =>{
                            sessionStorage.setItem('personalcars', JSON.stringify(e));
                            window.location.href = 'http://localhost:3000/adminpersoncar.html'
                        })
                    })
        })
    }
})