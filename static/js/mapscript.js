var map = L.map('map').setView([37.0902, -95.7129], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


d3.json("../static/js/location.json").then(function(response) {

    console.log(response);

  // Looping through the cities array, create one marker for each city, bind a popup containing its name and population, and add it to the map.
    for (var i = 0; i < response.length; i++) {
        
        var player = response[i];
        if (player) {
        L.marker(L.latLng(parseFloat(player.Lat),
                parseFloat(player.Lng)))
        .bindPopup(`<h4>${player.name}</h4> <hr> <h6>Total Winnings:$${player.amount}</h6><hr><h6><em>Games Played:${player.games}</em></h6><hr><p><b>${player.notes}</b></p>`)
        .addTo(map);
        }
  }
})