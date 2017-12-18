var myShows = [{
    name: "caleb",
    season: 1,
    episode: 21,
    description: "descript",
    favorite: false,
    watch_status: false,
    type: "normal",
    recomended: false
}]
var myUsername = "Harshdog"
//Example
// ========================================================================================================================
//creating group of buttons 

// Creating Group Button Divs
function createGroupBtn(dataType) {
    var minusBtn = createPlusMinus("minus");
    var plusBtn = createPlusMinus("plus")
    return $("<div>")
        .addClass("btn-group rounded border")
        .addClass("watch-info")
        .attr("value", dataType)
        .append(minusBtn)
        .append(plusBtn)

}

//creating plus and minus buttons
function createPlusMinus(symbol) {
    var typeOfBtn;
    var icon = $("<i>").addClass("fa")
    if (symbol === "minus") {
        typeOfBtn = "btn-danger"
        icon.addClass(`fa-${symbol}`)
    } else {
        typeOfBtn = "btn-success"
        icon.addClass(`fa-${symbol}`)
    }
    return $("<button>")
        .addClass(`btn ${typeOfBtn} py-0`)
        .attr("id", symbol)
        .append(icon)
        .attr("symbol", symbol)
}

// creating group of buttons
// ======================================================================================================================
//Creating Spans Divs for Season and Episodes

function createDivSpan(showData, typeData, movEpiSea) {
    var grpBtn = createGroupBtn(typeData);
    var spanDiv = createSpan(showData, typeData)
    if (movEpiSea != "movie") {
        return $("<div>")
            .text(typeData + ": ")
            .append(spanDiv)
            .append(grpBtn);
    } else {
        return $("<div>")
            .text("Movie")
    }
}

function createSpan(dataData, type) {
    type = type.toLowerCase();
    return $("<span>")
        .attr("id", type)
        .text(dataData + " ");
}
//Creating Span Divs for Seasons and Episodes
//====================================================================================================================================
//creating col elements with special classes

function createSpecialColum(specialArr) {
    var colum = $("<div>").addClass("col-12")
    specialArr.forEach(element => {
        colum.addClass(element)
    })
    return colum
}

//creating col element with special classes
//==============================================================================================================================
//creating favorite and remove buttons, show completion button, and description button

function createStarX(fav) {
    var starx = $("<div>")
    var star = $("<i>")
        .addClass("fa fa-2x mt-2 ml-2 float-left fav")
    if (fav) {
        star.addClass("fa-star")
    } else {
        star.addClass("fa-star-o")
    }
    var x = $("<button>")
        .addClass("close d-flex justify-content-end mr-2 remove")
        .html("&times")
    starx.append(star)
        .append(x)
    return starx
}

//status button creation
function statusBtn(status) {
    if (status) {
        var text = "Watched"
    } else {
        var text = "Still Watching"
    }
    return $("<button>")
        .attr("id", "status")
        .addClass("btn btn-dark my-1")
        .text(text)
}

//recomdation
function divRecDesc(descpt) {
    var descript = showDescription(descpt)
    return $("<div>").addClass("showmore pb-2 px-4")
        .append(descript)
        .append("<a class='mb-2' id='recomend'>Recommend</a>")
        .hide()
}

//show description
function showDescription(descp) {
    return $("<div>")
        .addClass("descript-card px-2")
        .html(descp)
        .attr("id", "description")
}

//description hide button
function showButton() {
    return $("<button>")
        .attr("id", "more")
        .addClass("btn")
        .text("Show More")
}

//creatting favorite and remove buttons
//===========================================================================================================================================
//create new show card 

