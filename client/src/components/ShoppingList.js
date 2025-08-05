import React, { Component, createRef } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../redux/actions/ItemActions';

class ShoppingList extends Component {
  nodeRefs = {};

  componentDidMount() {
    if (this.props.auth?.isAuthenticated) {
      this.props.getItems();
    }
  }

  getNodeRef = id => {
    if (!this.nodeRefs[id]) {
      this.nodeRefs[id] = createRef();
    }
    return this.nodeRefs[id];
  };

  render() {
    const { items } = this.props.item;
    const { isAuthenticated, user } = this.props.auth;

    if (!isAuthenticated) {
      return <Container><p>Please login to view your shopping list.</p></Container>;
    }

    if (!items || items.length === 0) {
      return <Container><p>{user?.name}, your shopping list is empty.</p></Container>;
    }

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={300} classNames="fade" nodeRef={this.getNodeRef(_id)}>
                <div ref={this.getNodeRef(_id)}>
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => this.props.deleteItem(_id)}
                    >
                      &times;
                    </Button>
                    {name}
                  </ListGroupItem>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
