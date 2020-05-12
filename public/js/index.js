$(document).ready(function() {
  $(document).on("click", "button.login", signin);

  var signin = function(credentials) {
    //Sign in user with a account
    event.preventDefault();
    var userinputname = $("#userName").val().trim();
    var userpassword = $("#password").val().trim();
    if (userinputname === username) {
      userinputname = "/name/" + userinputname;
    }
    $.get("/api/newuser" + userinputname, function(data) {
      console.log("User", data);
      if (userpassword === password) {
        userHome();
      } else {
        alert("Username or Password incorrect");
      }
    });
  };
});