//new show 
function newShow(showObj) {
    //card layout
    var cardTitleRow = $("<div>").addClass("row")
    var cardSeEpRow = $("<div>").addClass("row")
    var cardDescRow = $("<div>").addClass("row")
    //card Title 
    var cardTitle = createSpecialColum(["text-center"])
        .html(`<h2>${showObj.name}</h2>`)
        .appendTo(cardTitleRow)
    var cardDetails = createSpecialColum(["d-inline-flex", "justify-content-around",
        "flex-wrap-reverse", "align-items-center", "h5"])
    if (showObj.type === "normal") {
        cardDetails.append(createDivSpan(showObj.season, "Season", showObj.type))
            .append(createDivSpan(showObj.episode, "Episode", showObj.type))
    } else {
        cardDetails.append(createDivSpan(showObj.episode, "Episode", showObj.type))
    }
    cardDetails.append(statusBtn(showObj.watch_status))
        .appendTo(cardSeEpRow)
    var showDesc = createSpecialColum(["text-center", "text-dark"])
        .append(divRecDesc(showObj.description))
        .append(showButton())
        .appendTo(cardDescRow)
    var cardBody = $("<div>").addClass("card-body p-0 pb-3 text-white")
        .append(cardTitleRow)
        .append(cardSeEpRow)
        .append(cardDescRow)
    var card = $("<div>").addClass("card mb-3")
        .data('show-data', showObj)
        .append(createStarX(showObj.favorite))
        .append(cardBody)
    if (showObj.watch_status) {
        card.addClass("bg-success")
    } else {
        card.addClass("bg-secondary")
    }

    return card
}

//creating new show show
//===========================================================================================================================================
//Clicking card events

//remove button
$(".show-list").on("click", ".remove", function () {
    var showCard = $(this).closest(".card")
    var input = showCard.data("show-data")
    console.log(myShows.indexOf(input))
    myShows.splice(input, 1);
    console.log(myShows)
    displayShows()
});

//favorite button
$(".show-list").on("click", ".fav", function () {
    var showData = $(this).closest(".card").data("show-data")
    if (showData.favorite) {
        $(this).addClass("fa-star-o").removeClass("fa-star")
        showData.favorite = false
    } else {
        $(this).addClass("fa-star").removeClass("fa-star-o")
        showData.favorite = true
    }
    $(this).closest(".card").data("show-data", showData)
});

//plus and minus button
$(".show-list").on("click", ".watch-info > button", function () {
    var showData = $(this).closest(".card").data("show-data")
    var epiSea = $(this).parent().attr("value")
    var symbol = $(this).attr("symbol")
    if (epiSea === "Season") {
        showData.season = upAndDown(symbol, showData.season, this, epiSea.toLowerCase())
    } else {
        showData.episode = upAndDown(symbol, showData.episode, this, epiSea.toLowerCase())
    }
    $(this).closest(".card").data("show-data", showData)

});

//Watch Status
$(".show-list").on("click", "#status", function () {
    var cardSlot = $(this).closest(".card")
    var watch = cardSlot.data("show-data")

    if (watch.watch_status) {
        $(this).text("Still Watching")
        cardSlot.addClass("bg-secondary").removeClass("bg-success")

        watch.watch_status = false
    } else {
        $(this).text("Watched")
        cardSlot.addClass("bg-success").removeClass("bg-secondary")
        watch.watch_status = true
    }
    $(this).closest(".card").data("show-data", watch)

});

//show more button
$(".show-list").on("click", "#more", function () {
    var context = $(this);
    if (context.text() === "Show More") {
        context.siblings(".showmore").slideDown()
        context.text("Show Less")
    } else {
        context.siblings(".showmore").slideUp()
        context.text("Show More")
    }

});

//recomended button
$(".show-list").on("click", "#recomend", function () {
    var showData =  $(this).closest(".card").data("show-data")
    if(showData.recomended) {
        $(this).text("Recommended")
        showData.recomended = false
        //remove from recomended list
    } else {
        showData.recomended = true
        $(this).text("Unrecommended")
        //add to recommended list
        displayRecommended(showData, myUsername)
    }
    $(this).closest(".card").data("show-data", showData)
});

//Clicking card events
//==========================================================================================================================================
//Click functions 

