import './Recipes.css';
import React, { useState, useEffect } from 'react';

const RecipesPage = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div>
            <h1>Recipes</h1>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecipesPage;
