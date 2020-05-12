$(document).ready(function() {
  // Getting references to the name input and hooter container, as well as the table body
  var nameInput = $("#hooter-name");
  var hooterList = $("tbody");
  var hooterContainer = $(".hooter-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an hooter
  $(document).on("submit", "#hooter-form", handlehooterFormSubmit);
  $(document).on("click", ".delete-hooter", handleDeleteButtonPress);

  // Getting the initial list of hooters
  gethooters();

  // A function to handle what happens when the form is submitted to create a new hooter
  function handlehooterFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (
      !nameInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    // Calling the upserthooter function and passing in the value of the name input
    upserthooter({
      name: nameInput.val().trim()
    });
  }

  // A function for creating an hooter. Calls gethooters upon completion
  function upserthooter(hooterData) {
    $.post("/api/hooters", hooterData).then(gethooters);
  }

  // Function for creating a new list row for hooters
  function createhooterRow(hooterData) {
    var newTr = $("<tr>");
    newTr.data("hooter", hooterData);
    newTr.append("<td>" + hooterData.name + "</td>");
    if (hooterData.Hoots) {
      newTr.append("<td> " + hooterData.Hoots.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append(
      "<td><a href='/blog?hooter_id=" + hooterData.id + "'>Go to Hoots</a></td>"
    );
    newTr.append(
      "<td><a href='/cms?hooter_id=" +
        hooterData.id +
        "'>Create a Post</a></td>"
    );
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-hooter'>Delete hooter</a></td>"
    );
    return newTr;
  }

  // Function for retrieving hooters and getting them ready to be rendered to the page
  function gethooters() {
    $.get("/api/hooters", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createhooterRow(data[i]));
      }
      renderhooterList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of hooters to the page
  function renderhooterList(rows) {
    hooterList
      .children()
      .not(":last")
      .remove();
    hooterContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      hooterList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no hooters
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an hooter before you can create a Post.");
    hooterContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("hooter");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/hooters/" + id
    }).then(gethooters);
  }
});
