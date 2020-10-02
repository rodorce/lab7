$(document).ready(function() {

// Start your code from here
    var temas = ['Star Wars', 'Gaming', 'Cyberpunk 2077', 'Nintendo', 'SEGA', 'Playstation', 'Games', 'Apex Legends', 'Mario']

    for(let i = 0; i < temas.length; i++){
        function createRefreshButton(i) {
            return $('<button/>', {
                text: temas[i],
                class: 'btn_refresh',
                click: clickBtn
            });
        }

        $("#animal-buttons").append(createRefreshButton(i));

    }

    $("#add-animal").on('click', (event) => {
        event.preventDefault()
        var textoTema = $("#animal-input").val()
        console.log(textoTema)
        temas.push(textoTema)
        function refreshButton(){
            return $('<button/>', {
                text: textoTema,
                class: 'btn_refresh',
                click: clickBtn
            });
        }

        $("#animal-buttons").append(refreshButton)
    })


function clickBtn(i) {
    $("#animals").html("")
    console.log($(this))
    var button = $(this).text()
    console.log(button)
    $.ajax({
        url: `https://api.giphy.com/v1/gifs/search?q=${button}2&api_key=RI8iDsE0hBrZpp8OpxvWRNQsQC9h0jrN&limit=10`,
        method: "GET",
        success: function(respuesta){

            
            console.log(respuesta)
            for(let i = 0; i < 10; i++){
                var giphyData = respuesta.data[i]
                var giphyImg = respuesta.data[i].images;
                var imgDiv = $("<div>")
                var rating = $("<span>")
                rating.text(`Rating: ${giphyData.rating}`)
                $(imgDiv).css('display', 'inline-block')
                $(imgDiv).css('padding', '10px')
                $(rating).css('display', 'block')
                var img = $("<img>")
                img.attr({
                    src: giphyImg.fixed_height_still.url,
                    "data-animate": giphyImg.fixed_height.url,
                    "data-still":giphyImg.fixed_height_still.url,
                    "data-state": "still",
                    class: "gif"
                })
                $("#animals").append(imgDiv)
                $(imgDiv).append(rating)
                $(imgDiv).append(img)
            }
        
            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });
        },
        error: function () {
        console.log("No se pudo obtener los datos")
    }

    
    })

    
}


});
