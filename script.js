
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



