import React from 'react';
import { Button, Container, Grid, Header, } from 'semantic-ui-react';


/** A simple static component to render some text for the landing page. */
class PetNotReadyMessage extends React.Component {
  render() {
    return (
      <Container>
        <div className = 'notReady-background'>
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
    );
  }
}

export default PetNotReadyMessage;
