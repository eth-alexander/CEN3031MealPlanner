# script to create csv file of 100 random recipes from MealDB

import requests
import pandas as pd


# fetch random meal using MealDB API
def fetch_random_meal():
    url = "https://www.themealdb.com/api/json/v1/1/random.php"
    response = requests.get(url)
    if response.status_code == 200:
        meal_data = response.json()['meals']
        
        if meal_data:
            meal = meal_data[0]
            return {
                'MealDBid': meal['idMeal'],
                'name': meal['strMeal'],
                'category': meal['strCategory'],
                'area': meal['strArea'],
                'recipe': meal['strInstructions'],
                'ingredients': [meal[f'strIngredient{i}'] for i in range(1, 21) if meal[f'strIngredient{i}']],
                'measurements': [meal[f'strMeasure{i}'] for i in range(1, 21) if meal[f'strMeasure{i}']],
                'image': meal['strMealThumb'],
                'source': meal['strSource']
            }
        else:
            print("Error: Recipe fetch failed")
            return None
        
    else:
        print("Error: Call to MealDB failed")
        return None
        
def generate_spreadsheet(filename, num_recipes):
    recipes = []
    for _ in range(num_recipes):
        meal = fetch_random_meal()
        if meal:
            recipes.append(meal)
            
    df = pd.DataFrame(recipes)
    df.to_csv(filename, index_label='id')
    print("Spreadsheet generated")

generate_spreadsheet('../data/meals.csv', 100)

""" 
idMeal: id
strMeal: name
strDrinkAlternate:
strCategory: 
strArea:
strInstructions: recipe
strMealThumb:
strTags:
strYoutube:
strIngredient1: name of ingredient 1 (20 ingredients total)
strMeasure1: measurement of ingredient 1 (20 ingredients total)
strSource: recipe url
strImageSource:
strCreativeCommonsConfirmed:
dateModified:
"""