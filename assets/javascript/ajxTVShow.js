//TV Show AJAX
function getTVShowAJAXData(search) {

    var queryAPI = "https://api.tvmaze.com/search/shows?q=" + search

    $.ajax({
        url: queryAPI,
        method: "GET"
    }).then(function (response) {
        puttingTVData(response)
        console.log(response)
    })

}
//Movie AJAX
function getMovieAJAXData(search) {
    var queryAPI = "https://www.omdbapi.com/?apikey=trilogy&t=" + search

    $.ajax({
        url: queryAPI,
        method: "GET"
    }).then(function (response) {
        console.log(response.Response)
        if (response.Response === "True") {
            puttingMovieData(response)
            
        } else {
            alert("Movie Not found")
            $("#searchShow").val("")
            $(".search-results").empty()
        }

    })

}
//gettting results from search 
$("#goSearch").on("click", function (event) {
    event.preventDefault()
    var searchItem = $("#searchShow").val()

    for (var i = 0; i < 2; i++) {
        var input = $("#s" + i).is(":checked")
        if (input) {

            var data = $("#s" + i).attr("value")

        }
    }
    console.log(data)
    if (searchItem != "") {
        if (data === "TVShow") {
            getTVShowAJAXData(searchItem)

        } else {
            getMovieAJAXData(searchItem)
        }

    } else {
        alert("Have to Enter a Search Item")
    }
});
$("#searchShow").on("keypress", function(key){
    if(key.keyCode === 13){
         event.preventDefault()
    }
})
