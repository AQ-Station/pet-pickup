import React from 'react';
import { Container, Grid, Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className = 'overall-background'>
        <div className = 'landingpage-style'>
          <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
            <Grid.Column width={8}>
              <h1>Welcome to the AQ-Station</h1>
              <p>Sign up to check your pet status.</p>
            </Grid.Column>
          </Grid>
        </div>

      </div>
    );
  }
}

export default Landing;
