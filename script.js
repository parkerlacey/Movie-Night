// Store API key
const MOVIEAPIKEY = "b108d9a3c0d6c48286c15205953f2844"
const appID = "1297eab5"
const appKey = "f2967fdf6f16b52f8fa2713bd2a6f5de"

// Create objects
let movieObj = {}
let movieObjs = []
let storedMovieInput = localStorage.getItem("movieObjs")
if (storedMovieInput) {
  movieObjs = JSON.parse(storedMovieInput)
}

let recipeObj = {}
let recipeObjs = []
let storedRecipeInput = localStorage.getItem("recipeObjs")
if (storedRecipeInput) {
  recipeObjs = JSON.parse(storedRecipeInput)
}
// Get necessary elements from dom
let cuisineSearchEl = document.querySelector("#cuisineSearch")
let recipeOutputEl = document.querySelector("#recipeOutput")
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
  let randomIndex = Math.floor(Math.random() * 20)
  let recipeTitle = recipes["hits"][randomIndex]["recipe"]["label"]
  let recipeUrl = recipes["hits"][randomIndex]["recipe"]["shareAs"]
  let recipeImage = recipes["hits"][randomIndex]["recipe"]["image"]
  let recipeTime = recipes["hits"][randomIndex]["recipe"]["totalTime"]
  let recipeYield = recipes["hits"][randomIndex]["recipe"]["yield"]

  //picture of food from recipe
  let recipeImageEl = document.createElement("img")
  recipeImageEl.classList = ""
  recipeImageEl.setAttribute("src", recipeImage)
  recipeOutputEl.appendChild(recipeImageEl)

  //name of recipe, which is also a hyperlink
  let recipeEl = document.createElement("a")
  let recipeLinkText = document.createTextNode(recipeTitle)
  recipeEl.appendChild(recipeLinkText)
  recipeEl.href = recipeUrl
  recipeEl.classList = ""
  recipeEl.setAttribute("target", "blank")
  let tempDiv = document.createElement("div")
  tempDiv.appendChild(recipeEl)
  recipeOutputEl.appendChild(tempDiv)

  // Local storage
  recipeObj = {}
  recipeObj.title = recipeTitle
  recipeObj.link = recipeUrl

  // Limit to 5 recipes
  if (recipeObjs.length === 5) {
    recipeObjs.shift()
  }
  recipeObjs.push(recipeObj)

  let recipeObjs_stringified = JSON.stringify(recipeObjs)

  //"Ingredients" title created and append
  let ingredientsTitleEl = document.createElement("h2")
  ingredientsTitleEl.classList = ""
  ingredientsTitleEl.textContent = "Ingredients"
  recipeOutputEl.appendChild(ingredientsTitleEl)

  //create an unorderedlist for the ingredients
  let ingredientsEl = document.createElement("ul")
  ingredientsEl.setAttribute("id", "ingredientsList")
  let ingredientsLength =
    recipes["hits"][randomIndex]["recipe"]["ingredientLines"].length

  for (i = 0; i < ingredientsLength; i++) {
    let recipeIngredients =
      recipes["hits"][randomIndex]["recipe"]["ingredientLines"][i]
    let li = document.createElement("li")
    li.innerHTML = "• " + recipeIngredients
    li.setAttribute("style", "display:block;")
    ingredientsEl.appendChild(li)
  }
  recipeOutputEl.appendChild(ingredientsEl)

  //display and append yield and time
  let yieldTimeEl = document.createElement("div")
  yieldTimeEl.classList = "card-body text-center"
  yieldTimeEl.innerHTML =
    "<br><b>Yield: </b>" +
    recipeYield +
    "&emsp;" +
    "<b>Time: </b>" +
    recipeTime +
    " minutes<br><br>"
  recipeOutputEl.appendChild(yieldTimeEl)

  //favorite icon
  let pEl = document.createElement("p")
  let buttonEl = document.createElement("button")
  let spanEl = document.createElement("span")
  let iEl = document.createElement("i")
  pEl.classList = "buttons"
  buttonEl.classList = "button is-danger is-outlined"
  spanEl.classList = "icon is-small"
  iEl.classList = "fa-regular fa-heart"
  spanEl.appendChild(iEl)
  buttonEl.appendChild(spanEl)
  pEl.appendChild(buttonEl)

  recipeOutputEl.appendChild(pEl)
  buttonEl.addEventListener("click", () => {
    localStorage.setItem("recipeObjs", recipeObjs_stringified)
  })
}

function cuisineSearchSubmit(event) {
  event.preventDefault()
  let formatInputVal = document.querySelector("#cuisineType").value
  if (!formatInputVal) {
    let recipeDiv = document.querySelector("#recipeOutput")
    if (recipeDiv) {
      recipeDiv.remove()
      return
    }
  }
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
  if (!genreInput) {
    let movieDiv = document.querySelector("#movieOutput")
    if (movieDiv) {
      movieDiv.remove()
      return
    }
  }
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
        let tempDiv = document.createElement("div")
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
        let pEl = document.createElement("p")
        let buttonEl = document.createElement("button")
        let spanEl = document.createElement("span")
        let iEl = document.createElement("i")
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

                // Local storage
                movieObj = {}
                movieObj.title = selectedMovie.title
                movieObj.link = link

                // Limit to 5 movies
                if (movieObjs.length === 5) {
                  movieObjs.shift()
                }
                movieObjs.push(movieObj)

                let movieObjs_stringified = JSON.stringify(movieObjs)
                buttonEl.addEventListener("click", () => {
                  localStorage.setItem("movieObjs", movieObjs_stringified)
                })
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

// Modal toggle
$(document).ready(function () {
  $("#launchModal").click(function () {
    $(".modal").addClass("is-active")
  })
  $("#closebtn").click(function () {
    $(".modal").removeClass("is-active")
  })
})

// Show the favorite movie links on the modal
let showFavBtn = document.querySelector("#launchModal")
showFavBtn.addEventListener("click", () => {
  let favMovieDiv = document.querySelector("#fav-movie")
  favMovieDiv.innerHTML = ""
  storedMovieInput = localStorage.getItem("movieObjs")
  movieObjs = JSON.parse(storedMovieInput)
  for (let movie of movieObjs) {
    let movieLi = document.createElement("li")
    let favMovieEl = document.createElement("a")
    let favMovieLinkText = document.createTextNode(movie.title)
    favMovieEl.appendChild(favMovieLinkText)
    favMovieEl.title = movie.title
    favMovieEl.href = movie.link
    favMovieEl.classList = ""
    favMovieEl.setAttribute("target", "blank")
    movieLi.appendChild(favMovieEl)
    favMovieDiv.appendChild(movieLi)
  }
})

// Show the favorite recipe links on the modal
showFavBtn.addEventListener("click", () => {
  let favRecipeDiv = document.querySelector("#fav-recipe")
  favRecipeDiv.innerHTML = ""
  storedRecipeInput = localStorage.getItem("recipeObjs")
  recipeObjs = JSON.parse(storedRecipeInput)
  for (let recipe of recipeObjs) {
    let recipeLi = document.createElement("li")
    let favRecipeEl = document.createElement("a")
    let favRecipeLinkText = document.createTextNode(recipe.title)
    favRecipeEl.appendChild(favRecipeLinkText)
    favRecipeEl.title = recipe.title
    favRecipeEl.href = recipe.link
    favRecipeEl.classList = ""
    favRecipeEl.setAttribute("target", "blank")
    recipeLi.appendChild(favRecipeEl)
    favRecipeDiv.appendChild(recipeLi)
  }
})
