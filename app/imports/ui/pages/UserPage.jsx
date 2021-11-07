import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Icon, Container, Button, Modal, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Owners } from '../../api/owner/Owner';
import { Pets } from '../../api/pet/Pets';

class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  doesCodeExist = (currentValue) => Pets.collection.find({ microchipCode: currentValue }).count() > 0;

  changeReadyState() {
    const ownerConfirm = 'Ready';
    Owners.collection.update(this.props.owner._id, { $set: { ownerConfirm } });
    swal('Check-In Confirmed!', 'Adding you the queue...', 'success');

  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Creating Your Profile</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    return ((this.props.owner.microchipCode.every(this.doesCodeExist)) ? (
      <Grid container doubling centered verticalAlign='middle' textAlign='center' columns={1} row={3} className='blue-background-body'>
        <Grid.Column textAlign='center'>
          <Icon inverted color='green' name='check circle' size='massive'/>
          <Header as='h1' inverted className='center-text'>Your pet is ready for pickup!</Header>
          <div className='confirm-message'>
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
                    <Button positive size="huge" content="Confirm Check-In"
                      onClick={() => this.changeReadyState()}/>
                  </Grid.Row>
                </Grid>
              </Modal.Actions>
            </Modal>
          </div>
        </Grid.Column>
      </Grid>
    ) : (
      <Container mobile={16} tablet={10} computer={10}>
        <div className = 'notReady-background' >
          <div className = 'notReady-background-container'>
            <Grid centered columns={2}>
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
