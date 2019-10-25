$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    if(sessionStorage.getItem('person') === null){window.location.href = 'http://localhost:3000/logIn.html'}
    else{

        let userData = sessionStorage.getItem('person');
        let navPerson = JSON.parse(userData);
        $('#navPerson').text(navPerson.name);
        let userId = navPerson.id;
        
        $.ajax({
            url: 'http://localhost:3000/car',
            method: 'get',
        }).done((e)=>{
            for(let i = 0; i < e.length; i++){
                $('#tbody').append(
                    `<tr class='carlist'>
                        <td><img src='image/cars/${e[i].image}.jpg' alt=''></td>
                        <td>
                            <div><strong>Brand: </strong>${e[i].name}</div>
                            <div><strong>Model: </strong>${e[i].model}</div>
                            <div><strong>Year: </strong>${e[i].year}</div>
                            <div><strong>Condition: </strong>${e[i].condition}</div>
                            <div><strong>Price: </strong>${Number(e[i].price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div>
                            <div><strong>Description: </strong><br>${e[i].description}<br>
                            <button id="view-${e[i].id}" class='btn btn-outline-info view-btn'>View Gallery</button></div>
                        </td>
                    </tr>`
                )
            }

            //This is the view more button function
            $('.view-btn').on('click', (e) =>{
                let viewId = e.target.id.split('view-').join('');
                
                $.ajax({
                    url: `http://localhost:3000/car/${viewId}`,
                    method: 'get'
                }).done((e) =>{
                    sessionStorage.setItem('myCar', JSON.stringify(e));
                    window.location.href = 'http://localhost:3000/cargallery.html'
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
                    image = 'default.jpg';
                }

                $.ajax({
                    url: 'http://localhost:3000/car',
                    method: 'post',
                    data: {
                        name, model, year, price, description, condition, author_id, image
                    }
                }).done((e)=>{
                    $('#tbody').append(
                        `<tr class='carlist'>
                            <td><img src='image/cars/${e.image}.jpg' alt=''></td>
                            <td>
                                <div><strong>Brand: </strong>${e.name}</div>
                                <div><strong>Model: </strong>${e.model}</div>
                                <div><strong>Year: </strong>${e.year}</div>
                                <div><strong>Condition: </strong>${e.condition}</div>
                                <div><strong>Price: </strong>${Number(e.price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div>
                                <div><strong>Description: </strong><br>${e.description}</div>
                                <button id="view-${e.id}" class='btn btn-outline-info view-btn'>View Gallery</button></div>
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

    }
})