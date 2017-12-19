
//Example Elements
//=============================================================================================================================================
//Putting TV Data into the Table

function puttingTVData (showDataArr) {
    $(".search-results").empty()
    showDataArr.forEach( (element, i) => {
        console.log(element, i)
        $(".search-results")
            .append(makeDataRow(element.show, i))
    });
    if(!showDataArr.length) {
        $("#searchShow").val("")
        alert("No Shows Matching that Title")
    }
}

function makeDataRow (showData, i) {
    var myShowData = {
        name: showData.name,
        description: showData.summary,
        season: 1,
        episode: 1,
        watch_status: false,
        type: "normal",
        favorite: false,
        username: myUsername
    }
    var input = $("<input>").attr("type", "radio")
        .attr("id", i)
        .attr("name", "result")
        .data("show-data", myShowData);
    var inputTD = $("<td>")
        .append(input)
    var title = $("<td>").text(showData.name)
    var descript = $("<td>").html(showData.summary)
    return $("<tr>")
        .append(inputTD)
        .append(title)
        .append(descript)
}

//Putting TV Data into the Table 
//=================================================================================================================================
//Getting Data from the table into List

$("#apiSubmit").on("click", function (event) {
    for(var i = 0; i < 20; i++){
        var input = $("#"+i).is(":checked")
        if(input) {
            var data = $("#"+i).data("show-data")
            myShows.push(data)
            displayShows(myShows)
            myShowsToDatabase()
            $(".search-results").empty()
            $("#searchShow").val("")
            return
        }
    }
})

//getting Data from the table into the List
//============================================================================================================================================
//putting Movie Data into the table 

function puttingMovieData (showDataMov) {
    $(".search-results").empty()
    
    $(".search-results").append(makeMovieDataRow(showDataMov))
}

function makeMovieDataRow (showData) {
    console.log(showData)
    var myShowData = {
        name: showData.Title,
        description: showData.Plot,
        season: 1,
        episode: 1,
        watch_status: false,
        type: "movie",
        favorite: false,
        username: myUsername
    }
    var input = $("<input>").attr("type", "radio")
        .attr("id", 0)
        .attr("name", "result")
        .data("show-data", myShowData);
    var inputTD = $("<td>")
        .append(input)
    var title = $("<td>").text(showData.Title)
    var descript = $("<td>").html(showData.Plot)
    return $("<tr>")
        .append(inputTD)
        .append(title)
        .append(descript)
}