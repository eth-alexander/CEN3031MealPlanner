import './Dashboard.css';

function Dashboard() {

    const username = localStorage.getItem('profile')
    return (
        <>
        <h1 className='Dashboard'>Dashboard</h1>
        Hi {username}!
        </>
    );
  };
  
  export default Dashboard;