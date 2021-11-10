import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The AdoptsCollection. It encapsulates state and variable values for Adopt.
 */
class OwnersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'OwnersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      email: String,
      phoneNumber: String,
      ownerConfirm: {
        type: String,
        allowedValues: ['Ready', 'Not Ready'],
        optional: true,
      },
      microchipCode: { type: Array },
      'microchipCode.$': { type: String },
      queueNumber: { type: Number, optional: true },
      waitTime: { type: Number, optional: true },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the AdoptsCollection.
 * @type {OwnersCollection}
 */
export const Owners = new OwnersCollection();
