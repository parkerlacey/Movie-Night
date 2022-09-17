// Store API key
const MOVIEAPIKEY = "b108d9a3c0d6c48286c15205953f2844"
const appID = "1297eab5"
const appKey = "f2967fdf6f16b52f8fa2713bd2a6f5de"

let movieObj = {}
let movieObjs = []
let recipeObj = {}
let recipeObjs = []

// Get necessary elements from dom
var cuisineSearchEl = document.querySelector("#cuisineSearch")
var recipeOutputEl = document.querySelector("#recipeOutput")
let generateBtnEl = document.querySelector("#generateBtn")
var favoriteResContainer = document.querySelector(".recipeFav")
let recipeFavorites = [];
let movieFavorites = [];

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

  recipeObj.title = recipeTitle
  recipeObj.link = recipeUrl
  let recipeObj_stringified = JSON.stringify(recipeObj)

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
    li.innerHTML = "• " + recipeIngredients
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
var pResEl = document.createElement("p")
var buttonResEl = document.createElement("button")
var spanResEl = document.createElement("span")
var iResEl = document.createElement("i")
pResEl.classList = "buttons"
buttonResEl.classList = "button recipeFav is-danger is-responsive is-outlined"
spanResEl.classList = "icon is-small"
iResEl.classList = "fa-regular fa-heart"
spanResEl.appendChild(iResEl)
buttonResEl.appendChild(spanResEl)
pResEl.appendChild(buttonResEl)

recipeOutputEl.appendChild(pResEl)

// favoriteResContainer.addEventListener("click", (event)=>{
//   event.preventDefault()
//   var 
// })


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
          buttonEl.classList = "button movieFav is-danger is-responsive is-outlined"
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
                movieObj.title = selectedMovie.title
                movieObj.link = link
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

//stores favorite recipe 
var recipeStor = (favorite)=> {
  if (!recipeFavorites.includes(favorite)){
    recipeFavorites.push(favorite)
    localStorage.setItem("Favorites", JSON.stringify(recipeFavorites))
    var btn=document.createElement("button")
    btn.setAttribute("class", "button")
    btn.setAttribute("value", favorite)
    btn.textContent=favorite
    favoriteContainer.append(btn)
  }
  allFavorites=JSON.parse(localStorage.getItem("history"))|| []
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


// Function to fetch link to watch movie
function fetchMovieLink(movieId) {}


$(document).ready(function(){
  // $(".modal").addClass("is-active");

$("#lanuchModal").click(function() {
$(".modal").addClass("is-active");  
});

// $(".modal-close").click(function() {
//  $(".modal").removeClass("is-active");
// });

$("#closebtn").click(function() {
 $(".modal").removeClass("is-active");
});
// $("#closetop").click(function() {
//  $(".modal").removeClass("is-active");
// });
});


