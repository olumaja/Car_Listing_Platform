$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    

    if(sessionStorage.getItem('person') === null){window.location.href = 'http://localhost:3000/logIn.html'}
    else{

        const userData = sessionStorage.getItem('person');
        const navPerson = JSON.parse(userData);
        $('#navPerson').text(navPerson.name);
        const userId = navPerson.id;
        let noCar = true;
        let carCount = 0;

        //The Get command start from here        
        $.ajax({
            url: 'http://localhost:3000/car',
            method: 'get',
        }).done((e)=>{
            for(let i = 0; i < e.length; i++){
                if(userId == Number(e[i].author_id)){
                    $('#tbody').append(
                        `<tr id="tr-${e[i].id}" class='carlist'>
                            <td class='clearfix'>
                                <div class='carbox'><img src='image/cars/${e[i].image}.jpg' class="img-fluid" alt='${e[i].name} ${e[i].model} ${e[i].year} model'></div>
                                <div>
                                    <div><strong>Brand: </strong><span id='brands-${e[i].id}'>${e[i].name}</span></div>
                                    <div><strong>Model: </strong><span id='model-${e[i].id}'>${e[i].model}</span></div>
                                    <div><strong>Year: </strong><span id='years-${e[i].id}'>${e[i].year}</span></div>
                                    <div><strong>Condition: </strong><span id='condition-${e[i].id}'>${e[i].condition}</span></div>
                                    <div><strong>Price: </strong><span id='money-${e[i].id}'>${Number(e[i].price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span></div>
                                    <div><p><strong>Description: </strong><br><span id='describe-${e[i].id}'>${e[i].description}</span></p>
                                    <button id="view-${e[i].id}" class='btn btn-outline-info btn-sm view-btn'>View Gallery</button>
                                    <button id="edit-${e[i].id}" class='btn btn-primary btn-sm edit-btn'><i class="far fa-edit"></i> Edit Car</button>
                                    <button id="del-${e[i].id}" class='btn btn-danger btn-sm del-btn'><i class="far fa-trash-alt"></i> Delete Car</button>
                                    </div>
                                </div>
                            </td>
                        </tr>`
                    )

                    noCar = false;
                    carCount++; //Counting the number of cars a user has
                }
            }

            if(noCar){
                emptyCar();
            }

            //Delete function for Get
            $('.del-btn').on('click', (e) =>{
                let delId = e.target.id.split('del-').join('');
                deleteCars(delId);
            })

            

            //This is the view more button function
            $('.view-btn').on('click', (e) =>{
                const viewId = e.target.id.split('view-').join('');
                gallery(viewId);

            })

            //This is the edit button function for Get
            $('.edit-btn').on('click', (e) =>{

                const editId = e.target.id.split('edit-').join('');
                editCars(editId);
            })

        }) //The Get command end here
        
        //Post command start from here
        $('#createbtn').click((e)=>{
            

            const name = $('#carBrand').val();
            const model = $('#carModel').val();
            const year = $('#carYear').val();
            const condition = $('#carCondition').val();
            const price = $('#carPrice').val();
            const description = $('#description').val();
            const author_id = userId;
            const arrPix = ['nissan-vmotion-2019', 'mercedes benz-e300 rwd sedan-2019', 'mercedes benz-g63 amg-2016', 'toyota-corolla le-2005', 'nissan-atimal-2010', 'honda-accord-2008', 'bmw-b7-2014', 'lexus-ls 460-2012', 'hyundai-sonata-2010', 'audi-A4-2010'];
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

                if(noCar){  //This line of code remove no car default image before create car
                    $('#nocars').hide();
                    noCar = false;
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
                            <td class='clearfix'>
                                <div class='carbox'><img src='image/cars/${e.image}.jpg' class="img-fluid" alt='${e.name} ${e.model} ${e.year} model'></div>
                                <div>
                                    <div><strong>Brand: </strong><span id='brands-${e.id}'>${e.name}</span></div>
                                    <div><strong>Model: </strong><span id='model-${e.id}'>${e.model}</span></div>
                                    <div><strong>Year: </strong><span id='years-${e.id}'>${e.year}</span></div>
                                    <div><strong>Condition: </strong><span id='condition-${e.id}'>${e.condition}</span></div>
                                    <div><strong>Price: </strong><span id='money-${e.id}'>${Number(e.price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span></div>
                                    <div><p><strong>Description: </strong><br><span id='describe-${e.id}'>${e.description}</span></p>
                                    <button id="view-${e.id}" class='btn btn-outline-info btn-sm view-btn'>View Gallery</button>
                                    <button id="edit-${e.id}" class='btn btn-primary btn-sm edit-btn'><i class="far fa-edit"></i> Edit Car</button>
                                    <button id="del-${e.id}" class='btn btn-danger btn-sm del-btn'><i class="far fa-trash-alt"></i> Delete Car</button>
                                    </div>
                                </div>
                            </td>
                        </tr>`
                    )

                    carCount++; //Counting the number of cars a user has

                    $('#carBrand').val('');
                    $('#carModel').val('');
                    $('#carYear').val('');
                    $('#carCondition').val('');
                    $('#carPrice').val('');
                    $('#description').val('');

                    $('#carModal').modal('hide');

                    //Delete function for Post
                    $('.del-btn').on('click', (e) =>{
                        const delId = e.target.id.split('del-').join('');
                        deleteCars(delId);
                        
                    })


                    //This is the view more button function for Post
                    $('.view-btn').on('click', (e) =>{
                        const viewId = e.target.id.split('view-').join('');
                        gallery(viewId);
                        
                    })

                    //This is the edit button function for Post
                    $('.edit-btn').on('click', (e) =>{

                        const editId = e.target.id.split('edit-').join('');

                        editCars(editId);

                    })

                })

            }else{
                $('#wrong').show();
            }
            
        })

            function gallery(viewId){
                    
                $.ajax({
                    url: `http://localhost:3000/car/${viewId}`,
                    method: 'get'
                }).done((e) =>{
                    sessionStorage.setItem('myCar', JSON.stringify(e));
                    window.location.href = 'http://localhost:3000/cargallery.html'
                })
            }

            function editCars(editId){

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
                    
                    const imgPath = e.image;
                    $('#updateModal').modal('show');

                    $('#updatebtn').on('click', ()=>{

                                const name = $('#updateBrand').val();
                                const model = $('#updateModel').val();
                                const year = $('#updateYear').val();
                                const condition = $('#updateCondition').val();
                                const price = $('#updatePrice').val();
                                const description = $('#updatedescription').val();
                                const author_id = userId;
                                const image = imgPath;
                                const id = editId;
                                
        
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

                                $(`#brands-${e.id}`).text(name);
                                $(`#model-${e.id}`).text(model);
                                $(`#years-${e.id}`).text(year);
                                $(`#condition-${e.id}`).text(condition);
                                $(`#money-${e.id}`).text(Number(price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }));
                                $(`#describe-${e.id}`).text(description);
        
                            })
                    })

                })

            }

            function deleteCars(delId){

                $.ajax({
                    url:`http://localhost:3000/car/${delId}`,
                     method: 'get'
                 }).done((e) =>{
                    
                     $('#deletePix').prop("src", `image/cars/${e.image}.jpg`);
                    
                     $('#deleteMsg').text(`Do you want to delete ${e.name} ${e.model} ${e.year}?`);
 
                     $('#deleteModal').modal('show');
 
                     $('#deleted-btn').on('click', () =>{
                         
                         $.ajax({
                            url:`http://localhost:3000/car/${delId}`,
                             method: 'delete'
                         }).done((e) =>{
                             $('#deleteModal').modal('hide');
                             $(`#tr-${delId}`).fadeOut(200);
                             carCount--;  //This code decrease number of cars after each delete.
                             
                             if(carCount == 0){   //The codes determine if user no longer has a car.
                                
                                noCar = true;
                                emptyCar();
                             }
                             
                         })
                         
                         
                     })
 
                 })

            }

            function emptyCar(){

                $('#tbody').append(
                    `<tr id='nocars' class='carlist'>
                        <td><img src='image/cars/noCar.jpg' class='img-fluid' alt='default car'></td>
                        <td>
                            <div id='divnocar'><strong>No car yet! </strong>Please create a car</div>
                        </td>
                    </tr>`
                )
            }

            

    }
})