import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Owners } from '../../api/owner/Owner'; import OwnerItem from '../components/OwnerItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListWaitlist extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className="overall-background">
        <Container>
          <Header as="h2" textAlign="center" className="inverted">Waitlist</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Microchip Code</Table.HeaderCell>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Waitlist Number</Table.HeaderCell>
                <Table.HeaderCell>Remove</Table.HeaderCell>
                <Table.HeaderCell>Delay</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.owners.map((owner) => <OwnerItem key={owner._id} owner={owner} />)}
            </Table.Body>
          </Table>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ListWaitlist.propTypes = {
  owners: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Owners.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const owners = Owners.collection.find({}).fetch();
  return {
    owners,
    ready,
  };
})(ListWaitlist);
