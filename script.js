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
            "&gender=" +
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
            if (response.status === 400 || response.animals.length === 0) {
              return $(".error-message").text(
                "Alas fellow Knight, there are no hounds to be found."
              );
            }

            for (i = 0; i < response.animals.length; i++) {
              var name = response.animals[i].name;
              var age = response.animals[i].age;
              var description = response.animals[i].description;
              var urlLink = response.animals[i].url;
              var distance = response.animals[i].distance;
              var photo = response.animals[i].photos[0].medium;
              var city = response.animals[i].contact.address.city;
              var state = response.animals[i].contact.address.state;
              var postCode = response.animals[i].contact.address.postcode;
              var size = response.animals[i].size;
              var gender = response.animals[i].gender;

              var newCard = $('<div class="col s12 m7" id="adopt-cards">').html(
                '<h3 class="header" id="dog-name">' +
                  name +
                  "</h3>" +
                  '<div class="card horizontal" id="card-background">' +
                  '<div class="card-image">' +
                  '<img src="' +
                  photo +
                  '">' +
                  "</div>" +
                  '<div class="card-stacked">' +
                  '<div class="card-content">' +
                  '<p id="tidbits">' +
                  "A few treasures about this pooch: " +
                  "</p>" +
                  "<p>" +
                  description +
                  " " +
                  '<a href="' +
                  urlLink +
                  '" target="_blank">View full description ➳ </a>' +
                  "</p>" +
                  "<p>" +
                  "Age: " +
                  age +
                  "</p>" +
                  "<p>" +
                  "Size: " +
                  size +
                  "</p>" +
                  "<p>" +
                  "Gender: " +
                  gender +
                  "</p>" +
                  "<p>" +
                  "This pooch could be yours with a small journey of " +
                  distance.toFixed(1) +
                  " miles." +
                  "</p>" +
                  "<br>" +
                  '<p id="city-state-post">' +
                  city +
                  ", " +
                  state +
                  " " +
                  postCode +
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
          })
          .catch(function() {
            return $(".error-message").text(
              "Alas fellow Knight, there are no hounds to be found."
            );
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
    })
      .then(function(response) {
        if (response.status === 400) {
          return $(".breedInfo").text(
            "No hounds by the name of '" +
              breed +
              "' exist in this land! Double check the letters on your scroll!"
          );
        }

        var infoCard = $("<div>");

        var cardHeader = $("<h2>");

        cardHeader.text("Get To Know Your Hound!");

        cardHeader.appendTo(infoCard);

        var dogName = $("<p>");
        dogName.text(response[0].name);
        dogName.css("text-decoration", "underline");
        dogName.css("font-weight", "bold");
        dogName.css("font-size", 35);
        dogName.appendTo(infoCard);

        var dogWeight = $("<p>");
        dogWeight.text(
          "Average Weight: " + response[0].weight.imperial + " lbs"
        );
        dogWeight.appendTo(infoCard);

        var dogHeight = $("<p>");
        dogHeight.text(
          "Average Height: " + response[0].height.imperial + " inches"
        );
        dogHeight.appendTo(infoCard);

        var lifeSpan = $("<p>");
        lifeSpan.text("Life Span: " + response[0].life_span);
        lifeSpan.appendTo(infoCard);

        var dogTemperament = $("<p>");
        dogTemperament.text("Temperament: " + response[0].temperament);
        dogTemperament.appendTo(infoCard);

        var breedGroup = $("<p>");
        breedGroup.text("Breed Group: " + response[0].breed_group);
        breedGroup.appendTo(infoCard);

        var bredFor = $("<p>");
        bredFor.text("Bred For: " + response[0].bred_for);
        bredFor.appendTo(infoCard);

        infoCard.appendTo("#breedSection");
      })
      .catch(function() {
        return $(".breedInfo").text(
          "No hounds by the name of '" +
            breed +
            "' exist in this land! Double check the letters on your scroll!"
        );
      });
  }

  // Event Listener for Search Button
  $("#searchBtn").on("click", function(event) {
    event.preventDefault();

    $("#breedSection").empty();
    $("#adopt-section").empty();

    var breed = $("#breed_name")
      .val()
      .trim();

    var location = $("#location_name")
      .val()
      .trim();
    var sex = $("#sex")
      .val()
      .trim();

    $("#breedSection").css("display", "block");
    $("#adopt-section").css("display", "block");
    $(".landingPage").css("display", "none");

    dogAPI(breed);
    adoptAPI(breed, location, sex);

    //Event Listener for Dog Bark
    var dogBark = new Audio("assets/img/deepbark.wav");
    dogBark.play();
  });

  // JQuery for Sidenav functionality
  $(".sidenav").sidenav();
});

//Event Listener for Fairy Dust
$(".sidenav-trigger.waves-effect.waves-light.btn-large").click(function(event) {
  var fairyDust = new Audio("assets/FairyDust.wav");
  fairyDust.play();
});
