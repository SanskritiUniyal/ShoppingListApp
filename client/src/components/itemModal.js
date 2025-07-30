import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/ItemActions';

class ItemModal extends Component {
  state = {
    modal: false,
    selectedItem: '',
    customItem: ''
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      selectedItem: '',
      customItem: ''
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log('Form submitted');

    const name = this.state.customItem || this.state.selectedItem;
    if (!name.trim()) {
      console.log('No item name provided.');
      return;
    }

    this.props.addItem({ name: name.trim() });
    this.toggle();
  };

  render() {
    const { items } = this.props.item;

    return (
      <div>
        <Button color="dark" onClick={this.toggle}>
          Add Item
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="item-select">Choose</Label>
                <Input
                  type="select"
                  value={this.state.selectedItem}
                  onChange={e => this.setState({ selectedItem: e.target.value })}
                >
                  <option value="">-- Select --</option>
                  {items.map(({ _id, name }) => (
                    <option key={_id} value={name}>{name}</option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="customItem">Or Type</Label>
                <Input
                  type="text"
                  value={this.state.customItem}
                  onChange={e => this.setState({ customItem: e.target.value })}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      this.onSubmit(e);
                    }
                  }}
                />
              </FormGroup>

              <Button
                color="dark"
                block
                onClick={this.onSubmit} // ✅ Explicitly wired to trigger submission
                disabled={!this.state.selectedItem && !this.state.customItem.trim()}
              >
                Add Item
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal);

