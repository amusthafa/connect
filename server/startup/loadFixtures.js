function loadFixture(fixtures, collection) {
  var i;

  for (i = 0; i < fixtures.length; i+= 1) {
    //collection.remove({ });
    collection.insert(fixtures[i]);
  }
}

Meteor.startup(function () {
  process.env.MAIL_URL='smtp://vardhini.mv25%40gmail.com:11500000@smtp.gmail.com:465/';
  //loadFixture(Fixtures['dummyFixture'], DummyCollection);
});
