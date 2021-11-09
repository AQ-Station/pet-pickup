import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Icon, Container, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Owners } from '../../api/owner/Owner';
import { Pets } from '../../api/pet/Pets';
import ConfirmCheckIn from '../components/ConfirmCheckIn';

class UserPage extends React.Component {

  doesCodeExist = (currentValue) => Pets.collection.find({ microchipCode: currentValue }).count() > 0;

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Creating Your Profile</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    return ((this.props.owner.microchipCode.every(this.doesCodeExist)) ? (
      <div className = 'overall-background'>
        <Container>
          <Grid centered className = 'notReady-background'>
            <Grid.Column className = 'ready-style' textAlign='center'>
              <Icon inverted name='check circle' size='massive'/>
              <Header as='h1' inverted className='center-text'>Your pet is ready!</Header>
              <div className='confirm-message'>
                <ConfirmCheckIn/>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    ) : (
      <div className = 'overall-background'>
        <Container>
          <Grid centered className = 'notReady-background'>
            <Grid.Column textAlign='center'>
              <Header size='huge' >Your pet is not ready for pick up!</Header>
              <Button> Refresh </Button>
            </Grid.Column>
          </Grid>
        </Container> </div>
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
