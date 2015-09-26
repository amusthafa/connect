Meteor.methods({addAid: function (aid) {

    /* var userAlreadyExists = typeof Meteor.users.findOne({ username : user.username }) === 'object';

     if (!userAlreadyExists) {
     Accounts.createUser(user);
     }*/
    //"aid_id" :"1","aid_name" :"2","aid_category_id" :"3","row_created" :"4","row_updated" :"5"
    console.log('add aid in server');

    console.log(JSON.stringify(aid));
    //TO-DO: remove check()
    check(aid, Object);
    /*check (aid_category_id,String);
     check (aid_name,String);*/
    var data = {
        "aidName": aid.aid_name,
        "aidCategoryId": aid.aid_category_id
    }
    Aid.insert(data, function (error, result) {

        console.log("Aid find " + JSON.stringify(Aid.find().fetch()));
        if (error) {
            console.log("Errors !!" + error + "  Result - " + result);
            //TO-DO: error message()
            // throw new Meteor.Error("insert-failed", error.message);    });
            throw new Meteor.Error("insert-failed", error);
        }
    });
}});