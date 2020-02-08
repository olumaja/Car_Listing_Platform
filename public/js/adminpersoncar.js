$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    if(sessionStorage.getItem('person') === null){window.location.href = 'http://localhost:3000/logIn.html'}
    else{

        let userData = sessionStorage.getItem('person');
        let navPerson = JSON.parse(userData);
        $('#navPerson').text(navPerson.name);
        let noCar = true;

        let personalData = sessionStorage.getItem('personalcars');
        let mypersonal = JSON.parse(personalData);
        let personalId = mypersonal.id;
        let dealerName = mypersonal.name;
                
        $.ajax({
            url: 'http://localhost:3000/car',
            method: 'get',
        }).done((e)=>{
            for(let i = 0; i < e.length; i++){
                if(personalId == Number(e[i].author_id)){
                    $('#tbody').append(
                        `<tr id="tr-${e[i].id}" class='carlist'>
                            <td><img src='image/cars/${e[i].image}.jpg' alt=''></td>
                            <td>
                                <div><strong>Brand: </strong><span id='brands'>${e[i].name}</span></div>
                                <div><strong>Model: </strong><span id='model'>${e[i].model}</span></div>
                                <div><strong>Year: </strong><span id='years'>${e[i].year}</span></div>
                                <div><strong>Condition: </strong><span id='condition'>${e[i].condition}</span></div>
                                <div><strong>Price: </strong><span id='money'>${Number(e[i].price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span></div>
                                <div><p><strong>Description: </strong><br><span id='describe'>${e[i].description}</span></div>
                                <button id="view-${e[i].id}" class='btn btn-outline-info view-btn'>View Gallery</button>
                                <button id="edit-${e[i].id}" class='btn btn-primary edit-btn'><i class="far fa-edit"></i> Edit Car</button>
                                <button id="del-${e[i].id}" class='btn btn-danger del-btn' data-toggle="modal" data-target="#deleteModal"><i class="far fa-trash-alt"></i> Delete Car</button>
                                </p></div>
                                <div><strong>Dealer's Names:</strong> ${dealerName}</div>
                            </td>
                        </tr>`
                    )

                    noCar = false;
                }
            }

            if(noCar){
                $('#tbody').append(
                    `<tr class='carlist'>
                        <td><img src='image/cars/noCar.jpg' alt=''></td>
                        <td>
                            <div style='margin-top:150px; font-size: 30px'><strong>No car yet! </strong>Please create a car</div>
                        </td>
                    </tr>`
                )
            }

            //Delete function
            $('.del-btn').on('click', (e) =>{
                let delId = e.target.id.split('del-').join('');
                             
                $.ajax({
                   url:`http://localhost:3000/car/${delId}`,
                    method: 'delete'
                }).done((e) =>{
                    $(`#tr-${delId}`).fadeOut(500);
                })

                //  let delId = e.target.id.split('del-').join('');
                //  //alert(delId);
                //  $.ajax({
                //     url:`http://localhost:3000/car/${delId}`,
                //      method: 'get'
                //  }).done((e) =>{
                     
                //      $('#deletePix').append(
                //          `<img src='image/cars/${e.image}.jpg' >`
                //      )
                //      $('#deleteMsg').append(
                //          `<span>Do you want to delete ${e.name} ${e.model}</span>`
                //      )
                //      //$(`#tr-${delId}`).fadeOut(500);
                //      $('#deleted-btn').on('click', (e) =>{
                //         //let delId = e.target.id.split('del-').join('');
                //          alert(delId);
                //          $.ajax({
                //             url:`http://localhost:3000/car/${delId}`,
                //              method: 'delete'
                //          }).done((e) =>{
                //              $(`#tr-${delId}`).fadeOut(500);
                //          })
                //     })
                //  })
            })

            //This is the view more button function
            $('.view-btn').on('click', (e) =>{
                let viewId = e.target.id.split('view-').join('');
                
                $.ajax({
                    url: `http://localhost:3000/car/${viewId}`,
                    method: 'get'
                }).done((e) =>{
                    sessionStorage.setItem('myCar', JSON.stringify(e));
                    window.location.href = 'http://localhost:3000/admincargallery.html'
                })
            })


            //This is the edit button function
            $('.edit-btn').on('click', (e) =>{

                let editId = e.target.id.split('edit-').join('');

                $.ajax({
                    url: `http://localhost:3000/car/${editId}`,
                    method: 'get'
                }).done((e) =>{
                       $('#updateBrand').val(e.name);
                       $('#updateModel').val(e.model);
                       $('#updateYear').val(e.year);
                       $('#updateCondition').val(e.condition);
                       $('#updatePrice').val(e.price);
                       $('#updatedescription').val(e.description);
                       
                       imgPath = e.image;
                       $('#updateModal').modal('show');

                       $('#updatebtn').on('click', (e)=>{

                                let name = $('#updateBrand').val();
                                let model = $('#updateModel').val();
                                let year = $('#updateYear').val();
                                let condition = $('#updateCondition').val();
                                let price = $('#updatePrice').val();
                                let description = $('#updatedescription').val();
                                let author_id = userId;
                                let image = imgPath;
                                let id = editId;
                                
        
                                $.ajax({
                                url: `http://localhost:3000/car/${id}`,
                                method: 'put',
                                contentType: "application/JSON",
                                data:JSON.stringify({name, model, year, price, description, condition, author_id, image, id}) 
                            }).done((e) =>{
                                
                                $('#updateBrand').val('');
                                $('#updateModel').val('');
                                $('#updateYear').val('');
                                $('#updateCondition').val('');
                                $('#updatePrice').val('');
                                $('#updatedescription').val('');

                                $('#updateModal').modal('hide');

                                $('#brands').text(name);
                                $('#model').text(model);
                                $('#years').text(year);
                                $('#condition').text(condition);
                                $('#money').text(Number(price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }));
                                $('#describe').text(description);
        
                            })
                       })

               })

            })

        })
        
        //Post command start from here
        $('#createbtn').click((e)=>{
            //e.preventDefault()

            let name = $('#carBrand').val();
            let model = $('#carModel').val();
            let year = $('#carYear').val();
            let condition = $('#carCondition').val();
            let price = $('#carPrice').val();
            let description = $('#description').val();
            let author_id = userId;
            let arrPix = ['nissan vimotion-2019', 'mercedes benz-e300-rwd-sedan-2019', 'mercedes benz-g63-amg-2019', 'toyota corolla-le-2005', 'nissan-atimal-2010', 'honda-accord-2008', 'bmw-b7-2014', 'lexus-ls 460-2012'];
            let pix = name + '-' + model + '-' + year;
            pix = pix.toLocaleLowerCase();
            let image = '';

            if(name !== "" && model !== "" && year !== "" && condition !== "" && price !== "" && description !== ""){
                
                $('#wrong').hide();

                if(arrPix.includes(pix)){
                    image = pix;
                }else{
                    image = 'default';
                }

                $.ajax({
                    url: 'http://localhost:3000/car',
                    method: 'post',
                    data: {
                        name, model, year, price, description, condition, author_id, image
                    }
                }).done((e)=>{
                    $('#tbody').append(
                        `<tr id="tr-${e.id}" class='carlist'>
                            <td><img src='image/cars/${e.image}.jpg' alt=''></td>
                            <td>
                                <div><strong>Brand: </strong>${e.name}</div>
                                <div><strong>Model: </strong>${e.model}</div>
                                <div><strong>Year: </strong>${e.year}</div>
                                <div><strong>Condition: </strong>${e.condition}</div>
                                <div><strong>Price: </strong>${Number(e.price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div>
                                <div><strong>Description: </strong><br>${e.description}<br>
                                <button id="view-${e.id}" class='btn btn-outline-info view-btn'>View Gallery</button>
                                <button id="view-${e.id}" class='btn btn-primary edit-btn'><i class="far fa-edit"></i> Edit Car</button>
                                <button id="view-${e.id}" class='btn btn-danger del-btn'><i class="far fa-trash-alt"></i> Delete Car</button>
                                </div>
                            </td>
                        </tr>`
                    )

                    $('#carBrand').val('');
                    $('#carModel').val('');
                    $('#carYear').val('');
                    $('#carCondition').val('');
                    $('#carPrice').val('');
                    $('#description').val('');

                    $('#carModal').modal('hide');


                })

            }else{
                $('#wrong').show();
            }
            
        })

        //This is the command for the put using upadteModal
        $('#updateModal').on('click', (e)=>{
            let name = $('#updateBrand').val();
            let model = $('#updateModel').val();
            let year = $('#updateYear').val();
            let condition = $('#updateCondition').val();
            let price = $('#updatePrice').val();
            let description = $('#updatedescription').val();
            let author_id = userId;
            let id = idGlobal;
            let image = imgPath;

            $.ajax({
                url: 'http://localhost:3000/car/'+animal.id+'',
                method: 'put',
                contentType: "application/JSON",
                data:JSON.stringify({name, species, info, pix}) 
            }).done((e) =>{

            })

        })

    }
})