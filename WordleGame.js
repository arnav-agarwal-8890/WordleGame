let body = document.querySelector("body")
body.style.display = "flex"
body.style.flexDirection = "column"
body.style.alignItems = "center"
body.style.background = "#f4f4f4"
body.style.height = "690px"
body.style.borderRadius = "25px"

let container = document.createElement("div")
container.style.borderRadius = "25px"
container.style.background = "#FFFFFF"
container.style.shadowBox = "0px 2px 5px lightgrey"
container.style.width = "1450px"
container.style.height = "690px"
container.style.display = "flex"
container.style.flexDirection = "column"
container.style.justifyItems = "center"
container.style.alignItems = "center"

body.appendChild(container)

let heading = document.createElement("h1")
heading.textContent = "Wordle Game"
heading.style.fontFamily = "Arial"
heading.style.color = "#333"
heading.style.fontSize = "65px"
heading.style.fontWeight = "bold"
heading.style.margin = "10px"

container.appendChild(heading)


for(let i=0; i < 6; i++) {
    let newRow = document.createElement("ul")
    newRow.style.display = "flex"
    newRow.style.flexDirection = "row"
    newRow.style.margin = "5px"
    newRow.style.gap = "10px"
    newRow.style.listStyleType = "none"
    newRow.style.width = "335px"
    
    for(let j=0; j < 5; j++) {
        let box = document.createElement("li")
        box.style.height = "50px"
        box.style.width = "50px"
        box.style.shadowBox = "0px 2px 5px lightgrey"
        box.style.borderWidth = "1px"
        box.style.borderStyle = "solid"
        box.style.borderColor = "#000000"
        box.style.textAlign = "center"
        box.style.display = "flex"
        box.style.flexDirection = "column"
        box.style.justifyContent = "center"

        newRow.appendChild(box)
    }

    container.appendChild(newRow)
}


let inputContainer = document.createElement("div")
inputContainer.style.display = "flex"
inputContainer.style.flexDirection = "row"
inputContainer.style.gap = "5px"
inputContainer.style.margin = "25px"

container.appendChild(inputContainer)


let feedback = document.createElement("div")
feedback.style.fontSize = "20px"
feedback.style.fontFamily = "Arial"

container.appendChild(feedback)


let inputField = document.createElement("input")
inputField.style.width = "200px"
inputField.style.height = "30px"

inputField.addEventListener("keydown", (event) => {
    if(inputField.value.length > 4 && event.key !== "Backspace") {
        event.preventDefault()
    }
})

inputContainer.appendChild(inputField)

let randomIndex = Math.floor(Math.random() * words.length)
let randomWord = words[randomIndex]

let rows = document.querySelectorAll("ul")
let clickCount = 0

let submitButton = document.createElement("button")
submitButton.textContent = "Submit Guess"
submitButton.style.width = "125px"

function handleSubmit(event) {
    let row = rows[clickCount].children
    let word = inputField.value.toLowerCase()

    if(inputField.value.length !== 5) return

    for(let i=0; i < word.length; i++) {
        row[i].textContent = word[i]
        row[i].style.fontFamily = "Arial"

        if(randomWord[i] === word[i]) {
            row[i].style.background = "#008000"
            row[i].style.color = "#FFFFFF"
        }

        else if(randomWord.includes(word[i])) {
            row[i].style.background = "#FFFF00"
        }

        else {
            row[i].style.background = "#808080"
            row[i].style.color = "#FFFFFF"
        }
    }

    if(word === randomWord) {
        feedback.textContent = "Congratulations! You guessed the word"
        submitButton.removeEventListener("click", handleSubmit)
    }

    inputField.value = ""

    if(clickCount < 5) clickCount++

    else {
        feedback.textContent = `Game over, the word was "${randomWord}"`
        submitButton.removeEventListener("click", handleSubmit)
    }
}

submitButton.addEventListener("click", handleSubmit)

inputContainer.appendChild(submitButton)