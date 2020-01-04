$(document).ready(function () {

    function adoptAPI(breed, location, status) {
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
                    breed + "&location=" + location,
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
                    });
            });
    }
    adoptAPI("Yorkshire Terrier", 19125);

    function dogAPI(breed) {
        var API_KEY = "1337f97b-fce8-4485-adca-4714c90a8c1a";
        var urlquery = "https://api.thedogapi.com/v1/breeds/search?q=" + breed + "&api_key=" + API_KEY;
        $.ajax({
            url: urlquery,
            method: 'GET',
        }).then(function (response) {
            console.log(response);
        });
    }

    dogAPI("Yorkshire Terrier");

})