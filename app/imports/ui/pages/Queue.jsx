import React from 'react';
import { Grid, Feed, Icon, Image, Header, Segment, Message } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Queue extends React.Component {
  render() {
    return (
      <Grid columns='equal' padded>
        <Grid.Column>
          <Segment><Feed size='small'>
            <Header as='h4'>Announcements</Header>

            <Feed.Event>
              <Feed.Content>
                <Feed.Summary>
                  Due to social distancing rules, we are only able to assist two people at a time. Please do not attempt to enter the office until you have been prompted to do so by the system.

                  Thank you for your patience! We look forward to assisting you as soon as possible.</Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed></Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment><Header as='h2' icon textAlign='center'>
            <Icon name='users' circular />
            <Header.Content>You are number 28 in line</Header.Content>
          </Header>
          </Segment>
        </Grid.Column>
        <Grid.Column>
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
    );
  }
}

export default Queue;
