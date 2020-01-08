

$(document).ready(function () {


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

      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
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
          .then(function (response) {
            return response.json();
          })
          .then(function (response) {

            console.log(response);
 
    for (i = 0; i < response.animals.length; i++) {
      var name = response.animals[i].name;
      var age = response.animals[i].age;
      var description = response.animals[i].description;
      var urlLink = response.animals[i].url;
      var distance = response.animals[i].distance;
      var photo = response.animals[i].photos[0].small;

      var newCard = $('<div class="col s12 m7">').html('<h2 class="header">' + name + '   ' + age + '</h2>' +
      '<div class="card horizontal">' +
       '<div class="card-image">' +
        '<img src="' + photo + '">' +
        '</div>' +
        '<div class="card-stacked">' +
        '<div class="card-content">' +
         '<p>' + description + '</p>' +
         '<p>' + distance + '</p>' +
        '</div>' +
        '<div class="card-action">' +
        '<a href="' + urlLink + '"> Your Quest is Over - Click Here to Adopt Me! </a>' +
        '</div>' + 
        '</div>' +
      '</div>' +
    '</div>')
    }

    $("#adopt-section").append(newCard)
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
    }).then(function (response) {
      console.log(response);

      var dogName = $("<p>");
      dogName.text(response[0].name);
      console.log(response[0].name);

      var dogWeight = $("<p>");
      dogWeight.text(response[0].weight.imperial);
      console.log(response[0].weight.imperial);

      var dogHeight = $("<p>");
      dogHeight.text(response[0].height.imperial);
      console.log(response[0].height.imperial);

      var lifeSpan = $("<p>");
      lifeSpan.text(response[0].life_span);
      console.log(response[0].life_span);

      var dogTemperament = $("<p>");
      dogTemperament.text(response[0].temperament);
      console.log(response[0].temperament);

      var breedGroup = $("<p>");
      breedGroup.text(response[0].breed_group);
      console.log(response[0].breed_group);

      var bredFor = $("<p>");
      bredFor.text(response[0].bred_for);
      console.log(response[0].bred_for);


    });
  }

  // Event Listener for Search Button
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    // $(".conditions").empty();
    var breed = $("#breed_name").val().trim();
    var location = $("#location_name").val().trim();
    var sex = $("#sex").val().trim();

    dogAPI(breed);
    adoptAPI(breed, location, sex);
  })

  // JQuery for Sidenav functionality
  $('.sidenav').sidenav();
});


