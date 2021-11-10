import React from 'react';
import { Header, Button, Grid, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className="overall-background">
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
          <Grid.Column width={8}>
            <Header as="h1" inverted>Welcome to the AQ-Station</Header>
            <Header as="h3" inverted>Sign up to check your pet status.</Header>
            <div>
              <Button as={NavLink} className="ui secondary blue inverted segment" exact to="/signin">Administrator</Button>
              <Button as={NavLink} className="ui secondary blue inverted segment" exact to="/signup">Pet Owner</Button>
            </div>
          </Grid.Column>
          <Image src = 'images/aq-logo-nav.png' size = 'large'/>
        </Grid>
      </div>
    );
  }
}

export default Landing;
