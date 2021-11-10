import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Table, Header, Loader, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import { Owners } from '../../api/owner/Owner';
import OwnerItem from '../components/OwnerItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListWaitlist extends React.Component {

  // update and assign queue for owners who are ready
  updateQueue = (ownerCollection) => {
    const listOfReadyOwners = [];

    // map collection to an array
    _.map(ownerCollection, function (anOwner) {
      if (anOwner.ownerConfirm === 'Ready') {
        listOfReadyOwners.push(anOwner);
      }
    });

    const length = listOfReadyOwners.length - 1; // set array length number for iteration

    // iterate through array of owners and assign queue numbers
    for (let i = 0; i <= length; i++) {
      listOfReadyOwners[i].queueNumber = i + 1;
      listOfReadyOwners[i].waitTime = i * 5;

    }

    // iterate through array of owners again and update collection
    for (let j = 0; j <= length; j++) {
      Owners.collection.update(listOfReadyOwners[j]._id, { $set: { queueNumber: listOfReadyOwners[j].queueNumber } });
      Owners.collection.update(listOfReadyOwners[j]._id, { $set: { waitTime: listOfReadyOwners[j].waitTime } });

    }

    return listOfReadyOwners;
  }

  // remove first from queue who are finished and update collection
  removeAndUpdate = (list) => {
    const listOfReadyOwners = list;

    Owners.collection.update(listOfReadyOwners[0]._id, { $set: { queueNumber: null } });
    Owners.collection.update(listOfReadyOwners[0]._id, { $set: { ownerConfirm: 'Not Ready' } });
    Owners.collection.update(listOfReadyOwners[0]._id, { $set: { waitTime: null } });
    listOfReadyOwners.shift();

    const length = listOfReadyOwners.length - 1;

    // iterate through array of owners and assign queue numbers
    for (let i = 0; i <= length; i++) {
      listOfReadyOwners[i].queueNumber = i + 1;
      listOfReadyOwners[i].waitTime = i * 5;

    }

    // iterate through array of owners again and update collection
    for (let j = 0; j <= length; j++) {
      Owners.collection.update(listOfReadyOwners[j]._id, { $set: { queueNumber: listOfReadyOwners[j].queueNumber } });
      Owners.collection.update(listOfReadyOwners[j]._id, { $set: { waitTime: listOfReadyOwners[j].waitTime } });

    }

    swal('Checked-out owner in Waitlist #1!', 'Updating Waitlist...', 'success');

    return listOfReadyOwners;

  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    this.updateQueue(this.props.owners);
    return (
      <div className="overall-background">
        <Container centered className="listWaitlistTable">
          <Header as="h2" textAlign="center" inverted>Waitlist Control Panel</Header>
          <Grid container centered verticalAlign='middle' textAlign='center'>
            <Grid.Column textAlign='center'>
              <Button primary onClick={() => this.removeAndUpdate(this.updateQueue(this.props.owners))}>Check-out owner</Button>
            </Grid.Column>
          </Grid>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Waitlist Number</Table.HeaderCell>
                <Table.HeaderCell>Microchip Code</Table.HeaderCell>
                <Table.HeaderCell>First Name</Table.HeaderCell>
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
