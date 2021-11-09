import React from 'react';
import { Button, Container, Grid, Header, Image, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (

          <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
            <Grid.Column width={8}>
              <h1>Welcome to the AQ-Station</h1>
              <p>Sign up to check your pet status.</p>
              <div>
                <Button as={NavLink} primary exact to="/signin">Administrator</Button>
                <Button as={NavLink} primary exact to="/signup">Pet Owner</Button>
              </div>
            </Grid.Column>
            <Image src = 'images/aq-logo-nav.png' size = 'large'/>
          </Grid>

    );
  }
}

export default Landing;
