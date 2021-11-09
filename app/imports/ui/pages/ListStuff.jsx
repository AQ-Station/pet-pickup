import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { Pets } from '../../api/pet/Pets';
import { Owners } from '../../api/owner/Owner';
import Pet from '../components/Pet';
import OwnerItem from '../components/OwnerItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStuff extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Stuff</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Condition</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              {this.props.pets.map((pet) => <Pet key={pet._id} pet={pet} />)}
              {this.props.owners.map((owner) => <OwnerItem key={owner._id} owner={owner} />)}
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListStuff.propTypes = {
  pets: PropTypes.array.isRequired,
  owners: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Pets.userPublicationName);
  const subscription2 = Meteor.subscribe(Owners.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const pets = Pets.collection.find({}).fetch();
  const owners = Owners.collection.find({}).fetch();
  return {
    pets,
    owners,
    ready,
  };
})(ListStuff);
