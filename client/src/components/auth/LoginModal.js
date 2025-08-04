import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions'; // Update path if needed

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setModal(false); // Close modal on login
  };

  return (
    <>
      <Button color="dark" onClick={toggle}>Login</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Welcome back!</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="mt-2">
                <Input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />{' '}
                Show password
              </div>
            </FormGroup>

            <Button color="primary" block>Login</Button>

            <div className="mt-3 text-center">
              Don’t have an account? <Link to="/register">Sign up</Link>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LoginModal;
