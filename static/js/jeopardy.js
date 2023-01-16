// create necessary constructs
const jeo_values = ['200', '400', '600', '800', '1000']
const scoreDisplay = document.getElementById('score')
const dollarsign = '$'
// create score variable
var score = 0

// on startup run the below, fetching the local json file of questions
// json file has been cleaned to only include categories which have a minimum of 5 questions
fetch("static/js/cleanedQs.json")
    .then(response => response.json())
    .then(function(d){
        // randomly select 6 categories
        let game_categories = randomCategories(d)

        // create an empty gameboard list to hold all categories and their questions and answers
        let gameboard = []

        for (let j = 0; j < game_categories.length; j++){
            // set current category as a variable
            let category = game_categories[j]
            //  create empty list for questions and answers
            let qAs = []

            // create empty list for holding questions only (for later checks)
            let questions = []

            // loop througheach score value in jeo_values
            for (let i = 0; i < jeo_values.length; i++){

                // This do while makes sure the question pulled is not already in the above questions list
                do{
                    var q = getQuestion(category, jeo_values[i], d)
                }
                while(includes(questions, q.question))

                
                // add question to questions list
                questions.push(q.question)

                // clean answer of special chracters
                answerClean = q.answer.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

                // create an array to hold the question and the answer
                dict = {
                    question: q.question,
                    answer: answerClean
                }

                // add the array to the list of arrays
                qAs.push(dict)
            }

            // make an array for each category and it's five questions
            dict = {
                category: category,
                questions: qAs,
            }

            // add the array of the category and it's questions to the gameboard list
            gameboard.push(dict)
        }
        // loop through each category to add the columns to the page
        gameboard.forEach(category => addCategory(category))
    })



// function to return random questions based on category and value
function getQuestion(category, value, questions){

    // shuffles the questions so that any repeat categories don't show the same questions
    let randomized_qs = shuffle(questions)

    // loops through all the questions
    for (let i = 0; i<randomized_qs.length;i++){

        // checks to find questions that match the value and category
        if(randomized_qs[i].category == category && randomized_qs[i].value == value){

            //save the question as a var
            var q = randomized_qs[i]
            break;
        }
    }
    // if there is no value for q because one for that value could not be found, loop back through and just find any question
    if(typeof q == 'undefined'){
        for (let i = 0; i<randomized_qs.length;i++){
            if(randomized_qs[i].category == category){
                var q = randomized_qs[i]
                break;
            }
        }
    }
    return q
}


// function to return 6 random categories
function randomCategories(all_questions){
    cat_list = createCatList(all_questions);
    six_cats = getRandom(cat_list, 6) 
    return six_cats
}

// function to create a list of categories
function createCatList(questions){
    var cats = [];
    for (let i = 0; i < questions.length; i ++){

            cats.push(questions[i].category);
        
    };
    return cats;
}

// function to count how many times category appears in list
function count(array, value){
    let count = 0
    for (let i = 0; i < array.length; i++){
        if(array[i].category == value){
            count +=1
        }
    }
    return count
}


// function which checks if something is included in an array of values
function includes(array, value){
    for(let i = 0; i < array.length; i++){
        if(array[i] == value){
            return true
        }else{
            return false
        }
    }
}

// randomizer
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

// function to shuffle the array to randomize the questions
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function addCategory(category) {
    // grad game div
    var game = document.getElementById('game')

    // adds a column for the given category
    const column = document.createElement('div')
    column.classList.add('genre-column')

    // add a title div for the column
    const catTitle = document.createElement('div')
    catTitle.classList.add("genre-title")
    // sets the text for the title cell to the category value
    catTitle.innerText = category.category

    column.appendChild(catTitle)

    // set up for looping through of jeo values above
    var i = 0

    // loop through each question in the given category
    category.questions.forEach(question =>{
        // create a square for each question
        const square = document.createElement('div')
        square.classList.add('square')
        square.classList.add('unanswered')
        column.append(square)

        // sets value equal to relative postition in jeo_values list
        let value = jeo_values[i]

        // concatenate with the dollar sign (makes for easier manipulation of value attribute later)
        square.innerHTML = dollarsign.concat(value)

        // set attributes of the square to store the question, answer, and it's value
        square.setAttribute('text-question', question.question)
        square.setAttribute('text-answer', question.answer)
        square.setAttribute('value', value)

        // add event listener for when square is clicked
        square.addEventListener('click', flipSquare)

        // add to i to move to next value in jeo_values
        i+=1
        })

    game.append(column)
}


