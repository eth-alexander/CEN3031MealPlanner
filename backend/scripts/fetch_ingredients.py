# script to extract ingredients from meals.csv
import pandas as pd
import ast

def fetch_ingredients_from_csv(input_file, output_file):
    meals = pd.read_csv(input_file)
    ingredients = []
    
    for ingredient_list in meals['ingredients']:
        for ingredient in ast.literal_eval(ingredient_list):
            if ingredient.lower() not in ingredients:
                ingredients.append(ingredient.lower()) 
    
    df = pd.DataFrame(ingredients, columns = ['ingredient'])
    df.to_csv(output_file, index_label='id')
    print("Spreadsheet generated")

fetch_ingredients_from_csv('../data/meals.csv', '../data/ingredients.csv')
