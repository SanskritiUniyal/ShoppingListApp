import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import ItemModal from '../components/itemModal';
import ShoppingList from '../components/ShoppingList';

const ShoppingListPage = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col className="text-right">
          <h5 style={{ color: '#007bfc' }}>
            Welcome, <strong>{user?.name}</strong>
          </h5>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button
            color="info"
            href="https://github.com/SanskritiUniyal/ShoppingListApp"
            target="_blank"
          >
            Go to GitHub Repo
          </Button>
        </Col>
      </Row>
      <ItemModal />
      <ShoppingList />
    </Container>
  );
};

export default ShoppingListPage;