function flipSquare() {
    // blank out the text and change font stylings to be smaller and white
    this.innerHTML = ""
    this.style.fontSize = '14px'
    this.style.lineHeight = '30px'
    this.style.color = 'rgb(255,255,255)'

    // set new text to the question
    const newText = document.createElement('div')
    newText.classList.add('card-text')
    newText.innerHTML = this.getAttribute('text-question')
    this.append(newText)

    // add new input for answer
    const answer = document.createElement('input')
    answer.setAttribute('type', 'text')
    answer.setAttribute('id', 'answer')
    this.append(answer)

    // add submit button
    const button = document.createElement('input')
    button.setAttribute('type', 'button')
    button.setAttribute('id', 'submitButton')
    button.setAttribute('value', 'Submit')
    button.addEventListener('click', checkAnswer)
    this.append(button)

    // remove the event listeners from all squares
    const allSquares = Array.from(document.querySelectorAll('.square'))
    allSquares.forEach(square => square.removeEventListener('click', flipSquare))

}

// function to check the answer
function checkAnswer(){

     // create variables for the answer given and the parent element of the square for manipulation
     var answerValue = document.getElementById('answer').value
     const squareOfButton = this.parentElement
     const actualAnswer = squareOfButton.getAttribute('text-answer')

     // remove the unansered class so the below adding back of event listeners dpes not apply
     squareOfButton.classList.remove('unanswered')

    // add the click event listeners back to all the unanswered squares
    const allSquares = Array.from(document.querySelectorAll('.unanswered'))
    allSquares.forEach(square => square.addEventListener('click', flipSquare))

    // change font stylings back to the original size and color
    squareOfButton.style.fontSize = '14px'
    squareOfButton.style.lineHeight = '50px'
    squareOfButton.style.color = 'rgb(232, 184, 125)'

    // if else statement that runs code based on if the answer is correct (answers and answer attribute set to lower case)
    // if answer is correct:
    if (squareOfButton.getAttribute('text-answer').toLowerCase()== answerValue.toLowerCase()){

        // add the value attribute to the score variable and add it to the score display
        score += parseInt(squareOfButton.getAttribute('value'))
        scoreDisplay.innerHTML = dollarsign.concat(score)

        // remove the input box and the submit button
        var answer = document.getElementById('answer')
        squareOfButton.removeChild(answer)

        var button = document.getElementById('submitButton')
        squareOfButton.removeChild(button)

        // change the square to green and show value won
        squareOfButton.classList.add('correct-answer')
        let value = squareOfButton.getAttribute('value')
        let dollarvalue = dollarsign.concat(value)
        squareOfButton.innerHTML = actualAnswer.concat(" ",dollarvalue)
    
    // if answer is incorrect:
    }else{
        // updates score (in case first answer is wrong, will display '$0')
        scoreDisplay.innerHTML = dollarsign.concat(score)
        squareOfButton.classList.add('wrong-answer')

        // remove the input box and the submit button
        var answer = document.getElementById('answer')
        squareOfButton.removeChild(answer)

        var button = document.getElementById('submitButton')
        squareOfButton.removeChild(button)

           // add answer to the box
           let dollarvalue = dollarsign.concat(0)
           squareOfButton.innerHTML = actualAnswer.concat(" ",dollarvalue)
    }
    
    // remove the event listener for this specific square
    squareOfButton.removeEventListener('click', flipSquare)

}
