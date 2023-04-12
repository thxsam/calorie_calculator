

////#



const caloriesForm = document.getElementById('calories-form');
caloriesForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const gender = document.getElementById('gender').value;
  const age = parseInt(document.getElementById('age').value);
  const height = parseInt(document.getElementById('height').value);
  const weight = parseInt(document.getElementById('weight').value);
  const activityLevel = parseFloat(document.getElementById('activity-level').value);
  const strategy = document.getElementById('strategy-selector').value;

  let calories = 0;
  if (gender === 'male') {
    calories = Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5);
  } else {
    calories = Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161);
  }

  calories *= activityLevel;

  let protein = Math.round(weight * 2);
  let fat = Math.round(calories * 0.2 / 9);
  let carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);

  if (strategy === 'cutting') {
    calories = calories * 0.8;
    protein = Math.round(weight * 2);
    fat = Math.round(calories * 0.2 / 9);
    carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
  } else if (strategy === 'bulking') {
    calories = calories * 1.2;
    protein = Math.round(weight * 2.2);
    fat = Math.round(calories * 0.2 / 9);
    carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
  } else {
    protein = Math.round(weight * 2);
    fat = Math.round(calories * 0.2 / 9);
    carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
  }

  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th>Macronutriments</th>
      <th>Pourcentage</th>
      <th>Grammes</th>
      <th>kcal</th>
    </tr>
    <tr>
      <td>Protéines</td>
      <td>${Math.round(protein * 4 / calories * 100)}%</td>
      <td>${protein} g</td>
      <td>${protein * 4} kcal</td>
    </tr>
    <tr>
      <td>Glucides</td>
      <td>${Math.round(carbs * 4 / calories * 100)}%</td>
      <td>${carbs} g</td>
      <td>${carbs * 4} kcal</td>
    </tr>
    <tr>
      <td>Lipides</td>
      <td>${Math.round(fat * 9 / calories * 100)}%</td>
      <td>${fat} g</td>
      <td>${fat * 9} kcal</td>
    </tr>
  `;
  
  
  const result = document.getElementById('result');
  result.innerHTML = `Votre objectif calorique est de <strong>${calories.toFixed(0)} </strong> par jour. <br>Voici ci-dessous la répartition des macronutriments que vous devez suivre : <br>`;
  result.appendChild(table);
});
