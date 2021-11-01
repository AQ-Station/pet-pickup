import React from 'react';
import { Grid, Header, Icon, Image } from 'semantic-ui-react';
import ConfirmCheckIn from '../components/ConfirmCheckIn';

/** A simple static component to render some text for the landing page. */
class PetReadyMessage extends React.Component {
  render() {
    return (
      <Grid container centered verticalAlign='middle' textAlign='center' columns={3} row={3} className='blue-background-body'>
        <Grid.Column>
          <Image src='/images/dogcat-left.png' className="dog-cat-image" size="medium"/>
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <Icon inverted color='green' name='check circle' size='massive'/>
          <Header as='h1' inverted className='center-text'>Your pet is ready for pickup!</Header>
          <div className='confirm-message'>
            <ConfirmCheckIn/>
          </div>
        </Grid.Column>
        <Grid.Column>
          <Image src='/images/dogcat-right.png' className="dog-cat-image" size="medium"/>
        </Grid.Column>

      </Grid>
    );
  }
}

export default PetReadyMessage;
