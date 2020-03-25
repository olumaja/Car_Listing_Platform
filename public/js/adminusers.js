$(document).ready(function(){

    if(sessionStorage.getItem('person') === null){window.location.href = 'http://localhost:3000/logIn.html'}
    else{

        const userData = sessionStorage.getItem('person');
        const navPerson = JSON.parse(userData);
        $('#navPerson').text(navPerson.name);

        $.ajax({
            url: 'http://localhost:3000/user',
            method: 'get',
        }).done((e)=>{
            let btnBlock = '';
            for (let i = 0; i < e.length; i++){
                
                if(e[i].role != 'admin'){
                    
                    if(e[i].status == 'unblock'){
                        
                        btnBlock = 'Block User';
                    }
                    else{
                        btnBlock = 'Unblock User'
                    }

                    $('#tbody').append(
                        `<tr id="tr-${e[i].id}">
                            <td>
                                <div class='userInfo'>
                                    <div>${i}</div>
                                    <div class='nameCol'>${e[i].name}</div>
                                    
                                    <div class='infoCol'>${e[i].email}</div>
                                        
                                    <div class='infoCol'>
                                        <button id="view-${e[i].id}" class="btn btn-outline-info btn-sm view-btn">View Cars</button>
                                        <button id="block-${e[i].id}" class="btn btn-primary btn-sm block-btn">${btnBlock}</button>
                                        <button id="del-${e[i].id}" class="btn btn-danger btn-sm del-btn">Delete User</button>
                                    </div>
                                </div>
                            </td>
                            
                                
                        </tr>`
        
                            )
                        }

                    }

                    //This is the view more button function
                    $('.view-btn').on('click', (e) =>{
                        const viewId = e.target.id.split('view-').join('');
                        
                        $.ajax({
                            url: `http://localhost:3000/user/${viewId}`,
                            method: 'get'
                        }).done((e) =>{
                            sessionStorage.setItem('personalcars', JSON.stringify(e));
                            window.location.href = 'http://localhost:3000/adminpersoncar.html'
                        })
                    })

                    //The following codes control the block button
                    $('.block-btn').on('click', (e) =>{
                        const blockId = e.target.id.split('block-').join('');

                        $.ajax({
                            url: `http://localhost:3000/user/${blockId}`,
                            method: 'get'
                        }).done((e)=>{
                            const name = e.name;
                            const email = e.email;
                            const password = e.password;
                            const role = e.role;
                            let status = e.status;
                            const id = blockId;

                        if(status == 'unblock'){

                            status = 'block';
                            $.ajax({
                                url: `http://localhost:3000/user/${id}`,
                                method: 'put',
                                contentType: "application/JSON",
                                data: JSON.stringify({name, email, password, role, status, id})
                            }).done(() =>{
                                $(`#block-${blockId}`).html('Unblock User');
                            })
                            
                        }
                        else if(status == 'block'){
                            
                            status = 'unblock';
                            $.ajax({
                                url: `http://localhost:3000/user/${id}`,
                                method: 'put',
                                contentType: "application/JSON",
                                data: JSON.stringify({name, email, password, role, status, id})
                            }).done(() =>{
                                $(`#block-${blockId}`).html('<i class="fas fa-ban"></i> Block User');
                            })
                        }
                            
                        })
                        

                    })

        })
    }
})