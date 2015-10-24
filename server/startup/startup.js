/**
 * Created by amusthafa on 10/14/2015.
 */
Meteor.startup(function () {
    SyncedCron.start();
    process.env.MAIL_URL='smtp://olaamigo.app%40gmail.com:123456xyz@smtp.gmail.com:465/';

});