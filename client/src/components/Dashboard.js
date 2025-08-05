import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import ItemModal from './itemModal';
import ShoppingList from './ShoppingList';
import { Button, Container } from 'reactstrap';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <h2>Welcome, {user?.name || 'User'}!</h2>

      {user && (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li><strong>ID:</strong> {user.id}</li>
          <li><strong>Name:</strong> {user.name}</li>
          <li><strong>Email:</strong> {user.email}</li>
        </ul>
      )}

      <Button color="danger" onClick={logoutHandler} className="mb-4">
        Logout
      </Button>

      <hr />
      <h4>Your Shopping List</h4>
      <ItemModal />
      <ShoppingList userId={user?.id} />
    </Container>
  );
};

export default Dashboard;
