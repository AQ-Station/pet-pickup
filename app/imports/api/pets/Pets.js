import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The PetsCollection. It encapsulates state and variable values for pet data.
 */
class PetsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'PetsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      ownerNames: { type: Array, optional: true },
      'ownerNames.$': { type: String, optional: true },
      petcode: { type: String, optional: false },
      petReadyState: { type: String,
        allowedValues: ['Ready', 'Not Ready'],
        defaultValue: 'Not Ready' },
      queuePosition: { type: Number, optional: true },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.checkInPublicationName = `${this.name}.publication.checkIn`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {StuffsCollection}
 */
export const Pets = new PetsCollection();
