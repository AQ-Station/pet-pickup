import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Icon, Container, Button, Modal, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Owners } from '../../api/owner/Owner';
import { Pets } from '../../api/pet/Pets';

const padding = { paddingTop: '25px', paddingBottom: '50px', paddingLeft: '100px', paddingRight: '100px' };

class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  refreshPage() {
    // eslint-disable-next-line no-undef
    window.location.reload(false);
  }

  doesCodeExist = (currentValue) => Pets.collection.find({ microchipCode: currentValue }).count() > 0;

  changeReadyState() {
    const ownerConfirm = 'Ready';
    Owners.collection.update(this.props.owner._id, { $set: { ownerConfirm } });
    Owners.collection.update(this.props.owner._id, { $set: { queueNumber: null } });

    swal('Check-In Confirmed!', 'Adding you to the queue...', 'success');

  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Creating Your Profile</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    // eslint-disable-next-line no-nested-ternary
    return ((!this.props.owner.ownerConfirm) ? ((this.props.owner.microchipCode.every(this.doesCodeExist)) ? (
      <div className = 'overall-background'>
        <Container>
          <Grid centered className = 'notReady-background'>
            <Grid.Column className = 'ready-style' textAlign='center'>
              <Icon inverted name='check circle' size='massive'/>
              <Header as='h1' inverted className='center-text'>Your pet is ready!</Header>
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
                        <Button as={NavLink} activeClassName="active" exact to="/Queue" positive size="huge" content="Confirm Check-In"
                          onClick={() => this.changeReadyState()}
                        />
                      </Grid.Row>
                    </Grid>
                  </Modal.Actions>
                </Modal>
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
              <Header as ='h1' inverted >Your pet is not ready for pick up!</Header>
              <Button size="huge" content="Refresh"
                onClick={() => this.refreshPage()}
              />
            </Grid.Column>
          </Grid>
        </Container> </div>
    )
    ) : (
      <div className = 'overall-background'>
        <Container>
          <Grid centered className = 'notReady2-background'>
            <Grid.Column className = 'ready-style' textAlign='center'>
              <Icon inverted name='check circle' size='massive'/>
              <Header as='h1' inverted className='alreadyChecked'>You have already checked in! Please return to the <Link to='/queue'>Queue</Link> page to check your position on the waitlist.</Header></Grid.Column>
          </Grid>
        </Container> </div>
    ));
  }
}

// Require an array of owner documents in the props.
UserPage.propTypes = {
  owner: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to owner and pets documents.
  const subscription = Meteor.subscribe(Owners.userPublicationName);
  const subscription2 = Meteor.subscribe(Pets.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the owner that matches with the recipeID
  const owner = Owners.collection.findOne();
  return {
    ready,
    owner,
  };
})(UserPage);
