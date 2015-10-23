// Template.informationAdd.helpers ({
//   'info':function() {
//     return(Session.get('info'));
//       },
// 'hosp':function() {
//   return(Session.get('hosp'));
// }
// });
//
// Template.informationAdd.events({
//
//   'submit form': function (event) {
//     event.preventDefault();
//     console.log('adding');
//    var detid=  $('input[name=hosp]:radio:checked').val()
//    console.log(detid);
//     Session.set('info',detid);
//     var detail_type = Session.get('info');
//     switch(detail_type){
//       case 'hosp':
//       {
//             Session.set('hosp',1);
//           var addhosp={}
//           addhosp.Hospital_name=event.target.Hospital_name.value;
//         addhosp.Doctor_name=event.target.Doctor_name.value;
//         addhosp.Facility_desc=event.target.Facility_desc.value;
//         console.log("hosp:"+JSON.stringify(addhosp));
//         break;
//       }
//         default :
//         {
// console.log("default");
//         }
//     }
//
//
//
//   }
// });
