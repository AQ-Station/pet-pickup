import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import {
  Form,
  Grid,
  Container,
  Message,
  Segment,
  Header,
} from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Owners } from '../../api/owner/Owner';

class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', firstname: '', lastname: '', phonenumber: '', microchipcode: '', redirectToReferer: false };
  }

  handleDropdownChange = (e, { value }) => this.setState({ value })

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a user profile entry, then redirect to the home page. */
  submit = () => {
    const { email, firstname, lastname, phonenumber, microchipcode, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Owners.collection.insert({ firstName: firstname, lastName: lastname, phoneNumber: phonenumber, microchipCode: microchipcode, email });
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/user' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>
                Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  required
                  label="First Name"
                  id="signup-form-firstname"
                  icon="user"
                  iconPosition="left"
                  name="firstname"
                  placeholder="First Name"
                  type="firstname"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  required
                  label="Last Name"
                  id="signup-form-lastname"
                  icon="user"
                  iconPosition="left"
                  name="lastname"
                  placeholder="Last Name"
                  type="lastname"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  required
                  label="Phone Number"
                  id="signup-form-phonenumber"
                  icon="user"
                  iconPosition="left"
                  name="phonenumber"
                  placeholder="Last Name"
                  type="phonenumber"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Microchip Code"
                  id="signup-form-microchipcode"
                  icon="user"
                  iconPosition="left"
                  name="microchipcode"
                  type="microchipcode"
                  placeholder="Microchip Code"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
                Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
