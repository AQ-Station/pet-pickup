import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class PetReadyMessage extends React.Component {
  render() {
    return (
      <Grid centered container verticalAlign='middle' textAlign='center' columns={1}>

        <Grid.Row centered className='blue-background-body'>
          <Header as="h1" inverted>Your pet is ready!</Header>
        </Grid.Row>

      </Grid>
    );
  }
}

export default PetReadyMessage;
