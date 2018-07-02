//test
//      *** SHOW CORRECT LANDING PAGE ***      //
$('#login-container').hide();
$('#newsfeed').hide();

//      *** HAS-ACC. PAGE CHANGE ***      //
$('#has-account').on('click', function(){
  $('#input-container').hide();
  $('#login-container').show();
})

//      *** NO-ACC. PAGE CHANGE ***      //
$('#no-account').on('click', function(){
  $('#input-container').show();
  $('#login-container').hide();
})

//      *** REGISTER AJAX REQ. ***      //
$('#register').on('click', function(){
  var fname = $('#fname-input').val();
  var lname = $('#lname-input').val();
  var email = $('#email-input').val();
  var password = $('#password-input').val();
  console.log(fname + lname + email + password);
  $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/register", {
    method: "POST",
    data: {
      fname: fname,
      lname: lname,
      email: email,
      password: password
    },
    success: true,
    error: function(){
      console.log('error');
    }
});
$('#input-container').hide();
$('#login-container').show();
});

//      *** LOGIN AJAX REQ. ***      //
$('#login').on('click', function(){
  var email= $('#email-login').val();
  var password = $('#password-login').val();
  $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/login", {
    method: "POST",
    data: {
      email: email,
      password: password
    },
    success: function(data){
      console.log(data);
      localStorage.setItem('token', data.response.token)  //grab AUTH_TOKEN from AJAX return req.
      localStorage.setItem('token', data.response.id)
      $('#login-container').hide();
      $('#newsfeed').show();


    },
    error: function(){
      console.log('error');
    }
});
//$('#login-container').hide();
});
