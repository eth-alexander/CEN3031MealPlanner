# script to create csv file of 100 random recipes from MealDB
import requests
import pandas as pd
import ast

# fetch random meal using MealDB API
def fetch_random_ingredient():
    url = "https://www.themealdb.com/api/json/v1/1/random.php"
    response = requests.get(url)
    if response.status_code == 200:
        ingredient_data = response.json()['meals']
        
        if ingredient_data:
            ingredient = ingredient_data[0]
            # Extract the ingredients list
            
            
            # Return both the ingredients list and its count
            return {
                'ingredients': [ingredient[f'strIngredient{i}'] for i in range(1, 21) if ingredient[f'strIngredient{i}']],
            }
        else:
            print("Error: Recipe fetch failed")
            return None
        
    else:
        print("Error: Call to MealDB failed")
        return None
        
def generate_spreadsheet(filename):
    ingredients = []
    
    for _ in range(100):
        ingredient_set = fetch_random_ingredient()
        
        if ingredient_set:
            ingredients.append(ingredient_set)

    empty_set = set()

    for item in ingredients:
        for key, value in item.items():
            for val in value:
                empty_set.add(val)

    
    df = pd.DataFrame(empty_set)
    df.to_csv(filename, index_label='id')
    print("Spreadsheet generated")

generate_spreadsheet('../data/ingredients.csv')
