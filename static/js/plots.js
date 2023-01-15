
// let title = `Top Ten Jeopardy Categories`

// let categories = ['SCIENCE', 'LITERATURE', 'AMERICAN HISTORY', 'POTPOURRI', 'HISTORY', 'SPORTS', 'BEFORE & AFTER', 'WORLD HISTORY', 'WORD ORIGINS', 'WORLD GEOGRAPHY']

// let clueCount = [911,812,788,744,723,693,677,649,631,612]

// let trace1 = {
//   x: categories,
//   y: clueCount,
//   type: 'bar',
//   marker: {
//     color: [
//       'rgba(245,40,145,0.8)', 
//       'rgba(245,40,145,0.8)', 
//       'rgba(245,40,145,0.8)',
//       'rgba(93,20,58,0.8)',
//       'rgba(93,20,58,0.8)',
//       'rgba(93,20,58,0.8)',
//       'rgba(93,20,58,0.8)',
//       'rgba(93,20,58,0.8)', 
//       'rgba(93,20,58,0.8)', 
//       'rgba(93,20,58,0.8)'
//     ]
//   }
// };

// let data = [trace1];

// let layout = {
//   title: title,
//   font: {
//     family: 'Anton, sans-serif',
//     size: 18,
//     color: '#323505'
//   }
// };


var graph1 = graph1JSON | safe;
Plotly.plot('chart1', graph1, );


var graph5 = fig5 | safe;
Plotly.plot('chart3', graph5,);



AOS.init({
    offset:400,
    duration:1000,
});

// Plotly.newPlot("plot", data, layout);
