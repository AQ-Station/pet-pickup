import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List person table. See pages/Listperson.jsx. */
class Pet extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>Microchip Code</Table.Cell>
        <Table.Cell>{this.props.pet.microchipCode}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
Pet.propTypes = {
  pet: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Pet);
