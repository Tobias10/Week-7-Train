(function() {
  $( function() {

    // Date Picker
    $( ".datepicker" ).datepicker();

    // firebase
    var config = {
      apiKey: "AIzaSyC0tXbVdZpKJQrYflnXzq6fz1lLiUBgX9M",
      authDomain: "trains-8821d.firebaseapp.com",
      databaseURL: "https://trains-8821d.firebaseio.com",
      storageBucket: "",
      };

   firebase.initializeApp(config);

   var fb = firebase.database();

   var date = new Date();
   var currentMonth = date.getMonth() + 1;
   var currentYear = date.getFullYear();

   fb.ref('trains').on('child_added', function(snapshot) {

     console.log(snapshot.val());
     var childData = snapshot.val();

     var $table = $('#trains');

     var startDate = childData.startDate.split('/');

     var startMonth = parseInt(startDate[0]);
     var startYear = parseInt(startDate[2]);

     console.log(startMonth, startYear);

     var remainingMonths = (currentYear - startYear) * 12 + (currentMonth - startMonth);

     if(remainingMonths < 0) {

       remainingMonths = 0;

     }

     var htmlData = '<tr>';

     htmlData += '<td>'+childData.name+'</td>';
     htmlData += '<td>'+childData.role+'</td>';
     htmlData += '<td>'+childData.startDate+'</td>';
     htmlData += '<td>'+remainingMonths+'</td>';
     htmlData += '<td>'+childData.monthlyRate+'</td>';
     htmlData += '<td>'+remainingMonths * + childData.monthlyRate+ '</td>';
     htmlData += '</tr>';

     $table.append(htmlData);

   });

   $('#submitData').on('click', function() {

     // pull data
     var name = $('#name').val().trim();
     var role = $('#role').val().trim();
     var startDate = $('#startDate').val().trim();
     var monthlyRate = parseInt($('#monthlyRate').val());

     // validate form
     if(name && role && startDate && monthlyRate) {

       var employee = {
         name: name,
         role: role,
         startDate: startDate,
         monthlyRate: monthlyRate
       };

       fb.ref('trains').push(employee);

     } else {

       alert('Please complete all form fields');

     }

     // clear forms
     $('#name').val('');
     $('#role').val('');
     $('#startDate').val('');
     $('#monthlyRate').val('');

   });


  });
})();