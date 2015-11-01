/**
 * Created by amusthafa on 10/14/2015.
 */
Meteor.startup(function () {
    SyncedCron.start();
    process.env.MAIL_URL='smtp://olaamigo.app%40gmail.com:123456xyz@smtp.gmail.com:465/';
    Accounts.emailTemplates.from = 'Ola Amigos ';

     //-- Application name
     Accounts.emailTemplates.siteName = 'ola_Amigos'
    //-- Subject line of the email.

  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address for Ola Amigos';
  };

  //-- Email text
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Thank you for registering.  Please click on the following link to verify your email address: \r\n' + url;
  };


});
