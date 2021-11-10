import { Meteor } from 'meteor/meteor';
import { Pets } from '../../api/pet/Pets';
import { Owners } from '../../api/owner/Owner';
import { Announcements } from '../../api/announcements/Announcements';

/* eslint-disable no-console */

function addPet(data) {
  console.log(`  Adding: ${data.lastName} (${data.email})`);
  Pets.collection.insert(data);
}

if (Pets.collection.find().count() === 0) {
  if (Meteor.settings.defaultPets) {
    console.log('Creating default data.');
    Meteor.settings.defaultPets.map(data => addPet(data));
  }
}

// Initialize the database with a default profile document.
function addOwner(owner) {
  console.log(`  Adding: ${owner.email} (${owner.firstName} ${owner.lastName} ${owner.microchipCode})`);
  Owners.collection.insert(owner);
}

if (Owners.collection.find().count() === 0) {
  if (Meteor.settings.defaultOwners) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultOwners.map(user => addOwner(user));
  }
}

function addAnnouncements(data) {
  Announcements.collection.insert(data);
}

if (Announcements.collection.find().count() === 0) {
  if (Meteor.settings.defaultAnnouncements) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultAnnouncements.map(user => addAnnouncements(user));
  }
}
