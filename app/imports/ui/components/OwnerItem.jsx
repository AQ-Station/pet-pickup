import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List person table. See pages/Listperson.jsx. */
class OwnerItem extends React.Component {
  render() {
    return (this.props.owner && this.props.owner.ownerConfirm === 'Ready') ? this.renderPage() : '';
  }

  renderPage() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.owner.queueNumber}</Table.Cell>
        <Table.Cell>{this.props.owner.microchipCode}</Table.Cell>
        <Table.Cell>{this.props.owner.firstName}</Table.Cell>
      </Table.Row>);
  }
}

// Require a document to be passed to this component.
OwnerItem.propTypes = {
  owner: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OwnerItem);
