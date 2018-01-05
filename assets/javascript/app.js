//firebase config

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBzi7e9jdH8OSKXYoUl0vFBg5yzlCphrFg",
    authDomain: "show-tracker-ffcfa.firebaseapp.com",
    databaseURL: "https://show-tracker-ffcfa.firebaseio.com",
    projectId: "show-tracker-ffcfa",
    storageBucket: "show-tracker-ffcfa.appspot.com",
    messagingSenderId: "642992898224"
};

firebase.initializeApp(config);

var database = firebase.database()
//============================================================================================================================
//global Varibales

var myShows = []
var myUsername = ""

//global Variables
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
            .append(grpBtn)
            .addClass("my-1")
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
function divRecDesc(descpt, recomend) {
    var descript = showDescription(descpt)
    if (recomend) {
        var rec = "<a href='#' class='mb-2' id='recomend'>Unrecommend</a>"
    } else {
        var rec = "<a  href='#' class='mb-2' id='recomend'>Recommend</a>"
    }
    return $("<div>").addClass("showmore pb-2 px-4")
        .append(descript)
        .append(rec)
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
        "flex-wrap-reverse", "align-items-center", "h5", "px-4"])
    if (showObj.type === "normal") {
        cardDetails.append(createDivSpan(showObj.episode, "Episode", showObj.type))
            .append(createDivSpan(showObj.season, "Season", showObj.type))
    } else {
        cardDetails.append(createDivSpan(showObj.episode, "Episode", showObj.type))
    }
    cardDetails.append(statusBtn(showObj.watch_status))
        .appendTo(cardSeEpRow)
    var showDesc = createSpecialColum(["text-center", "text-dark"])
        .append(divRecDesc(showObj.description, showObj.recomended))
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
    // console.log(myShows)
    var showCard = $(this).closest(".card")
    var value = showCard.data("show-data")
    console.log(myShows)
    var index = myShows.indexOf(value)
    console.log(index)
    myShows.splice(index, 1);
    console.log(myShows)
    displayShows(myShows)
    myShowsToDatabase()
    removeRecommeded(value)
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
    myShowsToDatabase()
    displayShows(myShows)
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
    myShowsToDatabase()
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
    myShowsToDatabase()
    displayShows(myShows)
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
    var showData = $(this).closest(".card").data("show-data")
    if (showData.recomended) {
        showData.recomended = false
        $(this).text("Recommended")
        //remove from recomended list
        removeRecommeded(showData)
    } else {
        showData.recomended = true
        $(this).text("Unrecommended")
        //add to recommended list
        addToRecommended(showData)
    }
    $(this).closest(".card").data("show-data", showData)
    myShowsToDatabase()
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
function displayShows (arr) {
    $(".show-list").empty()
    if($("#filter").text() === "Favorite") {
        displayShowsFav(arr)
    } else if ($("#filter").text() === "Watched") {
        displayShowsWatch(arr)
    } else {
        displayShowsNone(arr)
    }
}

function displayShowsNone(arr) {
    
    if (arr.length != 0) {
        arr.forEach(element => {
            $(".show-list").prepend(newShow(element))
            console.log(element)
        })
    } else {
        $(".show-list").append("<h2>You Have No Saved Shows</h2>")
    }
}


function displayShowsFav(arr) {
   
    var favShows = arr.filter(show => {
        return show.favorite
    })
    console.log(favShows)
    if (favShows.length != 0) {
        favShows.forEach(element => {
            $(".show-list").prepend(newShow(element))
            console.log(element)
        })
    } else {
        $(".show-list").append("<h2>You Have No Saved Favorite Shows</h2>")
    }
}

function displayShowsWatch(arr) {
   
    var watchShows = arr.filter(show => {
        return show.watch_status
    })
    console.log(watchShows)
    if (watchShows.length != 0) {
        watchShows.forEach(element => {
            $(".show-list").prepend(newShow(element))
            console.log(element)
        })
    } else {
        $(".show-list").append("<h2>You Have No Saved Watched Shows</h2>")
    }
}


//Display shows
//=============================================================================================================================================
//filter shows click 

$("#filter-list > button").on("click", function () {
    var filter = $(this).text()
    console.log(filter)
    $("#filter").text(filter)
    displayShows(myShows)
   
});


//filter shows click
//=================================================================================================================================================
//retrieve Data

function getCardsData() {
    var cardData = []
    var data = $(".show-list").children()
    console.log($(".show-list").children().data("show-data"))
    for (var i = 0; i < data.length; i++) {
        cardData.push(data.eq(i).data("show-data"))
    }
    return cardData
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
            recomended: false,
            username: myUsername
        }

        $("#title").val("")
        $("#seasonNum").val("")
        $("#episodeNum").val("")
        $("#descriptions").val("")
        $("#btn-cancel-show").trigger("click")
        myShows.push(customShow)
        displayShows(myShows)
        myShowsToDatabase()
    } else {
        alert("Must provide a title")
    }

});

//Add a custom Card
//==================================================================================================================================================
//creating a recommended cards

