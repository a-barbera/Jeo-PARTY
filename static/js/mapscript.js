var map = L.map('map').setView([37.0902, -95.7129], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

    var winners = [
        {
            games_played: 94,
            id: 208,
            name: "Ken Jennings",
            notes: "a software engineer from Salt Lake City, Utah",
            total_winnings: 2522700,
            location: [40.7608, -111.8910]
        },
        {
            games_played: 33,
            id: 75,
            name: "James Holzhauer",
            notes: "a professional sports gambler from Las Vegas, Nevada",
            total_winnings: 2464216,
            location: [36.1716, -115.1391]
        },
        {
            games_played: 29,
            id: 204,
            name: "David Madden",
            notes: "a student originally from Ridgewood, New Jersey",
            total_winnings: 432400,
            location: [40.9793, -74.1165]
        },
        {
            games_played: 32,
            id: 220,
            name: "Julia Collins",
            notes: "a supply chain professional from Kenilworth, Illinois",
            total_winnings: 429100,
            location: [42.0859, -87.7176]
        },
        {
            games_played: 27,
            id: 209,
            name: "Matt Jackson",
            notes: "a paralegal from Washington, D.C.",
            total_winnings: 413612,
            location: [38.9072, -77.0369]
        },
        {
            games_played: 26,
            id: 214,
            name: "Austin Rogers",
            notes: "a bartender from New York, New York",
            total_winnings: 413000,
            location: [40.7128, -74.0060]
        },
        {
            games_played: 16,
            id: 2117,
            name: "Arthur Chu",
            notes: "a compliance analyst and voiceover artist from Broadview Heights, Ohio",
            total_winnings: 298200,
            location: [41.3139, -81.6851]
        },
        {
            games_played: 21,
            id: 219,
            name: "Seth Wilson",
            notes: "a Ph.D. candidate from Chicago, Illinois",
            total_winnings: 267002,
            location: [41.8781, -87.6298]
        },
        {
            games_played: 14,
            id: 2364,
            name: "Tom Nissley",
            notes: "an online books editor from Seattle, Washington",
            total_winnings: 236405,
            location: [47.6062, -122.3321]
        },
        {
            games_played: 25,
            id: 213,
            name: "Roger Craig",
            notes: "a graduate student of computer science from Newark, Delaware",
            total_winnings: 231200,
            location: [39.6837, -75.7497]
        }
    ];
  
  // Looping through the cities array, create one marker for each city, bind a popup containing its name and population, and add it to the map.
  for (var i = 0; i < winners.length; i++) {
    var winner = winners[i];
    L.marker(winner.location)
      .bindPopup(`<h1>${winner.name}</h1> <hr> <h3>Total Winnings:$${winner.total_winnings.toLocaleString()}</h3><hr><h5>${winner.notes}</h5>`)
      .addTo(map);
  }
  