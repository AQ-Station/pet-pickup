import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Pets } from '../../api/pet/Pets';
import { Owners } from '../../api/owner/Owner';
import { Announcements } from '../../api/announcements/Announcements';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addPet(data) {
  console.log(`  Adding: ${data.lastName} (${data.email})`);
  Pets.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
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