//recommend Card
function newRecomendShow(showObj) {
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
        .append(showObj.username)
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
function addButtonAndType(type) {
    var typeDiv = $("<h4>").addClass("d-inline-flex m-0  mt-1 ml-3")
    if (type === "normal") {
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
function displayRecommended(showArr) {
    console.log(showArr)
    if (showArr.length != 0) {
        $(".recomend-list").empty()
        showArr.forEach(element => {
            $(".recomend-list").prepend(newRecomendShow(element))
        })
    } else {
        $(".recomend-list").empty()
            .append("<h2 class='text-center'>No Recommended Shows</h2>")
    }

}

function displayRecommendShow(arr) {
    var filterShow = []
    var testArr =[]
    myShows.forEach(element => {
        testArr.push(element.name)
    })
    arr.forEach(element => {
        var test = testArr.indexOf(element.name)
        console.log(test)
        if(test === -1 ) {
            filterShow.push(element)
        }
    })

    displayRecommended(filterShow)
}



//Creating recommended Card
//=============================================================================================================================================
//recommend click events

//add to my list
$(".recomend-list").on("click", ".add", function () {
    var showData = $(this).closest(".card").data("show-data")
    showData.username = myUsername
    showData.recomended = false
    myShows.push(showData)
    displayShows(myShows)
    myShowsToDatabase()
    getRecommendDatabase()
});

//refresh recommended list 
$("#refresh").on("click", function () {
    getRecommendDatabase()
})

//recommend click events
//=================================================================================================================================================
//Sign-In Page 

$("#login").on("click", function (event) {
    event.preventDefault()
    var username = $("#username-signIn").val()
    var password = $("#password-signIn").val()
    console.log("Username " + username, "Password " + password)

    checkUsernameAndPassword(username, password, "log")

})

$("#register").on("click", function (event) {
    event.preventDefault()
    var username = $("#username-register").val()
    var password = $("#password-register").val()
    console.log("Username " + username, "Password " + password)

    checkUsernameAndPassword(username, password, "reg")

})

function checkUsernameAndPassword(testUsername, testPassword, place) {
    database.ref("/users").once("value").then(snap => {
        console.log(snap.val())
        var location = "#error-message-" + place
        if (place === "log") {
            console.log(place)
            if (!snap.child(testUsername).exists() || !snap.val()) {
                console.log("error username")

                $(location).empty()
                    .text("Username doesn't exists")
            } else {
                console.log(place)
                console.log(snap.child(testUsername))
                console.log(snap.child(testUsername).child("Password").val())
                if (snap.child(testUsername).child("Password").val() === testPassword) {
                    // login Function 
                    login(testUsername)
                } else {
                    $(location).empty()
                        .text("Password doesn't match")
                }
            }
        } else {
            console.log(place)
            console.log(snap.child(testUsername).exists())
            if (snap.child(testUsername).exists()) {
                $(location).empty()
                    .text("Username already exists")
            } else {
                if (testPassword.length < 6) {
                    $(location).empty()
                        .text("Password must be at least 6 characters long")
                } else {
                    database.ref("/users/" + testUsername).set({
                        "Password": testPassword
                    });
                    login(testUsername);
                }
            }
        }
    })

}

function login(currentUser) {
    myUsername = currentUser
    $("#username-register").val("")
    $("#password-register").val("")
    $("#username-signIn").val("")
    $("#password-signIn").val("")
    $("#btn-cancel-reg").trigger("click")
    $("#signIn-page").hide()
    $("#main-page").show()
    $("#username").text(currentUser)
    databaseToMyShows()
    getRecommendDatabase()
}


//Sign-In Page
//===================================================================================================================================================
//store Data

function databaseToMyShows() {
    database.ref("/users/" + myUsername + "/shows").once("value").then(snapshot => {
        var shows = snapshot.val()
        $.each(shows, function (key, result) {
            myShows.push(result)
        })
        displayShows(myShows)

    })
}

function myShowsToDatabase() {

    database.ref("/users/" + myUsername + "/shows").set(myShows)

}

function getRecommendDatabase() {
    database.ref("/recommended").once("value").then(snap => {
        var recommmedList = snap.val()
        console.log(recommmedList)
        if (!recommmedList) {
            $(".recomend-list").empty()
                .append("<h2 class='text-center'>No Recommended Shows</h2>")
            return
        }
        var recomShows = []
        $.each(recommmedList, function (key, result) {
            recomShows.push(result)
        })
        displayRecommendShow(recomShows)
    })
}

function addToRecommended(showData) {
    database.ref("/recommended").push(showData)
}

function removeRecommeded (showData) {
    database.ref("/recommended").once("value").then(snap => {
        var recommendList = snap.val()
        var testObj = {
            name: showData.name,
            username: showData.username
        }
        console.log(recommendList)
        $.each(recommendList, function (key, value) {
            console.log(value.name, showData.name)
            if(value.name === showData.name && value.username === showData.username) {
                console.log(snap.child(key))
                database.ref("/recommended/" + key).remove()
                return
            }
        })
    })
}

//store Data
//=====================================================================================================================================================
//logout 

$("#signOut").on("click", function () {
    myUsername = ""
    myShows = []
    $("#signIn-page").show()
    $("#main-page").hide()
})