import './Dashboard.css';
import React, { useState, useEffect } from 'react';

function CustomButton(props) {
    const {label, onClick, data} = props;
    return (
        <button className="btn-secondary" onClick={() => onClick(data)}>
          {label}
        </button>
      );
}

function Dashboard() {
  const username = localStorage.getItem('profile');
  const [meals, setMeals] = useState([]);
  const [ids, setIds] = useState([]);

  // Fetch user data to get saved recipe IDs
  useEffect(() => {
      fetch('http://localhost:5005/users') // Replace with your backend URL
          .then(response => response.json())
          .then(data => {
              const user = data.find(user => user.username === username);
              if (user) {
                  setIds(user.saved_recipes);
              }
          });
  }, [username]);

  // Fetch meal details for saved recipes
  useEffect(() => {
      if (ids.length > 0) {
          fetch('http://localhost:5005/meals')
              .then(response => response.json())
              .then(data => {
                  const savedMeals = data.filter(meal => ids.includes(meal._id));
                  setMeals(savedMeals);
              });
      }
  }, [ids]);

  const unsaveRecipe = async (mealId) => {
      try {
          // Find user ID
          const userResponse = await fetch('http://localhost:5005/users');
          const users = await userResponse.json();
          const user = users.find(user => user.username === username);

          if (!user) {
              console.error('User not found');
              return;
          }

          // Make DELETE request
          const response = await fetch(`http://localhost:5005/users/${user._id}/recipes/${mealId}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (response.ok) {
              // Remove the recipe from local state
              setMeals(meals.filter(meal => meal._id !== mealId));
          } else {
              console.error('Failed to remove recipe');
          }
      } catch (error) {
          console.error('Error in unsaveRecipe:', error);
      }
  };

  const viewRecipe = (mealName) => {
      const meal = meals.find(meal => meal.name === mealName);
      if (meal && meal.source) {
          window.open(meal.source, '_blank').focus();
      }
  };

  return (
      <>  
        <div className='dashboard-heading'>
            <h1 className='h1'>{username}'s Dashboard</h1>
        </div> 
          <table class="min-w-full table-fixed border-collapse">
              <thead class="border-t">
                  <tr class="bg-gray-200">
                      <th class="px-4 py-2 text-left text-m font-semibold text-gray-700 w-1/3">Name</th>
                      <th class="px-4 py-2 text-left text-m font-semibold text-gray-700 w-1/3">Category</th>
                      <th class="px-4 py-2 text-left text-m font-semibold text-gray-700 w-1/3">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {meals.map((meal, index) => (
                      <tr class="border-t bg-gray-100" key={index}>
                          <td class="px-4 py-1 text-sm text-gray-800 w-1/3">{meal.name}</td>
                          <td class="px-4 py-1 text-sm text-gray-800 w-1/3">{meal.category}</td>
                          <td class="px-4 py-1 text-sm text-gray-800 flex space-x-2 w-1/3">
                            <CustomButton label="View" onClick={viewRecipe} data={meal.name} />
                            <CustomButton label="Unsave" onClick={() => unsaveRecipe(meal._id)} data={meal._id} />
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </>
  );
}

export default Dashboard;
