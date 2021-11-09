import React from 'react';
import { Button, Container, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Owners } from '../../api/owner/Owner';

/** Useless page - queue functionality will be transferred to another page. */
class QueueCheckAdmin extends React.Component {

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
    }

    // iterate through array of owners again and update collection
    for (let j = 0; j <= length; j++) {
      Owners.collection.update(listOfReadyOwners[j]._id, { $set: { queueNumber: listOfReadyOwners[j].queueNumber } });
    }

    return listOfReadyOwners;
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    this.updateQueue(this.props.owners);
    return (
      <Container>
        <Button onClick={() => this.updateQueue(this.props.owners)}/>
      </Container>
    );
  }
}

QueueCheckAdmin.propTypes = {
  owners: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Pets and Owners documents.
  const subscription = Meteor.subscribe(Owners.adminPublicationName);
  const ready = subscription.ready();
  const owners = Owners.collection.find({}).fetch();
  return {
    owners,
    ready,
  };
})(QueueCheckAdmin);