// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: 'Drishti Connect',
  DESCRIPTION: 'Find a friend, Lend a hand'
};
