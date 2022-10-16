let exhibitObj
let baseURL = `http://localhost:3000/current-exhibits`

const fetchExhibits = (baseURL) => {
    fetch(baseURL)
    .then(res => res.json())
    .then(exhibitArray => {
        renderExhibit(exhibitArray)[0]}) // added index of first element in case future exhibits are added.
}

fetchExhibits(baseURL)

const renderExhibit = (exhibitArray) => {
    exhibitArray.forEach(exhibit => updateDisplay(exhibit))
}


const updateDisplay = (exhibit) => {
    const exhibitTitle = document.getElementById('exhibit-title')
    const exhibitImage = document.getElementById('exhibit-image')
    const exhibitTickets = document.getElementById('tickets-bought')
    const exhibitDescription = document.getElementById('exhibit-description')
    const exhibitComments = document.getElementById('comments-section')
    const buyButton = document.getElementById('buy-tickets-button')

    exhibitTitle.textContent = exhibit.title
    exhibitImage.src = exhibit.image
    exhibitTickets.textContent = exhibit.tickets_bought
    exhibitDescription.textContent = exhibit.description
    
    commentsArray = exhibit.comments
    commentsArray.forEach(comment => {
        const userComment = document.createElement('p')
        userComment.textContent = comment
        exhibitComments.appendChild(userComment)
    })
    exhibitObj = exhibit

    buyButton.addEventListener('click', (e) => {
        exhibitObj.tickets_bought = exhibit.tickets_bought + 1
        exhibitTickets.textContent = exhibitObj.tickets_bought
        updateExhibit(`${baseURL}/${exhibitObj.id}`, "PATCH", {tickets_bought: exhibitObj.tickets_bought})
    })


}

const addCommentButton = document.getElementsByTagName('input')[1]
    addCommentButton.addEventListener('click', (e) => {
        e.preventDefault()
        const commentForm = document.getElementById('comment-form')
        const newCommentInput = document.getElementsByTagName('input')[0]
        const exhibitComments = document.getElementById('comments-section')
        const userComment = document.createElement('p')
        
        userComment.textContent = newCommentInput.value
        exhibitComments.appendChild(userComment)
        exhibitObj.comments.push(userComment.textContent)
        console.log(exhibitObj)
        updateExhibit(`${baseURL}/${exhibitObj.id}`, "PATCH", {comments: exhibitObj.comments})
        commentForm.reset()
    })





const updateExhibit = (url, verb, body ) => {
    const configurationObject = {
        method: verb,
        headers: {
            "Content-Type": "application/json",
            "Accept": "appliction/json"
        },
        body: JSON.stringify(body)
    }
    return fetch(url, configurationObject)
}



// {
//     "id": 1,
//     "title": "The Giraffe Wall",
//     "image":"./assets/current-exhibit.jpg",
//     "artist_name": "Evans",
//     "description": "A modern interpretation of our contemporary independence from expressionism as told through a surrealist dialogue between abstract cubism and rococo fauvism. The great artist Evans believed only the majestic Giraffe could help tell a story like this. Tickets start at $9.99 (free for children below 21).",
//     "tickets_bought": 0,
//     "comments": [
//       "I don't know what this is...",
//       "What in the heckin' heck?",
//       "I like giraffes...",
//       "This is a great museum and I was not paid to write this comment...",
//       "OMG A COMMENT SECTION!",
//       "Have you seen giraffe tongues? Like, ew.",
//       "Did you know giraffe's are the tallest mammals on earth?",
//       "A giraffe's horns are called ossicones",
//       "I still like giraffes..."
//     ]





/*
    Challenge 1:
     - Display details of first exhibit on page load - complete

    Challenge 2:
        - New comments get added as a <p> element - complete

    Challenge 3:
        - Increment tickets bought total - complete

    Bonus 1:
        - PATCH Challenge 3 - complete

    Bonus 2:
        - PATCH Challenge 2 - complete

    


*/