Template.common.helpers ({
    'isUser': function () {
         check();
         return (Session.get('isUser'));
     },
    'isAdmin': function () {
        check();
        return (Session.get('isAdmin'));
    },
    isEqual: function(v1, v2) {
        if (v1 === v2){
        //    alert(v1);
            return true;}

        return false;
    },

    isNotEqual: function(v1, v2) {
        if (v1 != v2){
          // console.log("truee!!");
            return true;}
            // console.log("false!!");
        return false;
    },

    'getUserRole' : function(){
      check();
      console.log("getUserRole Session.get", Session.get('userRole'));
       return (Session.get('userRole'));
     }

});
