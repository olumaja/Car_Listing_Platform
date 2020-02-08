$(document).ready(function(){

    if(sessionStorage.getItem('myCar') == null){window.location.href = 'http://localhost:3000/product.html'}
    else{
    
        const mydata = sessionStorage.getItem('myCar');
        const onecar = JSON.parse(mydata);
    
        //This code display the front view of the current car as default image in showroom
        $('#showroomDiv img').prop('src', `image/cars/gallery/${onecar.image}-front.jpg`);
    
        //The following codes creates thumbnail images
        $('#thumbPix').append(
            `<span><img src="image/cars/gallery/${onecar.image}-s-front.jpg" id="${onecar.image}-s-front.jpg" class="img-fluid gallery"></span>
             <span><img src="image/cars/gallery/${onecar.image}-s-back.jpg" id="${onecar.image}-s-back.jpg" class="img-fluid gallery"></span>
             <span><img src="image/cars/gallery/${onecar.image}-s-finterior.jpg" id="${onecar.image}-s-finterior.jpg" class="img-fluid gallery"></span>
             <span><img src="image/cars/gallery/${onecar.image}-s-binterior.jpg" id="${onecar.image}-s-binterior.jpg" class="img-fluid gallery"></span>`
        )
    
        //The codes below create table to display the current car and full details
                $('#tbody').append(
                    `<tr class='carlist'>
                        <td><img src='image/cars/${onecar.image}.jpg' alt=''></td>
                        <td>
                            <div><strong>Brand: </strong>${onecar.name}</div>
                            <div><strong>Model: </strong>${onecar.model}</div>
                            <div><strong>Year: </strong>${onecar.year}</div>
                            <div><strong>Condition: </strong>${onecar.condition}</div>
                            <div><strong>Price: </strong>${Number(onecar.price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div>
                            <div><strong>Description: </strong><br>${onecar.description}<br>
                            
                        </td>
                    </tr>`
                )
    
                //This codes generate the image to display in showroom when corresponding thumbnail image is click.
                $('.gallery').on('click', function(e){
                    let imgg = e.target.id.split('-s').join('');
                    $('#showroomDiv img').prop('src', `image/cars/gallery/${imgg}`);
                })
    
         }
    
     })