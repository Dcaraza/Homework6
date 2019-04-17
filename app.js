$(document).ready(function() {

    var car = [
      "chevy corvette", "ford mustang", "chevy camaro", "ford thunderbird", "dmc delorean", "mitsubishi eclipse",
      "lotus evora", "aston martin db7", "ferrari f-50", "ferrari f-40",
      "ferrari enzo", "ferrari la ferrari", "lamborghini gallardo", "lamborghini murcielago", "bmw m3",
    ];
  
    // function to make buttons and add to page
    function populateButtons(carsGifs, carClass, carArea) {
    //   Clear out all the cars that are currently there.
        $(carArea).empty();
        
        // The for loop will create a button for each item in the array by counting the length of the array.
      for (var i = 0; i < carsGifs.length; i++) {
        // Make button variable
        var a = $("<button>");
        // add class to variable
        a.addClass(carClass);
        // add attribute to variable named the same as what is in the array.
        a.attr("data-type", carsGifs[i]);
        // add text that is the same as the array.
        a.text(carsGifs[i]);
        // paste it all on the page
        $(carArea).append(a);
      }
  
    }
    // This is triggeres on the click of any car button class.
    $(document).on("click", ".car-button", function() {
        // this clears out the cars id. this is where all the gifs from the previous car that was selected are help.
      $("#cars").empty();
    //   This clears out the class name. it still leaves the class.
      $(".car-button").removeClass("active");
        // Here we add back the active class to the code.
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
  
    // Here is the ajax call. remember the stupid brackets! 
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
        // This stores all the objects under data for this gif. there are 10 objects because that is the number that you selected.
          var results = response.data;
            // This is the loop to create the 10 gifs
          for (var i = 0; i < results.length; i++) {
            var carDiv = $("<div class=\"car-item\">");
            // The code will loop through and pick each object in the array and select the rating it will then store it as a variable.
            var rating = results[i].rating;
            // create a variable that will be a p tag with text.
            var p = $("<p>").text("Rating: " + rating);
            // These are the variables for the gif that is animated and or still.
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            
            // This is the img attribute being added into a variable
            var carPic = $("<img>");
            // this adds all these variables as attributes to the variable for carPic to determine if the gif will be still or animated.
            carPic.attr("src", still);
            carPic.attr("data-still", still);
            carPic.attr("data-animate", animated);
            // This attribute will be used to determine if the gif is moving or standing still
            carPic.attr("data-state", "still");
            carPic.addClass("car-image");
            
            // This will add the rating to the div
            carDiv.append(p);
            // This will add the actual car gid to the div
            carDiv.append(carPic);
            // This will add the car div to the cars id in the html
            $("#cars").append(carDiv);
          }
        });
    });
  
    // This is called when an image is clicked.
    $(document).on("click", ".car-image", function() {
        // this is to capture the current state of that image. If is is animated or standing still.
      var state = $(this).attr("data-state");
        // This was straight from the class assignment. If moving, make it stop. If stopped, animate it. 
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


    $("#add-car").on("click", function(event) {
      // This is native to the jquery library and prevents an action from happeneing.
      event.preventDefault();

      // eq is used to select a specific index from an array. In this case we are getting
      // the value from index 0 in the array that is in input.
      var newCar = $("input").eq(0).val();
  
        car.push(newCar);
      
  
      populateButtons(car, "car-button", "#car-buttons");
  
    });
  
    populateButtons(car, "car-button", "#car-buttons");
  });