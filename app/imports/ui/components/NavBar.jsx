import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Grid, Menu, Dropdown, Header, Image, Sidebar, Button, Icon } from 'semantic-ui-react';
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
    const menuStyle = { paddingBottom: '-10px', backgroundColor: '#03669e' };
    return (
      <Grid style={menuStyle}>
        <Grid.Column>
          <Menu style={menuStyle} attached="top" inverted>
            <Button compact icon style={menuStyle}
              onClick={this.handleShowOnClick}>
              <Icon name='sign-in' size="large"/>
            </Button>
            <Menu.Item as={NavLink} activeClassName="" exact to="/">
              <Header inverted as='h1'><Image src='/images/aq-logo-nav.png' size="huge"/>AQ-Station</Header>
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            dimmed={visible}
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/PetRoster" key='pr'>Pet Roster</Menu.Item>
            ) : ''}
            {this.props.currentUser ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Stuff</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/addpet" key='addpet'>Add Pets</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/user" key='user'>User Page</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Menu.Item>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
            ) : ''}
            <Menu.Item position="right">
              {this.props.currentUser === '' ? (
                <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Menu.Item>
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
