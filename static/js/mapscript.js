var map = L.map('map').setView([37.0902, -95.7129], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


d3.json("../static/js/location.json").then(function(response) {

    console.log(response);

  // Looping through the cities array, create one marker for each city, bind a popup containing its name and population, and add it to the map.
    for (var i = 0; i < response.length; i++) {
        
        var player = response[i];
        if (player) {
        L.marker(L.latLng(parseFloat(player.Lat),
                parseFloat(player.Lng)))
        .bindPopup(`<h4>${player.name}</h4> <hr> <h7>Total Winnings:$${player.amount}</h7><hr><h7>Games Played:${player.games}</h7><hr><h8>${player.notes}</h8>`)
        .addTo(map);
        }
  }
})