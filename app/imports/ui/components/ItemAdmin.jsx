import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ItemAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.pet.email}</Table.Cell>
        <Table.Cell>{this.props.pet.code}</Table.Cell>
        <Table.Cell>{this.props.pet.status}</Table.Cell>
        <Table.Cell>{this.props.pet.queue}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ItemAdmin.propTypes = {
  pet: PropTypes.shape({
    email: PropTypes.string,
    code: PropTypes.number,
    status: PropTypes.string,
    _id: PropTypes.string,
    queue: PropTypes.string,
  }).isRequired,
};

export default ItemAdmin;
