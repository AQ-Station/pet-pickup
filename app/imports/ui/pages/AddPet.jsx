import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Pets } from '../../api/pets/Pets';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  ownerNames: { type: Array, optional: true },
  'ownerNames.$': { type: String, optional: true },
  petcode: { type: String, optional: false },
  petReadyState: { type: String,
    allowedValues: ['Ready', 'Not Ready'],
    defaultValue: 'Not Ready' },
  queuePosition: { type: Number, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddPet extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { ownerNames, petcode, petReadyState } = data;
    Pets.collection.insert({ ownerNames, petcode, petReadyState },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Pet added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Pet</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='ownerNames'/>
              <NumField name='petcode' decimal={false}/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddPet;
