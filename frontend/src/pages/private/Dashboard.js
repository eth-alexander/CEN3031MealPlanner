import React from 'react';

const Dashboard = () => {
    const username = localStorage.getItem('username'); // Retrieve the username

    return (
        <div>
            <h1>Welcome to CHOMP, {username}!</h1>
            {/* Add other dashboard content here */}
        </div>
    );
};

export default Dashboard;
