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
  Button,
} from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Owners } from '../../api/owner/Owner';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = { cats: [{ microchipcode: '' }], email: '', firstname: '', lastname: '', phonenumber: '', microchipcode: '', password: '', redirectToReferer: false };
  }

  handleDropdownChange = (e, { value }) => this.setState({ value })

  handleChange = (e) => {
    if (['microchipcode'].includes(e.target.className)) {
      const cats = [...this.state.cats];
      cats[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ cats }, () => console.log(this.state.cats));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  addCat = () => {
    this.setState((prevState) => ({
      cats: [...prevState.cats, { name: '', age: '' }],
    }));
  }

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

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/user' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    const { cats } = this.state;
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
                {
                  cats.map((val, idx) => {
                    const catId = `cat-${idx}`;
                    return (
                      <div key={idx}>
                        <label htmlFor={catId}>{`Microchip #${idx + 1}`}</label>
                        <Form.Input
                          id="signup-form-microchipcode"
                          icon="paw"
                          action={
                            <Button onClick={this.addCat} icon="plus"/>
                          }
                          iconPosition="left"
                          name="microchipcode"
                          type="microchipcode"
                          placeholder="Microchip Code"
                          onChange={this.handleChange}
                        />
                      </div>
                    );
                  })
                }
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

Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
