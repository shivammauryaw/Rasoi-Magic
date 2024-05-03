const resultsList = document.getElementById('results');

async function searchRecipes() {
  const searchValue = "paratha"; // Always search for "paneer"
  
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
    `;
  });
  resultsList.innerHTML = html;
}

// Call the searchRecipes function when the page loads
window.onload = searchRecipes;
