$(document).ready(function() {
  var newName = $("#userName");
  var lastName = $("#lastName");
  var email = $("#email");
  var dob = $("#birth");
  var pass = $("#password");

  // Adding an event listener for when the form is submitted
  $(signupForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the new account if we are missing information
    if (
      !newName.val().trim() ||
      !lastName.val().trim() ||
      !email.val().trim() ||
      !dob.val().trim() ||
      !pass.val().trim()
    ) {
      alert("Missing credentials, Please fill out all the columns");
      return;
    }
    var newAccount = {
      name: newName.val().trim(),
      last: lastName.val().trim(),
      email: email.val().trim(),
      birthday: dob.val().trim(),
      password: pass.val().trim()
    };
    submitAccount(newAccount);
  });
  function submitAccount(Account) {
    $.post("/api/account/", Account, function() {
      window.location.href = "/index.html";
    });
  }
});
