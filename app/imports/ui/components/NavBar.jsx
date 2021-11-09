import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Grid, Menu, Header, Sidebar, Button, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component.
 * References: https://bit.dev/semantic-org/semantic-ui-react/sidebar?example=5e9c2ef1c772c5001968ba1f */
class NavBar extends React.Component {
  state = { visible: false }

  handleShowOnClick = () => this.setState({ visible: true })

  handleHideOnClick = () => this.setState({ visible: false })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state;
    const menuStyle = { backgroundColor: '#03669e' };
    return (
      <Grid className = 'navbar-style' style={menuStyle} column={1} width={1}>
        <Grid.Column>
          <Menu style={menuStyle} attached="top" inverted>
            <Button compact icon style={menuStyle}
              onClick={this.handleShowOnClick}>
              <Icon name='bars' inverted size="large" />
            </Button>
            <Menu.Item as={NavLink} activeClassName="" exact to="/">
              <Header inverted as='h1'>
                <Header.Content>AQ-Station</Header.Content>
              </Header>
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
          >
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/PetRoster" key='pr'>Pet Roster</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/queuecheck" key='qc'>Queue Check</Menu.Item>
            ) : ''}
            {this.props.currentUser ? (
              <Menu.Item key='username' color='grey'><Icon name="user circle"/>{this.props.currentUser}<Icon name="angle double down"/></Menu.Item>
            ) : ''}
            {!Roles.userIsInRole(Meteor.userId(), 'admin') && this.props.currentUser !== '' ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/user" key='user' id="userprofile"><Icon name="user"/>User Page</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/queue" key='quee' id="queuepage"><Icon name="user"/>Queue</Menu.Item>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/addpet" key='addpet'><Icon name="add circle"/>Add Pets</Menu.Item>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/petlist" key='petlist'><Icon name="list"/>Pet List</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/waitlist" key='waitlist'><Icon name="list"/>Wait List</Menu.Item>
            ) : ''}
            {this.props.currentUser === '' ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/signin" key='signin'> <Icon name="user"/> Sign In </Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/signup" key='signup'> <Icon name="add user"/> Sign Up </Menu.Item>]
            ) : (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/signout" key='signout'> <Icon name="sign out"/> Sign Out </Menu.Item>
            )}
          </Sidebar>
        </Grid.Column>
      </Grid>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