function upAndDown(symbol, epiSea, context, where) {
    if (symbol === "minus" && epiSea > 0) {
        epiSea--
        $(context).parent().siblings(`#${where}`).text(epiSea + " ")
    } else if (symbol === "plus") {
        epiSea++
        $(context).parent().siblings(`#${where}`).text(epiSea + " ")
    }
    return epiSea
}

//Click functions
//==========================================================================================================================================
//Display shows 
function displayShows() {
    $(".show-list").empty()
    if (myShows.length != 0) {
        myShows.forEach(element => {
            $(".show-list").prepend(newShow(element))
            console.log(element)
        })
    } else {
        $(".show-list").append("<h2>You Have No Saved Shows</h2>")
    }

}

displayShows()

//Display shows
//=============================================================================================================================================
//retrieve Data

function getCardsData() {
    var myShows = []
    var data = $(".show-list").children()
    console.log($(".show-list").children().data("show-data"))
    for (var i = 0; i < data.length; i++) {
        myShows.push(data.eq(i).data("show-data"))
    }
    return myShows
}

//Retrieve Data
//=========================================================================================================================================================
//Add Custom Card

//add Custom Click
$("#customSubmit").on("click", function () {
    // event.preventDefault()
    var name = $("#title").val()
    var season = $("#seasonNum").val()
    var episode = $("#episodeNum").val()
    var descript = $("#descriptions").val()
    if (season === "" && episode != "") {
        var type = "episodes"
    } else if (episode === "" || season === "") {
        var type = "movie"
    } else {
        var type = "normal"
    }
    if (name != "") {
        var customShow = {
            name: name,
            season: season,
            episode: episode,
            description: descript,
            favorite: false,
            watch_status: false,
            type: type,
            recomended: false
        }

        $("#title").val("")
        $("#seasonNum").val("")
        $("#episodeNum").val("")
        $("#descriptions").val("")

        myShows.push(customShow)
        displayShows()
    } else {
        alert("Must provide a title")
    }

});

//Add a custom Card
//==================================================================================================================================================
//creating a recommended cards

//recommend Card
function newRecomendShow(showObj, username) {
    //card layout
    var cardTitleRow = $("<div>").addClass("row")
    var cardDescRow = $("<div>").addClass("row")
    var cardRecomend = $("<div>").addClass("row pl-4")
    //card Title 
    var cardTitle = createSpecialColum(["text-center"])
        .html(`<h2>${showObj.name}</h2>`)
        .appendTo(cardTitleRow)
    var showDesc = createSpecialColum(["text-center", "text-dark"])
        .append(showDescription(showObj.description))
        .appendTo(cardDescRow)
    var recomend = $("<span>").append("Recommended by ")
        .append(username)
        .attr("id", "username")
        .appendTo(cardRecomend)
    var cardBody = $("<div>").addClass("card-body p-0 pb-3 text-white")
        .append(cardTitleRow)
        .append(cardDescRow)
        .append(cardRecomend)
    var card = $("<div>").addClass("card mb-3 bg-secondary")
        .data('show-data', showObj)
        .append(addButtonAndType(showObj.type))
        .append(cardBody)

    return card
}

//creates type and add button
function addButtonAndType (type) {
    var typeDiv = $("<h4>").addClass("d-inline-flex m-0  mt-1 ml-3")
    if(type === "normal") {
        typeDiv.text("Season and Episodes")
    } else if (type === "episodes") {
        typeDiv.text("Episodes")
    } else {
        typeDiv.text("Movie")
    }

    var addBtn = $("<i>").addClass("fa fa-plus fa-2x mt-1 mr-3 float-right add")

    return $("<div>").addClass("text-white")
        .append(typeDiv)
        .append(addBtn)
}

//display the recomend list
function displayRecommended (showData, username) {
    $(".recomend-list").prepend(newRecomendShow(showData, username))
}

//Creating recommended Card
//=============================================================================================================================================
//recommend click events

//add to list
$(".recomend-list").on("click", ".add", function () {
    var showData = $(this).closest(".card").data("show-data")
    myShows.push(showData)
    displayShows()

});