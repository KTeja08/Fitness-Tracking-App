import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ActivityForm from './Components/Form/ActivityForm';
import ActivityList from './Components/List/ActivityList';
import { getActivities } from './Components/Services/ActivityService';
import Sidebar from './Components/Sidebar/Sidebar';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home';
import About from './Components/About';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import WorkoutForm from './Components/Form/WorkoutForm';
import WorkoutList from './Components/List/WorkoutList';
import { getWorkouts } from './Components/Services/WorkoutService';
import GoalForm from './Components/Form/GoalForm';
import GoalList from './Components/List/GoalList';
import Footer from './Components/Footer/Footer';
import BarChart from './Components/Chart/BarChart';
import UserLogin from './Components/LoginRegistration/UserLogin';
import SignupForm from './Components/LoginRegistration/SignupForm';
import ForgetPasswordForm from './Components/LoginRegistration/ForgotPasswordForm';
import ResetPasswordForm from './Components/LoginRegistration/ResetPasswordForm';
import UsersList from './Components/LoginRegistration/UserList';

const { Content } = Layout;

const App = () => {
  const [activities, setActivities] = React.useState([]);
  const [workouts, setWorkouts] = React.useState([]);
  const [updateFlag, setUpdateFlag] = React.useState(false);
  const [loadingActivities, setLoadingActivities] = React.useState(true);
  const [loadingWorkouts, setLoadingWorkouts] = React.useState(true);
  
  // Example user state. Replace this with actual user state logic
  const [user, setUser] = React.useState(null); // Initially no user logged in

  // Fetch user data or set it based on your authentication logic
  React.useEffect(() => {
    // Simulate fetching user data (replace with actual logic)
    const loggedInUser = { id: 1, fullName: "John Doe", email: "john@example.com" }; // Simulated user
    setUser(loggedInUser); // Set the user state
  }, []);

  React.useEffect(() => {
    fetchActivities();
    fetchWorkouts();  
  }, []);

  const fetchActivities = () => {
    setLoadingActivities(true);
    getActivities()
      .then(response => setActivities(response.data))
      .catch(error => console.error("Error fetching activities:", error))
      .finally(() => setLoadingActivities(false));
  };

  const fetchWorkouts = async () => {
    setLoadingWorkouts(true);
    try {
      const data = await getWorkouts();
      console.log('Fetched workouts:', data); 
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoadingWorkouts(false);
    }
  };

  const handleActivityAdded = (newActivity) => {
    setActivities(prevActivities => [...prevActivities, newActivity]);
  };

  const handleWorkoutAdded = (newWorkout) => {
    setWorkouts(prevWorkouts => [...prevWorkouts, newWorkout]);
  };

  const handleGoalUpdated = () => {
    setUpdateFlag(prev => !prev); 
  };

  return (
    <Router>
      <Navbar user={user} />
      <ToastContainer />
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar userName={user ? user.fullName : "Guest"} />
        <Layout style={{ marginLeft: 200 }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<UsersList />} />
                <Route path="/about" element={<><h1 className="boxed-heading">About FitNessTrack</h1><About /></>} />
                <Route path="/dashboard" element={<><h1 className="boxed-heading">Dashboard</h1><Dashboard /><BarChart/></>} />
                <Route path="/workout" element={
                  <>
                    <h1 className="boxed-heading">Workout</h1>
                    {loadingWorkouts ? <p>Loading...</p> : <WorkoutForm onWorkoutAdded={handleWorkoutAdded} />}
                    {loadingWorkouts ? <p>Loading...</p> : <WorkoutList workouts={workouts} />}
                  </>
                } />
                <Route path="/activity" element={
                  <>
                    <h1 className="boxed-heading">Activity</h1>
                    {loadingActivities ? <p>Loading...</p> : <ActivityForm onActivityAdded={handleActivityAdded} />}
                    {loadingActivities ? <p>Loading...</p> : <ActivityList activities={activities} />}
                  </>
                } />
                <Route path="/goal" element={
                  <>
                    <h1 className="boxed-heading">Goal</h1>
                    <GoalForm onGoalUpdated={handleGoalUpdated} />
                    <GoalList onGoalUpdated={updateFlag} />
                  </>
                } />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/register" element={<SignupForm />} />
                <Route path="/forget-password" element={<ForgetPasswordForm />} />
                <Route path="/reset-password" element={<ResetPasswordForm />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Router>
  );
};

export default App;
