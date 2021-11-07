import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Owners } from '../../api/owner/Owner';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class QueueCheckAdmin extends React.Component {
  updateQueue = (ownerCollection) => {
    const listOfReadyOwners = [];

    _.map(ownerCollection, function (anOwner) { if (anOwner.ownerConfirm === 'Ready') { listOfReadyOwners.push(anOwner); } });

    /*    _.map(ownerCollection, function (anOwner) {
      queueNumber += 1;
      Owners.collection.update(anOwner._id, { $set: queueNumber });
    });

    for (let queueNumber = 0; queueNumber <= listOfReadyOwners.length; queueNumber++) {
      Owners.collection.update(this.props.owners.listOfReadyOwners[queueNumber]._id, { $set: queueNumber });
    }
    */

    /*    for (let i = 0; i <= listOfReadyOwners.length; i++) {
      console.log(listOfReadyOwners[i].email);
      // Owners.collection.update(listOfReadyOwners[i]['_id']);
    } */

    console.log(listOfReadyOwners);

    /*    for (let i = 0; i <= listOfReadyOwners.length; i++) {
      // eslint-disable-next-line no-param-reassign
      _.map(ownerCollection, function (anOwner) { anOwner.queueNumber = i++; });
    }
    queue = _.map(ownerCollection, function (anOwner) { return anOwner.queueNumber; });
    queue.sort(function (a, b) {
      return a - b;
    });
    for (let i )
    for (let i = 1; i <= queue.length; i++) {
      if (!queue[i - 1]) {
        queue[i]--;
        queue[i - 1] = queue[i];
      }
    }
    _.map(ownerCollection, function (anOwner) { return anOwner.queueNumber.update(); }); */

  }

  render() {
    this.updateQueue(this.props.owners);
    return (
      <Container>
        <Button onClick={this.updateQueue(this.props.owners)}/>
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
