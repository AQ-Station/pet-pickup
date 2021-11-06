import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Pet from '../components/Pet';
import { Pets } from '../../api/pet/Pets';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class PetRoster extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className='snatch-background'>
        <Container>
          <Container>
            <Header as="h2" textAlign="center" inverted>Roster</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>UH Email</Table.HeaderCell>
                  <Table.HeaderCell>Phone Number</Table.HeaderCell>
                  <Table.HeaderCell>Microchip Code</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.pets.map((pet) => <Pet key={pet._id} volunteer={pet}/>)}
              </Table.Body>
            </Table>
          </Container>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
PetRoster.propTypes = {
  pet: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Pets.adminPublicationName);
  const ready = subscription.ready();
  const pets = Pets.collection.find({}).fetch();
  return {
    pets,
    ready,
  };
})(PetRoster);
