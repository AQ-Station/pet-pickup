import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Icon, Container, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Owners } from '../../api/owner/Owner';
import { Pets } from '../../api/pet/Pets';
import ConfirmCheckIn from '../components/ConfirmCheckIn';
import { Stuffs } from '../../api/stuff/Stuffs';

class UserPage extends React.Component {

  doesCodeExist = (currentValue) => Pets.collection.find({ microchipCode: currentValue }).count() > 0;

  numOfOwners = Stuffs.collection.find().count();

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Creating Your Profile</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    return ((this.props.owner.microchipCode.every(this.doesCodeExist)) ? (
      <Grid container centered verticalAlign='middle' textAlign='center' columns={1} row={3} className='blue-background-body'>
        <Grid.Column textAlign='center'>
          {this.props.owner.lastName}
          <Icon inverted color='green' name='check circle' size='massive'/>
          <Header as='h1' inverted className='center-text'>Your pet is ready!</Header>
          <div className='confirm-message'>
            <ConfirmCheckIn/>
          </div>
        </Grid.Column>

      </Grid>
    ) : (
      <Container mobile={16} tablet={10} computer={10}>
        <div className = 'notReady-background' >
          <div className = 'notReady-background-container'>
            <Grid centered columns={2}>
              {this.props.owner.lastName}
              <Grid.Column textAlign='center'>
                <Header inverted size='huge' >Your pet is not ready for pick up!</Header>
                <Button> Refresh </Button>
              </Grid.Column>
            </Grid>
          </div>
        </div>
      </Container>
    )
    );
  }
}

// Require an array of Recipes documents in the props.
UserPage.propTypes = {
  owner: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Recipes documents.
  const subscription = Meteor.subscribe(Owners.userPublicationName);
  const subscription2 = Meteor.subscribe(Pets.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Recipe that matches with the recipeID
  const owner = Owners.collection.findOne();
  return {
    ready,
    owner,
  };
})(UserPage);
