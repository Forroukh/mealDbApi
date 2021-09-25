const searchFood = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    searchField.value = ''
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data.meals))


}

const searchResult = meals => {
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = '';
    meals.forEach(meal => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
    <div onClick ="mealDetails('${meal.idMeal}')" class="card h-50">
    <img   src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
    </div>
  </div>
    `;
    searchResult.appendChild(div)

    })
}

const mealDetails = mealId =>{
const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
fetch(url)
.then(res => res.json())
.then(data => displayMeal(data.meals[0]))
}

const displayMeal = data =>{
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = '';
    const ul = document.createElement('ul')
    
    ul.classList.add('list-group')
    ul.innerHTML=`
    <li class="list-group-item">Meal ID: ${data.idMeal}</li>
      <li class="list-group-item">Meal Name: ${data.strMeal}</li>
      <li class="list-group-item">Catagories : ${data.strCategory}</li>
    
    `
    
    detailsContainer.appendChild(ul)


}