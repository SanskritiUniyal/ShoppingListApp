import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name || 'User'}!</h1>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default Dashboard;
