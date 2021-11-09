import React from 'react';
import { Grid, Feed, Icon, Header, Segment, Message } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Owners } from '../../api/owner/Owner';
import { Pets } from '../../api/pet/Pets';

/** A simple static component to render some text for the landing page. */
class Queue extends React.Component {
  render() {
    return (
    /*  <Grid columns='equal' padded> */
      <div className="overall-background">
        <Grid centered stackable columns={3}>

          <Grid.Column mobile={16} tablet={10} computer={10}>
            <Segment>
              <Feed>
                <Header as='h4'>Announcements</Header>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Summary>
                  Due to social distancing rules, we are only able to assist two people at a time. Please do not attempt to enter the office until you have been prompted to do so by the system.

                  Thank you for your patience! We look forward to assisting you as soon as possible.</Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={10} computer={10}>
            <Segment><Header as='h2' icon textAlign='center'>
              <Icon name='users' circular color="blue"/>
              <Header.Content>You are number {this.props.owner.queueNumber} in line</Header.Content>
            </Header>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={10} computer={10}>
            <Segment>
              <Header as='h4' attached='top'>
              Approximate Wait Time
              </Header>
              <Segment attached>
              360 minutes
              </Segment>
              <Message warning attached='bottom'>
                <Icon name='warning' />
              There is no shade outside of the office.
              </Message>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Queue.propTypes = {
  owner: PropTypes.object.isRequired,
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
})(Queue);
