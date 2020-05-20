// import { INSERT } from "sequelize/types/lib/query-types";

$(document).ready(function() {
  var like = 0;
  var userId = 0;
  $("#likesButton").on("click", function() {
    // alert("liked cliked");
    like++;
    $("#likes").text(like);
    $("#likes").append(" Likes");
  });
  // hootContainer holds all of our posts
  var hoots = [];
  var hootContainer = $(".hoot-container");
  var postCategorySelect = $("#category");

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
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);

  $(document).on("click", "#hoot-button", postHoot);
  // $(document).on("click", "#likesButton", addClick);

  $(document).on("submit", "#hoot-form", postHoot);

  function getHoots() {
    $.get("/api/hoot", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createNewRow(data[i]));
      }
      console.log("RowsTo add fucntion like 49", rowsToAdd);
      initializeRows(rowsToAdd);
      // nameInput.val("");
    });
  }
  getHoots();

  function getUser() {
    $.get("/api/currentuser", function(userRes) {
      // alert(userRes.name);
      $("#username").text(userRes.name);
      $("#useremail").text("@" + userRes.name);
      console.log("User ID!", userRes.id);
      userId = userRes.id;
    });
  }
  getUser();

  function postHoot(event) {
    event.preventDefault();
    var newHoot = $("#newHoot").val().trim();
    var imgUrl = $("#imgUrl").val().trim();
    console.log("The hoot is... ", newHoot);
    console.log("IMg url is...", imgUrl);
    if (
      !newHoot
        
    ) {
      return;
    }
    alert("You've made it to  line 75");
    insertHoot({
      hoot: newHoot,
      image: imgUrl,
      userId: userId
    });
  }
  function insertHoot(hootData) {
    $.post("/api/hoot", hootData).then(getHoots);
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
  // function handlePostDelete() {
  //   var listItemData = $(this)
  //     .parent("td")
  //     .parent("tr")
  //     .data("hooter");
  //   var id = listItemData.id;
  //   $.ajax({
  //     method: "DELETE",
  //     url: "/api/hoot/" + id
  //   }).then(getHooters);
  // }

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
  function initializeRows(hoots) {
    $("#blog").empty();
    console.log("line 138 hoots without loop", hoots[0]);
    // hootContainer.empty();
    // var postsToAdd = [];
    for (var i = 0; i < hoots.length; i++) {
      // var hootArr = hoots[i];
      // postsToAdd.push(createNewRow(hoots[i]));
      console.log("this is your array for hoots.i", hoots[i])
      
      $("#blog").append(hoots[i]), console.log("Line 142 initRow, Blog sent");
    }
    // hootContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(hoot) {
    // var cardNewInput 
    // var cardOne = $("<div>");
    // cardOne.addClass("column is-half", id="blog")
    // var cardTwo = $("<div>");
    // cardTwo.addClass("card");
    // var cardThree = $("<div>");
    // cardThree.addClass("header");
    // var cardFour = $("<div>");
    // cardFour.addClass("media");
    // var cardFive = $("<div>");
    // cardfive.addClass("media-left");
    // var cardSix = $("<figure>");
    // cardSix.addClass("image is-48x48");
    // var cardImg = $("<img>");
    // cardSeven = $("<div>");
    // cardSeven.addClass("media-content");
    // var cardEight = $("<h2>");
    // cardEight.text("John Smith");
    // var cardNine = $("<h4>");
    // cardNine.addClass("@johnsmith");
    // var cardTen = $("<div>");
    // cardTen.addClass("card-image");
    // var cardEleven = $("<figure>");
    // cardEleven.addClass("image is-4by3");
    // var cardTwelve = $("<img>");
    var cardThirteen = $("<div>");
    cardThirteen.addClass("card");
    // var likesCount = $("<h2>");
    // cardFourteen.text("Likes");
    // var cardFifteen = $("<div>");
    // cardFifteen.addClass("level-item has-text-centerd");
    // var cardSixteen = $("<a>");
    // cardSixteen.addClass("fas fa-feather-alt");
    // cardSixteen.attr("href", "#here");
    // var cardSeventeen = $("<a>");
    // cardSeventeen.addClass("fas fa-comment-alt");
    // cardSeventeen.attr("href", "#here");
    // var cardEightteen = $("<div>");
    // cardEightteen.addClass("content");
    var p = $("<p>");
    p.text(hoot.hoot);
    var formattedDate = new Date(hoot.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    cardThirteen.append(p);
    // var newPostCard = $("<div>");
    // newPostCard.addClass("card");

    // var newPostCardHeading = $("<div>");
    // newPostCardHeading.addClass("card");

    // var deleteBtn = $("<button>");
    // deleteBtn.text("x");
    // deleteBtn.addClass("delete btn btn-danger");

    // var editBtn = $("<button>");
    // editBtn.text("EDIT");
    // editBtn.addClass("edit btn btn-info");

    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    // var newPosthooter = $("<h5>");
    // newPosthooter.text("Written by: " + post.hooter.name);
    // newPosthooter.css({
    //   float: "right",
    //   color: "blue",
    //   "margin-top": "-10px"
    // });
    // var newPostCardBody = $("<div>");
    // newPostCardBody.addClass("card-body");
    // var newPostBody = $("<p>");
    // newPostTitle.text(post.title + " ");
    // newPostBody.text(post.body);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    cardThirteen.append(newPostTitle);
    cardThirteen.append(p);
    cardThirteen.data("hoot", hoot);
    // newPostCardHeading.append(deleteBtn);
    // newPostCardHeading.append(editBtn);
    // cardEightteen.append(newPostTitle);
    // newPostCardHeading.append(newPosthooter);
    // newPostCardBody.append(newPostBody);
    // newPostCard.append(newPostCardHeading);
    // newPostCard.append(newPostCardBody);
    // newPostCard.data("post", post);
    return cardThirteen;

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
  }
});
