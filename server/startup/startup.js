/**
 * Created by amusthafa on 10/14/2015.
 */
Meteor.startup(function () {
    SyncedCron.start();
    process.env.MAIL_URL='smtp://olaamigo.app%40gmail.com:123456xyz@smtp.gmail.com:465/';

    Accounts.emailTemplates = {
  from: "Drishti Connect <olaamigo.app@gmail.com>",
  siteName: Meteor.absoluteUrl().replace(/^https?:\/\//, '').replace(/\/$/, ''),

  resetPassword: {
    subject: function(user) {
      return "To reset your password for Drishti Connect" ;
    },
    text: function(user, url) {
      var greeting = (user.profile && user.profile.firstName) ?
            ("Hello " + user.profile.firstName + ",") : "Hello,";
return greeting + "\n"
              + "\n"
              + "To Reset password for your account, simply click the link below.\n"
              + "\n"
              + url + "\n"
              + "\n"
              + "Thanks,\n"
              +"Drishti Connect";
            }
          },
        verifyEmail: {
      subject: function(user) {
        return "Confirm Your Email Address for Drishti Connect ";
      },
       text : function(user, url) {
         var greeting = (user.profile && user.profile.firstName) ?
               ("Hello " + user.profile.firstName + ",") : "Hello,";

       return  greeting + "\n"
                     + "\n"
                     +'Thank you for registering with us.\n'
                     +"\n"
                     +'Please click on the following link to verify your email address: \r\n'
                     +"\n"
                     + url+ "\n"
                     +"\n"
                     + "Thanks,\n"
                     +"Drishti Connect";

    }
  }
};

 });
