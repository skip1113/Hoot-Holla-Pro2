import { INSERT } from "sequelize/types/lib/query-types";

$(document).ready(function() {
  /* global moment */

  // hootContainer holds all of our posts
  var hoots = [];
  var hootContainer = $(".hoot-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  $(document).on("submit", "#hoot-form", postHoot);

  function getHoots() {
    $.get("/api/hoot", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createHooterRow(data[i]));
      }
      console.log(rowsToAdd);
      initializeRows(rowsToAdd);
      nameInput.val("");
    });
  }
  getHoots();

  function postHoot(event) {
    event.preventDefault();
    if (
      !hootInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    insertHoot({
      text: hootInput.val().trim(),
      image: hootImage.val().trim()
    });
  }
  function insertHoot(hooterData) {
    $.post("/api/hoot", hooterData).then(getHooters);
  }

  // function renderHooterList(rows) {
  //   hooterList
  //     .children()
  //     .not(":last")
  //     .remove();
  //   hooterContainer.children(".alert").remove();
  //   if (rows.length) {
  //     console.log(rows);
  //     hooterList.prepend(rows);
  //   } else {
  //     renderEmpty();
  //   }
  // }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Hooter before you can create a Post.");
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
      url: "/api/hoot/" + id
    }).then(getHooters);
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    }).then(function() {
      getPosts(postCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed post HTML inside hootContainer
  function initializeRows() {
    hootContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < hoots.length; i++) {
      postsToAdd.push(createNewRow(hoots[i]));
    }
    hootContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(hoot) {
    var formattedDate = new Date(hoot.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newHootCard = $("<div>");
    newHootCard.addClass("card");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newHootTitle = $("<h2>");
    var newHootDate = $("<small>");
    var newHoothooter = $("<h5>");
    newHoothooter.text("Written by: " + hoot.hooter.name);
    newHoothooter.css({
      float: "right",
      color: "blue",
      "margin-top": "-10px"
    });
    var newHootCardBody = $("<div>");
    newHootCardBody.addClass("card-body");
    var newHootBody = $("<p>");
    // newHootTitle.text(Hoot.title + " ");
    newHootBody.text(hoot.body);
    // newPostDate.text(formattedDate);
    // newPostTitle.append(newPostDate);
    // newPostCardHeading.append(deleteBtn);
    // newPostCardHeading.append(editBtn);
    // newPostCardHeading.append(newPostTitle);
    // newPostCardHeading.append(newPosthooter);
    newHootCardBody.append(newHootBody);
    // newHootCard.append(newHootCardHeading);
    newHootCard.append(newHootCardBody);
    newHootCard.data("hoot", hoot);
    return newHootCard;
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for hooter #" + id;
    }
    hootContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "No posts yet" +
        partial +
        ", navigate <a href='/cms" +
        query +
        "'>here</a> in order to get started."
    );
    hootContainer.append(messageH2);
  }
});
