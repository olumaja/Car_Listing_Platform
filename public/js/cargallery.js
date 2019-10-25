$(document).ready(function(){

if(sessionStorage.getItem('myCar') == null){window.location.href = 'http://localhost:3000/userCars.html'}
else{

    let mydata = sessionStorage.getItem('myCar');
    let onecar = JSON.parse(mydata);

    // $.ajax({
    //     url: 'http://localhost:3000/car',
    //     method: 'get',
    // }).done((e)=>{
    //     for(let i = 0; i < e.length; i++){
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
//         }
     }

 })