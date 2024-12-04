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
    //const [save, setSave] = useState('');

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
            <h1>Recipes  </h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.map((meal, index) => (
                        <tr key={index}>
                            <td>{meal.name}</td>
                            <td>{meal.category}</td>
                            <CustomButton label="view" onClick={viewRecipe} data={meal.name} />
                            <CustomButton label="save" onClick={saveRecipe} data={meal.name} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default RecipesPage;
