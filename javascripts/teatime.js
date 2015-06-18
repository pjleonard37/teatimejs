$(document).ready(function () {
    //Pull in JSON via AJAX
    var request;
    if (window.XMLHttpRequest)
    {
        request = new XMLHttpRequest();
    }
    else
    {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open("GET", "teas.json"); 
    request.onreadystatechange = function() {
        if((request.readyState===4) && (request.status===200))
        {
            var items = JSON.parse(request.responseText);
            for (i = 0; i < items.length; i++)
            {
                console.log(items.teas[i]);
            }
        }
    }   
    request.send();

    $(function ()
    {
        herbal.buildTeaBag();
        black.buildTeaBag();
        oolong.buildTeaBag();
        green.buildTeaBag();
        white.buildTeaBag();
        mate.buildTeaBag();
        rooibos.buildTeaBag();
        chai.buildTeaBag();
     
        $("#teapot").droppable({
            drop: function (event, ui)
            {
                $(this).find("h1").html("Boiling water . . .");
                brew(ui.draggable);
            }
        });
    });
     
    function tea(brewTemp, steepTime, steepTimeSeconds, type)
    {
        this.brewTemp = brewTemp;
        this.steepTime = steepTime;
        this.steepTimeSeconds = steepTimeSeconds;
        this.type = type;
        this.buildTeaBag = function ()
        {
            $("#" + this.type).draggable({ revert: "invalid" });
        }
    }
     
    var herbal = new tea("210", "3-6", 300, "herbal");
    var black = new tea("205", "2-3", 150, "black");
    var oolong = new tea("180", "2-3", 150, "oolong");
    var green = new tea("175", "1-2", 90, "green");
    var white = new tea("155", "1-2", 90, "white");
    var mate = new tea("205", "5-6", 330, "mate");
    var rooibos = new tea("205", "5-6", 330, "rooibos");
    var chai = new tea("212", "10", 600, "chai");
     
    function brew($item) {
        var teaType = window[$item.context.id];
        console.log(teaType); 
        var teaNotification = $("<h1>You've selected " + teaType.id + " tea. Brew tea at <strong>" + teaType.brewTemp + "\xB0 F</strong>, then steep for <strong>" + teaType.steepTime + " minutes.</strong> Click the pot to begin steeping time. Enjoy!</h1>");
        $('#instructions').append(teaNotification);
        $('#teapot').one("click", function ()
        {
            clock(teaType.steepTimeSeconds);
            $(this).find("h1").html("Steeping tea . . .");
            $("#teacup").fadeIn(teaType.steepTimeSeconds * 1000);
        });
        $item.fadeOut(1600);
        $(".gallery").fadeOut(2000);
    }
     
    function clock(brewTime)
    {
        var brewTimeStatic = brewTime;
        var intervalId = setInterval(function ()
        {
            var currentSeconds = brewTime % 60;
            var currentMinutes = (brewTime - currentSeconds) / 60;
            currentSeconds = (currentSeconds < 10) ? "0" + currentSeconds : currentSeconds;
            var currentTimeString = currentMinutes + ":" + currentSeconds;
            if (brewTime < (brewTimeStatic / 4))
            {
                $("#teapot").find("img").attr("src", 'Images/TeaPot3.png').fadeIn(30000);
            }
            else if (brewTime < (brewTimeStatic / 2))
            {
                $("#teapot").find("img").attr("src", 'Images/TeaPot2.png').fadeIn(30000);
            }
            else if (brewTime < (brewTimeStatic * 3 / 4))
            {
                $("#teapot").find("img").attr("src", 'Images/TeaPot1.png').fadeIn(30000);
            }
            $("#teapot").find("h1").html("Steeping time left: " + currentTimeString);
            if (brewTime == 0)
            {
                pour();
                clearInterval(intervalId);
            }
            brewTime--;
        }, 1000);
    }
         
    function pour()
    {
        $("#teapot").find("h1").html("Time to pour . . . ");
        $("#teapot").find("img").attr("src", 'Images/TeaPot4.png').fadeIn(30000);
        $("#teacup").find("img").attr("src", 'Images/TeaCupFull.png').fadeIn(30000);
    }
});