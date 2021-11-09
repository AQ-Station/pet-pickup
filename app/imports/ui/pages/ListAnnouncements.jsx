import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Announcements } from '../../api/announcements/Announcements';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListAnnouncements extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Stuff</Header>
        <Table celled>
          {this.props.announcements.announcement}
        </Table>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListAnnouncements.propTypes = {
  announcements: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Announcements.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const announcements = Announcements.collection.findOne();
  return {
    announcements,
    ready,
  };
})(ListAnnouncements);
