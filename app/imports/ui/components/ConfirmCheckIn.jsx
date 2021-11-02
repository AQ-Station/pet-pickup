import React from 'react';
import { Button, Grid, Header, Icon, Modal } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class ConfirmCheckIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <Modal
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
        trigger={<Button inverted size="huge"> Check-In</Button>}
      >
        <Modal.Header>Confirm Check-In</Modal.Header>
        <Modal.Content>
          <Grid container centered verticalAlign='middle' columns={2}>
            <Grid.Column textAlign='center'>
              <Icon name='map' size='huge'/> {/* Placeholder */}
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">By clicking confirm, you indicate that you are in vicinity of our offices. You will then be put into queue for when you will be able to sign out your pet. Otherwise, click cancel until you are near our offices.</Header>
            </Grid.Column>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button negative>Wait</Button>
          <Button positive>Confirm Check-In</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ConfirmCheckIn;
