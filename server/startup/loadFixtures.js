function loadFixture(fixtures, collection) {
  var i;

  for (i = 0; i < fixtures.length; i+= 1) {
    //collection.remove({ });
    collection.insert(fixtures[i]);
  }
}

Meteor.startup(function () {
  process.env.MAIL_URL='smtp://olaamigo.app%40gmail.com:123456xyz@smtp.gmail.com:465/';
  //loadFixture(Fixtures['dummyFixture'], DummyCollection);
});
