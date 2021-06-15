const searchInput = () => {
  searchApi();
};

const searchApi = () => {
  const searchQuery = document.getElementById("search").value;
  // console.log(searchQuery);
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
    .then((res) => res.json())
    .then((data) => {
      generateHtml(data);
    });
};

const generateHtml = (results) => {
  let generatedHtml = "";
  const mealList = results.meals;
  console.log(mealList);
  if (mealList != null) {
    mealList.map((result) => {
      generatedHtml += `
                <div class="single-card" id="${result.idMeal}" onclick="singleMealApi(this.id)">
                    <img src="${result.strMealThumb}" alt="" />
                    <h2>${result.strMeal}</h2>
                </div>
            `;
    });
  } else {
    generatedHtml += `
    <div class="not-found-area">
      <h2>Recipe not found</h2>
    </div>
`;
  }

  document.getElementById("recipe-area").innerHTML = generatedHtml;
};

const singleMealInfo = (mealData) => {
  const singleMeal = mealData.meals[0];
  let singleMealItem = `
          <div class="single-meal">
          <img
            src="${singleMeal.strMealThumb}"
            alt=""
          />
          <div class="single-meal-content">
            <h2>${singleMeal.strMeal}</h2>
            <h3>Ingredients</h3>
            <ul>
              <li><img src="icon.svg"/>${singleMeal.strMeasure1} ${singleMeal.strIngredient1}</li>
              <li><img src="icon.svg"/>${singleMeal.strMeasure2} ${singleMeal.strIngredient2}</li>
              <li><img src="icon.svg"/>${singleMeal.strMeasure3} ${singleMeal.strIngredient3}</li>
              <li><img src="icon.svg"/>${singleMeal.strMeasure4} ${singleMeal.strIngredient4}</li>
              <li><img src="icon.svg"/>${singleMeal.strMeasure5} ${singleMeal.strIngredient5}</li>
              <li><img src="icon.svg"/>${singleMeal.strMeasure6} ${singleMeal.strIngredient6}</li>
            </ul>
          </div>
        </div>
  `;

  document.getElementById("single-meal").innerHTML = singleMealItem;
};

const singleMealApi = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      singleMealInfo(data);
    });
};
