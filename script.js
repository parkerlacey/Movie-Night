
let genreInput

// Add an event listener to the random movie button
function handleRandomMovieBtn(event) {
  event.preventDefault()
  genreInput = document.querySelector("#genre-input").value
  console.log(genreInput)
  let errorMsg = document.querySelector("#alert")
  if (!genreInput) {
    errorMsg.textContent = "Please select a movie genre"
    return
  } else {
    errorMsg.textContent = ""
    fetchMovieApi(genreInput)
  }
}

// Fetch movie API function
function fetchMovieApi(genre) {
    // Store API key
    const APIKEY = "b108d9a3c0d6c48286c15205953f2844"
  
    // Store image Url
    const IMAGEURL = "https://image.tmdb.org/t/p/original"
  
    let page = getRandomInt(1, 501)
  
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&page=${page}&with_genres=${genre}`
    ).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data)
          // Get a random movie from the result
          let resultLength = data.results.length
          let randomNum = getRandomInt(0, resultLength)
          let selectedMovie = data.results[randomNum]
          console.log(selectedMovie)

//Get a random page
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }
  