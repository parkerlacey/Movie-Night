// Store API key
const MOVIEAPIKEY = "b108d9a3c0d6c48286c15205953f2844"
const appID = "1297eab5"
const appKey = "f2967fdf6f16b52f8fa2713bd2a6f5de"

// Get necessary elements from dom
var cuisineSearchEl = document.querySelector("#cuisineSearch")
var recipeOutputEl = document.querySelector("#recipeOutput")
let generateBtnEl = document.querySelector("#generateBtn")

// Fetch recipe api function
const getRecipeApi = (cuisine) => {
  const urlRecipe =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    cuisine +
    "&app_id=" +
    appID +
    "&app_key=" +
    appKey +
    "&mealType=Dinner&dishType=Main%20course&imageSize=REGULAR&random=true&cuisineType=" +
    cuisine
  fetch(urlRecipe).then(function (response) {
    response.json().then(function (data) {
      recipeDisplay(data, cuisine)
    })
  })
}

//Displays data returned from the recipe API
function recipeDisplay(recipes, recipeInput) {
  recipeOutputEl.textContent = ""
  recipeOutputEl.classList.add("card", "column")
  var randomIndex = Math.floor(Math.random() * 20)
  var recipeTitle = recipes["hits"][randomIndex]["recipe"]["label"]
  var recipeUrl = recipes["hits"][randomIndex]["recipe"]["shareAs"]
  var recipeImage = recipes["hits"][randomIndex]["recipe"]["image"]
  var recipeTime = recipes["hits"][randomIndex]["recipe"]["totalTime"]
  var recipeYield = recipes["hits"][randomIndex]["recipe"]["yield"]

  //picture of food from recipe
  var recipeImageEl = document.createElement("img")
  recipeImageEl.classList = ""
  recipeImageEl.setAttribute("src", recipeImage)
  recipeOutputEl.appendChild(recipeImageEl)

  //name of recipe, which is also a hyperlink
  var recipeEl = document.createElement("a")
  var recipeLinkText = document.createTextNode(recipeTitle)
  recipeEl.appendChild(recipeLinkText)
  recipeEl.href = recipeUrl
  recipeEl.classList = ""
  recipeEl.setAttribute("target", "blank")
  var tempDiv = document.createElement("div")
  tempDiv.appendChild(recipeEl)
  recipeOutputEl.appendChild(tempDiv)

  //"Ingredients" title created and append
  var ingredientsTitleEl = document.createElement("h2")
  ingredientsTitleEl.classList = ""
  ingredientsTitleEl.textContent = "Ingredients"
  recipeOutputEl.appendChild(ingredientsTitleEl)

  //create an unorderedlist for the ingredients
  var ingredientsEl = document.createElement("ul")
  ingredientsEl.setAttribute("id", "ingredientsList")
  var ingredientsLength =
    recipes["hits"][randomIndex]["recipe"]["ingredientLines"].length

  for (i = 0; i < ingredientsLength; i++) {
    var recipeIngredients =
      recipes["hits"][randomIndex]["recipe"]["ingredientLines"][i]
    var li = document.createElement("li")
    li.innerHTML = "• "+recipeIngredients
    li.setAttribute("style", "display:block;")
    ingredientsEl.appendChild(li)
  }
  recipeOutputEl.appendChild(ingredientsEl)

    //display and append yield and time
var yieldTimeEl = document.createElement("div")
yieldTimeEl.classList = "card-body text-center"
yieldTimeEl.innerHTML = "<br><b>Yield: </b>"+recipeYield+"&emsp;"+"<b>Time: </b>"+recipeTime+" minutes<br><br>"
recipeOutputEl.appendChild(yieldTimeEl)

//favorite icon
var pEl = document.createElement("p")
var buttonEl = document.createElement("button")
var spanEl = document.createElement("span")
var iEl = document.createElement("i")
pEl.classList = "buttons"
buttonEl.classList = "button is-danger is-outlined"
spanEl.classList = "icon is-small"
iEl.classList = "fa-regular fa-heart"
spanEl.appendChild(iEl)
buttonEl.appendChild(spanEl)
pEl.appendChild(buttonEl)

recipeOutputEl.appendChild(pEl)

}

function cuisineSearchSubmit(event) {
  event.preventDefault()
  var formatInputVal = document.querySelector("#cuisineType").value
  getRecipeApi(formatInputVal)
}

cuisineSearchEl.addEventListener("submit", cuisineSearchSubmit)

// Add event listener to the generate suggestion button
generateBtnEl.addEventListener("click", callAPIs)

// Random movie function
let genreInput
function handleRandomMovieBtn(event) {
  event.preventDefault()
  genreInput = document.querySelector("#genre-input").value
  fetchMovieApi(genreInput)
}

// Fetch movie API function
function fetchMovieApi(genre) {
  // Store image Url
  const IMAGEURL = "https://image.tmdb.org/t/p/original"

  let page = getRandomInt(1, 501)

  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIEAPIKEY}&language=en-US&page=${page}&with_genres=${genre}`
  ).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        // Get a random movie from the result
        let resultLength = data.results.length
        let randomNum = getRandomInt(0, resultLength)
        let selectedMovie = data.results[randomNum]

        // Movie Output div
        let movieOutputEl = document.querySelector("#movieOutput")
        movieOutputEl.classList.add("card", "column")
        movieOutputEl.innerHTML = ""

        // Create image div
        let imgEl = document.createElement("img")
        movieOutputEl.appendChild(imgEl)
        imgEl.src = IMAGEURL + selectedMovie.poster_path
        var tempDiv = document.createElement("div")
        movieOutputEl.appendChild(tempDiv)

        // Create an overview div
        let overviewEl = document.createElement("h3")
        movieOutputEl.appendChild(overviewEl)
        overviewEl.innerHTML = "<b>Overview:</b> " + selectedMovie.overview

        // Create rating div
        let ratingEl = document.createElement("h3")
        movieOutputEl.appendChild(ratingEl)
        ratingEl.innerHTML =
          "<b>Rating:</b> " + selectedMovie.vote_average + "/10<br><br>"

        //favorite icon
          var pEl = document.createElement("p")
          var buttonEl = document.createElement("button")
          var spanEl = document.createElement("span")
          var iEl = document.createElement("i")
          pEl.classList = "buttons"
          buttonEl.classList = "button is-danger is-outlined"
          spanEl.classList = "icon is-small"
          iEl.classList = "fa-regular fa-heart"
          spanEl.appendChild(iEl)
          buttonEl.appendChild(spanEl)
          pEl.appendChild(buttonEl)
          
          movieOutputEl.appendChild(pEl)

        // Fetch api for link to watch movie
        fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovie.id}/watch/providers?api_key=${MOVIEAPIKEY}`
        ).then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              if (data.results) {
                let link = Object.values(data.results)[0].link.slice(0, -10)
                let movieEl = document.createElement("a")
                let movieLinkText = document.createTextNode(selectedMovie.title)
                movieEl.appendChild(movieLinkText)
                movieEl.title = selectedMovie.title
                movieEl.href = link
                movieEl.classList = ""
                movieEl.setAttribute("target", "blank")
                tempDiv.appendChild(movieEl)
              }
            })
          }
        })
      })
    }
  })
}

function callAPIs(e) {
  handleRandomMovieBtn(e)
  cuisineSearchSubmit(e)
}

//Get a random page
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

let suggestionCard = document.querySelector(".suggestion-card")
