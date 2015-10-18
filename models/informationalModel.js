EasySearch.createSearchIndex('users', {
  collection: Meteor.users,
  use: 'mongo-db',
  field: 'profile.firstName'
}
);
  // query: function (searchString) {
  //   // Default query that is used for searching
  //   console.log("Entering query method");
  //   var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
  //   // console.log("before my query");
  //   // // Make the firstName searchable
  //   // query.$or.push({
  //   //   profile: {
  //   //     // $elemMatch: {
  //   //     //   address: { '$regex' : '.*' + searchString + '.*', '$options' : 'i' }
  //   //     // }
  //   //     $elemMatch: {
  //   //       firstName: {'$regex' : '/^' + searchString + '.*/', '$options': 'i'}
  //   //     }
  //   //   }
  //   // });
  //
  //   return query;
  // }
//  query: function(searchString) {
    //console.log("The search string is " + searchString);
    //var query = {'profile.firstName': {'$regex': '.*' + searchString + '.*','$options': 'i'}};
    //console.log("The query is: " + JSON.stringify(query));
  //  return query;
//  }
//});

// Meteor.users.initEasySearch('username', {
//     'limit' : 20,
//     'use' : 'mongo-db'
// });
