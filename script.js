const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
})

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=ff171625&app_key=ff010fa568178d2bd58190c6e5592112&from=0&to=40`);
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div>
        `
    })
    resultsList.innerHTML = html;
}


// Select all recipe box elements
const recipeBoxes = document.querySelectorAll('.p-4');

// Attach click event listener to each recipe box
recipeBoxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    // Generate search value based on the recipe name
    const searchValue = box.querySelector('h2').innerText.trim();
    // Construct the URL with the tag element
    const requestURL = `https://api.edamam.com/search?q=${searchValue}&app_id=ff171625&app_key=ff010fa568178d2bd58190c6e5592112&from=0&to=40`;
    // Redirect to destination page with the search query as a parameter
    window.location.href = `destination_page.html?search=${encodeURIComponent(searchValue)}`;
  });
});
