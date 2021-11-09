import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Pets } from '../../api/pet/Pets';
import { Owners } from '../../api/owner/Owner';
import { Announcements } from '../../api/announcements/Announcements';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {

    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Owners.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Owners.collection.find({ email: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Pets.userPublicationName, function () {
  if (this.userId) {
    return Pets.collection.find();
  }
  return this.ready();
});

Meteor.publish(Pets.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Pets.collection.find();
  }
  return this.ready();
});

Meteor.publish(Owners.adminPublicationName, function () {
  if (this.userId) {
    return Owners.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(Announcements.userPublicationName, function () {
  if (this.userId) {
    return Announcements.collection.find();
  }
  return this.ready();
});

Meteor.publish(Announcements.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Announcements.collection.find();
  }
  return this.ready();
});
