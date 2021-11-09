import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List person table. See pages/Listperson.jsx. */
class OwnerItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.owner.microchipCode}</Table.Cell>
        <Table.Cell>{this.props.owner.firstName}</Table.Cell>
        <Table.Cell>{this.props.owner.queuePos}</Table.Cell>
        <Table.Cell> <Button icon>
          <Icon name='x' />
        </Button></Table.Cell>
        <Table.Cell> <Button icon>
          <Icon name='angle down' />
        </Button></Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
OwnerItem.propTypes = {
  owner: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OwnerItem);
