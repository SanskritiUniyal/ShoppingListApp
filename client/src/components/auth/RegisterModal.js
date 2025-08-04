import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';

const RegisterModal = () => {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerUser(formData));
    toggle();
  };

  return (
    <>
      <Button color="secondary" onClick={toggle}>Register</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Name</Label>
              <Input name="name" onChange={handleChange} required />
              <Label>Email</Label>
              <Input type="email" name="email" onChange={handleChange} required />
              <Label>Password</Label>
              <Input type="password" name="password" onChange={handleChange} required />
              <Button color="dark" style={{ marginTop: '2rem' }}>Register</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default RegisterModal;
