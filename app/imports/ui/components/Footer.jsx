import React from 'react';
import { Container, Grid, Image, Header } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-style">
        <Container>
          <Grid borderless columns={2}>
            <Grid.Row>
              <Grid.Column width ={4}>
                <Image src = 'images/pet-navbar.gif' size = 'large'/>
              </Grid.Column>
              <Grid.Column>
                <div className = 'footer-link'>
                  <Header as = 'h2'>Contact us </Header>
                  <hr/>
                  <a className = 'footer-link' href="https://hdoa.hawaii.gov/ai/aqs/aqs-info/"> Website : Animal Industry Division </a> <br/>
                    phone : (808) 973-9560  <br/>
                    e-mail: hdoa.info@hawaii.gov
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </footer>
    );
  }
}

export default Footer;
