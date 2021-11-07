import React, { Component } from 'react';
import { Button, Grid, Header, Image, Loader, Modal } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Owners } from '../../api/owner/Owner';
import { Pets } from '../../api/pet/Pets';
import { Stuffs } from '../../api/stuff/Stuffs';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class ConfirmCheckIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  numOfOwners = Stuffs.collection.find().count();

  alert() {
    setTimeout(() => { swal('Check-In Confirmed!', 'Adding you the queue...', 'success'); }, 10);
    Owners.collection.update(this.props.owner._id, { $set: { waitlistPos: this.numOfOwners, inWaitlist: true } });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Creating Your Profile</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    return (
      <Modal
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
        trigger={<Button inverted size="huge"> Check-In</Button>}
      >
        <Header icon='map' content='Confirm Check-In'/>
        <Modal.Content image>
          <Grid container doubling centered verticalAlign='middle' columns={2}>
            <Grid.Column textAlign='center'>
              <Image size='medium' src="/images/aaq-office.png" bordered/> {/* Possible Placeholder */}
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">
                  By clicking confirm, you indicate that you are in vicinity of our offices. You will then be put into a queue for when you will be able to sign out your pet. Otherwise, click cancel until you are near our offices.
              </Header>
            </Grid.Column>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Grid relaxed padded centered columns={1}>
            <Grid.Row textAlign="center">
              <Button negative size="huge" content="Wait"
                onClick={() => this.setState({ open: false })}/>
              <Button as={NavLink} activeClassName="active" exact to="/Queue" positive size="huge" content="Confirm Check-In"
                onClick={() => {
                  this.alert();
                }}
              />
            </Grid.Row>
          </Grid>
        </Modal.Actions>
      </Modal>
    );
  }
}

// Require an array of Recipes documents in the props.
ConfirmCheckIn.propTypes = {
  owner: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Recipes documents.
  const subscription = Meteor.subscribe(Owners.userPublicationName);
  const subscription2 = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Recipe that matches with the recipeID
  const owner = Owners.collection.findOne();
  return {
    ready,
    owner,
  };
})(ConfirmCheckIn);
