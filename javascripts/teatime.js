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
            for (i = 0, len = items.teas.length; i < len; i++)
            {
                tea(items.teas[i]);
            }
        }
    }   
    request.send();

    //Build droppable teapot zone 
    $(function ()
    {
        $("#teapot").droppable({
            drop: function (event, ui)
            {
                $(this).find("h1").html("Boiling water . . .");
                brew(ui.draggable);
                console.log(ui.draggable);
            }
        });
    });
     
    //Build individual teas
    function tea(tea)
    {
        this.brewTemp = tea.brewtemp;
        this.steepTime = tea.steeptime;
        this.steepTimeSeconds = tea.steeptimeseconds;
        this.type = tea.type;
        var teabag = function ()
        {
            $("#" + this.type).draggable({ revert: "invalid" });
        };
        teabag();
        this.brew = function () {
            console.log(7);
        }
    }

    function brew($item) {
        var teaType = window[$item.context.id];
        var test = tea(teaType).type;
        console.log(test);
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