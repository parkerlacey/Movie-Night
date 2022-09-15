
const appID="1297eab5";
const appKey="f2967fdf6f16b52f8fa2713bd2a6f5de";
var cuisineSearchEl = document.querySelector('#cuisineSearch');
var recipeOutputEl = document.querySelector("#recipeOutput");

const getRecipeApi=(cuisine)=> {
    const urlRecipe="https://api.edamam.com/api/recipes/v2?type=public&q="+cuisine+"&app_id="+appID+"&app_key="+appKey+"&mealType=Dinner&dishType=Main%20course&imageSize=REGULAR&random=true&cuisineType="+cuisine;
    fetch (urlRecipe)
        .then(function (response) {
            response.json()
            .then(function(data){
                recipeDisplay(data, cuisine);
            })
        })
}

function recipeDisplay(recipes, recipeInput) {
    recipeOutputEl.textContent="";
    // console.log(recipes);
    // console.log(recipeInput);
    var randomIndex=Math.floor(Math.random()*20);
    var recipeTitle=recipes["hits"][randomIndex]["recipe"]["label"];
    var recipeUrl=recipes["hits"][randomIndex]["recipe"]["shareAs"];
    var recipeImage=recipes["hits"][randomIndex]["recipe"]["image"];

    var recipeEl=document.createElement("a");
    var recipeLinkText = document.createTextNode(recipeTitle);
    recipeEl.appendChild(recipeLinkText);
    recipeEl.title = "test";
    recipeEl.href = (recipeUrl);
    recipeEl.classList="card bbg-primary text-light text-center m-8";
    recipeEl.setAttribute("target", "blank");
    recipeOutputEl.appendChild(recipeEl);

    var recipeImageEl=document.createElement("img");
    recipeImageEl.classList="card-body text-center";
    recipeImageEl.setAttribute("src", recipeImage);
    recipeOutputEl.appendChild(recipeImageEl);

    // var recipeTitleEl=document.createElement("a");
    // recipeTitleEl.textContent=recipeTitle;
    // recipeTitleEl.classList="card-header text-center";
    // recipeEl.appendChild(recipeTitleEl);

    // var recipeUrlEl=document.createElement("a");



    // console.log(recipeTitle);
    // console.log(recipeUrl);
    // console.log(randomIndex);
}

function cuisineSearchSubmit(event) {
    event.preventDefault();
    var formatInputVal = document.querySelector('#cuisineType').value;
    // console.log(formatInputVal);
    getRecipeApi (formatInputVal);
  }
  
  cuisineSearchEl.addEventListener('submit', cuisineSearchSubmit);



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
  