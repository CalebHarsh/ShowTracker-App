$(document).ready(function () {
    //global variables
    var showsTrack = [];
    function saveToStorage() {
        var string = JSON.stringify(showsTrack);
        localStorage.setItem("shows", string);
        console.log("New Show Added");
    }
    function storageToArr() {
        var track = localStorage.getItem("shows");
        console.log(JSON.parse(track));
        console.log(JSON.parse("[]"));
        if (track != null && localStorage.getItem("shows") != "[]") {
             $(".show-list").empty();
            showsTrack = JSON.parse(track);
        }
        loadPage();
    }
    $("#new-show").on("click", function (event) {
        event.preventDefault();
        var newShow = {
            title: $("#title").val().trim(),
            episode: $("#episodeNum").val().trim(),
            description: $("#descriptions").val().trim(),
            status: "incomplete"
        }
        showsTrack.push(newShow);
        saveToStorage();
        storageToArr();
        $("#title").val("");
        $("#episodeNum").val("");
        $("#descriptions").val("");
    });
    function removeFromArr(item) {
        var index = showsTrack.indexOf(item);
        showsTrack.splice(index, 1);
    }
    $(document).on("click", ".remove", function () {
       console.log($(this).data("data-name")); 
       removeFromArr($(this).data("data-name"));
       saveToStorage();
       storageToArr();

    });
    //Show More button
    $(document).on("click", "#more", function () {
        var parent = $(this).parent();
        console.log(parent);
        if ($(this).text() === "Show More") {
            parent.children("#description").show();
            $(this).text("Show Less");
        } else {
            parent.children("#description").hide();
            $(this).text("Show More");
        }
        saveToStorage();
    });
    $(document).on("click", "#plus", function () {
        var showData = $(this).parent().data();
        if (showData.showInfo.status === "incomplete") {
            showData.showInfo.episode = parseInt(showData.showInfo.episode) + 1;
            $(this).parent().parent().children("#episode").text("Episode: " + showData.showInfo.episode + " ");
        }
        saveToStorage()
    });
    $(document).on("click", "#minus", function () {
        var showData = $(this).parent().data();
        if (showData.showInfo.episode > 0 && showData.showInfo.status === "incomplete") {
            showData.showInfo.episode = parseInt(showData.showInfo.episode) - 1;
            $(this).parent().parent().children("#episode").text("Episode: " + showData.showInfo.episode + " ");
        }
        saveToStorage();
    });
    $(document).on("click", "#status", function () {
        var showData = $(this).parent().data();
        if (showData.showInfo.status === "complete") {
            showData.showInfo.status = "incomplete";
            $(this).parent().parent().parent().parent().parent().removeClass("bg-success").addClass("bg-secondary");
            $(this).text("Still Watching");
            showData.showInfo.episode = 1;
            $(this).parent().parent().children("#episode").text("Episode: " + showData.showInfo.episode + " ");
        } else {
            showData.showInfo.status = "complete";
            $(this).parent().parent().parent().parent().parent().removeClass("bg-secondary").addClass("bg-success");
            $(this).text("Start Over");
        }
        saveToStorage();
    });
    function loadPage() {
        console.log(showsTrack);
        showsTrack.forEach(element => {
            showToPage(element);
        });
    }
    storageToArr();

    //creating show listings
    function showToPage(show) {
        var newRow = $("<div>");
        newRow.addClass("row");
        var newCol = $("<div>");
        newCol.addClass("col-12");
        newCol.appendTo(newRow);
        var newCard = $("<div>");
        newCard.addClass("card mb-3");
        if (show.status === "incomplete") {
            newCard.addClass("bg-secondary")
        } else {
            newCard.addClass("bg-success");
        }
        newCard.appendTo(newCol);
        var removeBtn = $("<button>");
        removeBtn.attr("type", "button");
        removeBtn.data("data-name", show.title);
        removeBtn.addClass("close d-flex justify-content-end mr-2 remove");
        removeBtn.html("&times;");
        removeBtn.appendTo(newCard);
        var cardBody = $("<div>");
        cardBody.addClass("card-body");
        cardBody.appendTo(newCard);
        var cardRow = $("<div>");
        cardRow.addClass("row");
        cardRow.appendTo(cardBody);
        var cardCol = $("<div>");
        cardCol.addClass("col-md-8 text-center d-flex justify-content-md-start justify-content-center");
        cardCol.appendTo(cardRow);
        var showTitle = $("<h3>");
        showTitle.addClass("text-white align-self-center");
        showTitle.text(show.title);
        showTitle.appendTo(cardCol);
        var epiCol = $("<div>");
        epiCol.addClass("col-md-4 text-white aligh-self-center h5");
        var epiCount = $("<span>").attr("id", "episode");
        epiCount.text("Episode: " + show.episode + " ");
        epiCount.appendTo(epiCol);
        var listBtn = $("<div>");
        listBtn.addClass("btn-group");
        listBtn.attr("role", "group");
        listBtn.css("border", "1px solid black");
        listBtn.css("border-radius", ".25rem");
        console.log(show);
        listBtn.data("show-info", show);
        var minusBtn = $("<button>");
        minusBtn.attr("type", "button");
        minusBtn.addClass("btn btn-danger").attr("id", "minus");
        minusBtn.html("<i class='fa fa-minus'></i>");
        minusBtn.appendTo(listBtn);
        var complete = $("<button>");
        complete.attr("type", "button");
        complete.addClass("btn btn-dark").attr("id", "status");
        if (show.status === "incomplete") {
            complete.text("Still Watching");
        } else {
            complete.text("Start Over");
        }
        complete.appendTo(listBtn);
        var plusBtn = $("<button>");
        plusBtn.attr("type", "button");
        plusBtn.addClass("btn btn-success").attr("id", "plus");
        plusBtn.html("<i class='fa fa-plus'></i>");
        plusBtn.appendTo(listBtn);
        listBtn.appendTo(epiCol);
        epiCol.appendTo(cardRow);
        var cardRow2 = $("<div>");
        cardRow2.addClass("row");
        cardRow2.appendTo(cardBody);
        var cardCol2 = $("<div>");
        cardCol2.addClass("col-12");
        cardCol2.appendTo(cardRow2);
        var descr = $("<p>").attr("id", "description");
        descr.text(show.description);
        descr.hide();
        descr.appendTo(cardCol2);
        var more = $("<span>").attr("id", "more");
        more.text("Show More");
        more.appendTo(cardCol2);
        $(".show-list").prepend(newRow);

    }
});