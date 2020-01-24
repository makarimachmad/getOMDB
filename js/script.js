function pencarian(){
    $('#daftar-film').html('');

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey':'8ecea15d',
            's': $('#input-pencarian').val()
        },
        success: function(hasil){
            //console.log(hasil);

            if(hasil.Response == "True"){
                let film = hasil.Search;
                $.each(film, function(i, data){
                    $('#daftar-film').append(`
                        <div class="col-md-4">
                            <div class="card mb-5">
                                <img class="card-img-top" src="` + data.Poster + `" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">`+data.Title+`</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="card-link lihat-lebih" data-toggle="modal" data-target="#exampleModal" data-id="` + data.imdbID + `">Lihat Lebih</a>
                                </div>
                            </div>
                        </div>
                    `);
                });

                $('#input-pencarian').val('');

            }else{
                $('#daftar-film').html(`
                    <div class="col">
                        <h4 class="text-center">` + hasil.Error + `</h4>
                    </div>
                `)
            }
        }
    });
}

$('#tombol-cari').on('click',function(){
    pencarian();
    
});

$('#input-pencarian').on('keyup', function(e){
    if(e.which == 13){
        pencarian();
    }
});

$('#daftar-film').on('click','.lihat-lebih',function(){
    // console.log($(this).data('id'));

    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': 'dca61bcc',
            'i': $(this).data('id')
        },
        success: function(film){
            if(film.Response === "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ film.Poster +`" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item">
                                    <h3>
                                    `+film.Title+`
                                    </h3></li>

                                    <li class="list-group-item">
                                    
                                    `+film.Year+`
                                    </li>

                                    <li class="list-group-item">
                                   
                                    `+film.Released+`
                                    </li>

                                    <li class="list-group-item">
                                    
                                    `+film.Rated+`
                                    </li>

                                    <li class="list-group-item">
                                    
                                    `+film.Writer+`
                                    </li>

                                    <li class="list-group-item">
                                    
                                    `+film.Genre+`
                                    </li>

                                    <li class="list-group-item">
                                    
                                    `+film.Actors+`
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `)
            }
        }
    })
})