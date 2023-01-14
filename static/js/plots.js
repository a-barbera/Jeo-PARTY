<<<<<<< HEAD
// let name = 'Travis Taylor'

// let title = `${name}'s First Plotly Chart`

// let books = ["The Visual Display of Quantitative Information", "Automate the Boring Stuff", "Data Science from Scratch"]

// let timesRead = [100, 50, 25]

// let trace1 = {
//   x: books,
//   y: timesRead,
//   type: 'bar'
// };
=======

let title = `Top Ten Jeopardy Categories`

let categories = ['SCIENCE', 'LITERATURE', 'AMERICAN HISTORY', 'POTPOURRI', 'HISTORY', 'SPORTS', 'BEFORE & AFTER', 'WORLD HISTORY', 'WORD ORIGINS', 'WORLD GEOGRAPHY']

let clueCount = [911,812,788,744,723,693,677,649,631,612]

let trace1 = {
  x: categories,
  y: clueCount,
  type: 'bar',
  marker: {
    color: [
      'rgba(245,40,145,0.8)', 
      'rgba(245,40,145,0.8)', 
      'rgba(245,40,145,0.8)',
      'rgba(93,20,58,0.8)',
      'rgba(93,20,58,0.8)',
      'rgba(93,20,58,0.8)',
      'rgba(93,20,58,0.8)',
      'rgba(93,20,58,0.8)', 
      'rgba(93,20,58,0.8)', 
      'rgba(93,20,58,0.8)'
    ]
  }
};
>>>>>>> e38d56bb7930ed4c8f407a8fa0549dc44df88905

// let data = [trace1];

<<<<<<< HEAD
// let layout = {
//   title: title
// };

// Plotly.newPlot("plot", data, layout);
=======
let layout = {
  title: title,
  font: {
    family: 'Anton, sans-serif',
    size: 18,
    color: '#323505'
  }
};

Plotly.newPlot("plot", data, layout);
>>>>>>> e38d56bb7930ed4c8f407a8fa0549dc44df88905
