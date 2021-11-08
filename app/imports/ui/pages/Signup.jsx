import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Form, Grid, Container, Segment, Header, Button, Image } from 'semantic-ui-react';
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
      <div className="signup-style">
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Form onSubmit={this.submit}>
                <Segment className="ui secondary blue inverted segment" stacked>
                  <Form.Input
                    label="Email"
                    id="signup-form-email"
                    icon="user"
                    iconPosition="left"
                    name="email"
                    type="email"
                    color="red"
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
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
