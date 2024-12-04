import './Recipes.css';
import React, { useState, useEffect } from 'react';

function CustomButton(props) {
    const {label, onClick, data} = props;
    return (
        <button onClick={() => onClick(data)}>
          {label}
        </button>
      );
}
const RecipesPage = () => {
    const username = localStorage.getItem('profile');

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    //filters
    const [filters, setFilters] = useState({});
    //const [save, setSave] = useState('');

    // Handle filter checkbox state change
    const handleFilterToggle = (category) => {
        setFilters(prevFilters => ({
          ...prevFilters,
          [category]: !prevFilters[category], // Toggle the checked state for this category
        }));
      };

    // Fetch meals when the component mounts
    useEffect(() => {
        fetch('http://localhost:5005/meals')  // Replace with your backend URL
            .then(response => response.json())
            .then(data => {
                setMeals(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching meals:", error);
                setLoading(false);
            });
    }, []);

    // create array of filters with associated boolean values
    useEffect(() => {
        const newFilters = {};
        meals.forEach((meal) => {
          if (!newFilters.hasOwnProperty(meal.category)) {
            newFilters[meal.category] = true; // default to checked
          }
        });
        setFilters(newFilters); // Set the filter state after meals are processed
      }, [meals]);

    //filteredMeals contains desired meals, filters_object is iterable array form of filteredMeals
    const filteredMeals = meals.filter(meal => filters[meal.category]);
    const filters_object = Object.entries(filters);

    if (loading) {
        return <div>Loading...</div>;
    }

    const saveRecipe = async (data) => { //add function
        let mealId = console.log(data);
        let userId = username;
        await fetch('http://localhost:5005/users', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((res) => {
              for (let i = 0; i < res.length; i++) {
                if (username === res[i].username) {
                  userId = res[i]._id;
                  console.log(userId);
                  break;
                }
              }
            });
        await fetch('http://localhost:5005/meals', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then((response) => response.json())
          .then((response) => {
            for (let i = 0; i < response.length; i++) {
              if (data === response[i].name) {
                mealId = response[i]._id;
                console.log(mealId);
                break;
              }
            }
          });
        
        let req = {userId, mealId,}
        console.log(JSON.stringify(req))
        console.log(userId)
       await fetch(`http://localhost:5005/users/${userId}/recipes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(req)
          }).then((res) => res.json());
    };

    const viewRecipe = async (data) => { //add function
 
        await fetch('http://localhost:5005/meals', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then((response) => response.json())
          .then((response) => {
            for (let i = 0; i < response.length; i++) {
              if (data === response[i].name) {
                window.open(response[i].source, '_blank').focus();
                break;
              }
            }
          });
    };
    
    return (
        <div>
            <div class='filters'>
                {filters_object.map(([key, value]) => (
                    <div class={'input-checkbox'}>
                        <input 
                            id={key}
                            value="yes"
                            checked={value}
                            type="checkbox" 
                            onChange={()=>handleFilterToggle(key)} 
                        />
                        <label for={key}> {key} </label>
                    </div>
                ))}
            </div>
            <h1>Recipes  </h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <div>
                        {filteredMeals.length > 0 ? (
                            filteredMeals.map((meal, index) => (
                                <tr key={index}>
                                    <td>{meal.name}</td>
                                    <td>{meal.category}</td> 
                                    //check recipes.css
                                    <div class = 'table'>
                                        <CustomButton label="view" onClick={viewRecipe} data={meal.name} />
                                        <CustomButton label="save" onClick={saveRecipe} data={meal.name} />
                                    </div>
                                    
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No meals found for the selected categories.</td>
                            </tr>
                        )}   
                    </div>
                </tbody>
            </table>
        </div>
    )
}


export default RecipesPage;
