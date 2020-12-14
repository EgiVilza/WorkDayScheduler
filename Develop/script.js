
//display todays date onto the header
var todaysDate = $("<div>")
todaysDate.text(moment().format('ll'))
todaysDate.css("font-size", "25px")
$(".jumbotron").append(todaysDate)

//initialize variables for the time fields
var time = 8
var a = " am"

//Creates the time/text/button fields in the calendar
for (var i = 1; i < 10; i++) {

    //container div
    var divContainer = $("<div>")
    divContainer.attr({class:"container", id:"flex-container"})

    //Updates the proper time format by one hour
    if (time == 11){
        a = " pm"
    }
    else if (time == 12) {
        time = 0
    }

    time++

    //Time field
    var timefield = $("<div>")
    timefield.attr({class:"flex-item TimeTextBox", id:("timeField" + i)})
    timefield.text(time + a)
    
    //Text field
    var textfield = $("<div>")
    textfield.attr({class:"flex-item " + i})
    textfield.append($("<input>").attr({type:"text", id:"textField", class:("textContent" + i)}))

    //button element
    var savebutton = $("<button>")
    savebutton.attr({class:"flex-item saveButton", id:i})
    savebutton.text("save")

    //adds each element to the container div
    divContainer.append(timefield, textfield, savebutton)

    //container div added onto the body of the html page
    $(".tBody").append(divContainer)
    
}

//color code the past, present, future text boxes
for (var i = 1; i < 10; i++) {
    //storing time
    var timefield = $("#timeField" + i).text() //getting time field
    var calendarTime = moment(timefield, 'hh a').format('H') //format time to military time
    var todayTime = moment().format('H') //current military time

    //Boolean to determine which time fields are present or future
    var presentOrFuture = parseInt(todayTime) > parseInt(calendarTime)
    
    //update background colors
    if (presentOrFuture === true) {
        $("." + i).addClass("past")
    }
    else if (parseInt(todayTime) == parseInt(calendarTime)){
        $("." + i).addClass("present")
    }
    else {
        $("." + i).addClass("future")
    }
    
}

//Initializes the calendar items localstorage and saves the value of the fields onto the HTML page
for (var i = 1; i < 10; i++) {
    
    var jsonI = JSON.stringify(i)
    var localStorageTextContent = localStorage.getItem(jsonI)

    //Initialize local storage fields to an empty string
    if (localStorage.getItem(jsonI) == null) {
        localStorage.setItem(jsonI, "")
    }

    //Adds the localstorage content onto the HTML page
    //slice is used to remove the quotes on the text content
    $(".textContent" + i).val(localStorageTextContent.slice(1, -1))

}

//Click event listeners for all buttons and
// saves the text to local storage based on input field's class number
$("button").on("click", function(event) {
    //stores button ID in a variable
    var buttonID = $(this).attr("id")
    //stores the value of the text box contents into a JSON string format
    var textContentID = JSON.stringify($(".textContent" + buttonID).val())
    
    //Updates the local storage based on the calendar text box content
    if (textContentID != "") {
        localStorage.setItem(buttonID, textContentID)
    }
})


