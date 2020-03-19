$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    sessionStorage.clear();

        let page = 1;
        const carsdisplay = 4;
        let maxPage = 0;

        //This code get the total number of cars in the database
        $.ajax({
            url: 'http://localhost:3000/car',
            method: 'get',
        }).done((e)=>{
            //This code divide the total number in the database by number of items display per page
            maxPage = Math.ceil(e.length/carsdisplay);

            //This line of code called empty car when there is no car in the database
            if(maxPage == 0){
                $('#paging button:first-child').prop("disabled", true);
                $('#paging button:nth-child(2)').prop("disabled", true);
                emptyCar();
            }

            //This line of code activate the next button
            if(page < maxPage){
                $('#paging button:nth-child(2)').prop("disabled", false);
            }
        });
        
        $.ajax({
            url: `http://localhost:3000/car?_page=${page}&_limit=${carsdisplay}`,
            method: 'get',
        }).done((e)=>{
            for(let i = 0; i < e.length; i++){
                $('#tbody').append(
                    `<tr class='carlist'>
                        <td class="clearfix">
                        <div class="carbox"><img src='image/cars/${e[i].image}.jpg' class="img-fluid" alt='${e[i].name} ${e[i].model} ${e[i].year} model'></div>
                        <div>
                            <div><strong>Brand: </strong>${e[i].name}</div>
                            <div><strong>Model: </strong>${e[i].model}</div>
                            <div><strong>Year: </strong>${e[i].year}</div>
                            <div><strong>Condition: </strong>${e[i].condition}</div>
                            <div><strong>Price: </strong>${Number(e[i].price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div>
                            <div><strong>Description:</strong><br>${e[i].description}<br>
                            <button id="view-${e[i].id}" class='btn btn-outline-info view-btn'>View Gallery</button></div>
                        </div>
                        </td>
                    </tr>`
                )
            }
            
            //This is the view more button function
            $('.view-btn').on('click', (e) =>{
                const viewId = e.target.id.split('view-').join('');

                gallery(viewId);
                
            })
        })

        //This code control the previous button
        $('#paging button:first-child').on('click', function(e){
            
             page -= 1;

             //This line of code disable the previous button when page equal 1
            if(page == 1){
                $('#paging button:first-child').prop("disabled", true);
            }
            //enable the next button when page is less than maxpage
            if(page < maxPage){
                $('#paging button:nth-child(2)').prop("disabled", false);
            }
            
            $("#tbody tr").remove();

            $.ajax({
                url: `http://localhost:3000/car?_page=${page}&_limit=${carsdisplay}`,
                method: 'get',
            }).done((e)=>{
                for(let i = 0; i < e.length; i++){
                    $('#tbody').append(
                        `<tr class='carlist'>
                            <td class="clearfix">
                            <div class="carbox"><img src='image/cars/${e[i].image}.jpg' class="img-fluid" alt='${e[i].name} ${e[i].model} ${e[i].year} model'></div>
                            <div>
                                <div><strong>Brand: </strong>${e[i].name}</div>
                                <div><strong>Model: </strong>${e[i].model}</div>
                                <div><strong>Year: </strong>${e[i].year}</div>
                                <div><strong>Condition: </strong>${e[i].condition}</div>
                                <div><strong>Price: </strong>${Number(e[i].price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div>
                                <div><strong>Description:</strong><br>${e[i].description}<br>
                                <button id="view-${e[i].id}" class='btn btn-outline-info view-btn'>View Gallery</button></div>
                            </div>
                            </td>
                        </tr>`
                    )
                }
    
                
    
                //This is the view more button function
                $('.view-btn').on('click', (e) =>{
                    const viewId = e.target.id.split('view-').join('');
    
                    gallery(viewId);
                    
                })
            })

        })

        //This code control the next button
        $('#paging button:nth-child(2)').on('click', function(){
            page++;

            if(page > 1){
                $('#paging button:first-child').prop("disabled", false);
            }
            if(page == maxPage){
                $('#paging button:nth-child(2)').prop("disabled", true);
            }

            $("#tbody tr").remove();

            $.ajax({
                url: `http://localhost:3000/car?_page=${page}&_limit=${carsdisplay}`,
                method: 'get',
            }).done((e)=>{
                for(let i = 0; i < e.length; i++){
                    $('#tbody').append(
                        `<tr class='carlist'>
                            <td class="clearfix">
                            <div class="carbox"><img src='image/cars/${e[i].image}.jpg' class="img-fluid" alt='${e[i].name} ${e[i].model} ${e[i].year} model'></div>
                            <div>
                                <div><strong>Brand: </strong>${e[i].name}</div>
                                <div><strong>Model: </strong>${e[i].model}</div>
                                <div><strong>Year: </strong>${e[i].year}</div>
                                <div><strong>Condition: </strong>${e[i].condition}</div>
                                <div><strong>Price: </strong>${Number(e[i].price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div>
                                <div><strong>Description:</strong><br>${e[i].description}<br>
                                <button id="view-${e[i].id}" class='btn btn-outline-info view-btn'>View Gallery</button></div>
                            </div>
                            </td>
                        </tr>`
                    )
                }
    
                
    
                //This is the view more button function
                $('.view-btn').on('click', (e) =>{
                    const viewId = e.target.id.split('view-').join('');
    
                    gallery(viewId);
                    
                })
            })

        })

        function gallery(viewId){
                
                $.ajax({
                    url: `http://localhost:3000/car/${viewId}`,
                    method: 'get'
                }).done((e) =>{
                    sessionStorage.setItem('myCar', JSON.stringify(e));
                    window.location.href = 'http://localhost:3000/gallery.html'
                })
        }

        function emptyCar(){

            $('#tbody').append(
                `<tr id='nocars' class='carlist'>
                    <td><img src='image/cars/noCar.jpg' class="img-fluid" alt='default car'></td>
                    <td>
                        <div id='divnocar'><strong>No car yet! </strong>Please create a car</div>
                    </td>
                </tr>`
            )
        }

})