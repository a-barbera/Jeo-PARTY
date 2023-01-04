
// coding the jeopardy javascript
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');

const jeopardyCategories = [
    {
        genre: "Who",
    questions: [
        {question:"Who wrote Harry Potter?",
        answers: ["JK Rowling", "JRR Tolkien"],
        correct: "JK Rowling",
        level: "easy"
        },
    ]
    },
    {
        genre: "Where",
    questions: []
    },
    {
        genre: "When",
    questions: []
    },
    {
        genre: "What",
    questions: []
    },
    {
        genre: "How Many",
    questions: []
    },
]

function addCategory(category) {
    const column = document.createElement('div')
    column.classList.add('genre-column')

    const genreTitle = document.createElement('div')
    genreTitle.classList.add("genre-title")
    genreTitle.innerText = category.genre

    column.appendChild(genreTitle)
    // putting it back into the HTML
    game.append(column)
}

jeopardyCategories.forEach(category => addCategory(category))