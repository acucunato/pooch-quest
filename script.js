$(document).ready(function() {
  // Function pull nearest adoptable dogs
  function adoptAPI(breed, location, sex) {
    var CLIENT_ID = "VCczzgBh8Mbtp61y6gfIIUFuFKPvGPo2Rt2tIwfskw1UOfylEg";
    var CLIENT_SECRET = "zudVxDG4Hcl82bK8u85yFqcIpQndRKRH8ARqYnvI";
    fetch("https://api.petfinder.com/v2/oauth2/token", {
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        fetch(
          "https://api.petfinder.com/v2/animals?type=Dog&distance=50&status=adoptable&breed=" +
            breed +
            "&location=" +
            location +
            "&sex=" +
            sex,

          {
            headers: {
              Authorization: "Bearer " + response.access_token
            }
          }
        )
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            console.log(response);

            for (i = 0; i < response.animals.length; i++) {
              var name = response.animals[i].name;
              var age = response.animals[i].age;
              var description = response.animals[i].description;
              var urlLink = response.animals[i].url;
              var distance = response.animals[i].distance;
              var photo = response.animals[i].photos[0].medium;

              var newCard = $('<div class="col s12 m7">').html(
                '<h3 class="header">' +
                  name +
                  "</h3>" +
                  '<div class="card horizontal">' +
                  '<div class="card-image">' +
                  '<img src="' +
                  photo +
                  '">' +
                  "</div>" +
                  '<div class="card-stacked">' +
                  '<div class="card-content">' +
                  "<p>" +
                  "A few tidbits about this pooch: " +
                  description +
                  "</p>" +
                  "<p>" +
                  "Age: " +
                  age +
                  "</p>" +
                  "<p>" +
                  "This pooch could be yours with a small journey of " +
                  distance.toFixed(1) +
                  " miles." +
                  "</p>" +
                  "</div>" +
                  '<div class="card-action">' +
                  '<a href="' +
                  urlLink +
                  '" target="_blank"> Your Quest is Over - Click Here to Adopt Me! </a>' +
                  "</div>" +
                  "</div>" +
                  "</div>" +
                  "</div>"
              );

              $("#adopt-section").append(newCard);
            }
          });
      });
  }

  // Function to pull Breed Information for API database
  function dogAPI(breed) {
    var API_KEY = "1337f97b-fce8-4485-adca-4714c90a8c1a";
    var urlquery =
      "https://api.thedogapi.com/v1/breeds/search?q=" +
      breed +
      "&api_key=" +
      API_KEY;
    $.ajax({
      url: urlquery,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      var infoCard = $("<div>");

      var dogName = $("<p>");
      dogName.text(response[0].name);
      dogName.css("text-decoration" , "underline");
      dogName.css("font-weight" , "bold");
      dogName.css("font-size" , 35);
      dogName.appendTo(infoCard);
      console.log(response[0].name);

      var dogWeight = $("<p>");
      dogWeight.text("Average Weight: " + response[0].weight.imperial + " lbs");
      dogWeight.appendTo(infoCard);
      console.log(response[0].weight.imperial);

      var dogHeight = $("<p>");
      dogHeight.text("Average Height: " + response[0].height.imperial + " inches");
      dogHeight.appendTo(infoCard);
      console.log(response[0].height.imperial);

      var lifeSpan = $("<p>");
      lifeSpan.text("Life Span: " + response[0].life_span);
      lifeSpan.appendTo(infoCard);
      console.log(response[0].life_span);

      var dogTemperament = $("<p>");
      dogTemperament.text("Temperament: " + response[0].temperament);
      dogTemperament.appendTo(infoCard);
      console.log(response[0].temperament);

      var breedGroup = $("<p>");
      breedGroup.text("Breed Group: " + response[0].breed_group);
      breedGroup.appendTo(infoCard);
      console.log(response[0].breed_group);

      var bredFor = $("<p>");
      bredFor.text("Bred For: " + response[0].bred_for);
      bredFor.appendTo(infoCard);
      console.log(response[0].bred_for);

      infoCard.appendTo("#breedSection");

      
    });
  }

  // Event Listener for Search Button
  $("#searchBtn").on("click", function(event) {
    event.preventDefault();

    $("#breedSection").empty();

    var breed = $("#breed_name").val().trim();
    var location = $("#location_name").val().trim();
    var sex = $("#sex").val().trim();

    $("#breedSection").css("display", "block");
    $("#adopt-section").css("display", "block");
    $(".landingPage").css("display", "none");

    dogAPI(breed);
    adoptAPI(breed, location, sex);
  });

  // JQuery for Sidenav functionality
  $(".sidenav").sidenav();
});
