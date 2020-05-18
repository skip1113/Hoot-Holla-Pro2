// import { INSERT } from "sequelize/types/lib/query-types";

$(document).ready(function() {
  var likes = 0;
  $("#likesButton").on("click", function() {
    // alert("liked cliked");
    like ++;
    $("#likes").text(like);
    $("#likes").append(" Likes");
})
  // hootContainer holds all of our posts
  var hootContainer = $(".hoot-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  $(document).on("click", "#hoot-button", postHoot);
  // $(document).on("click", "#likesButton", addClick);
  
  function postHoot(event) {
    event.preventDefault();
    alert("clicked hoot form");
    if (
      !hootInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    insertHoot({
      text: hootInput.val().trim()
    });
  }
  function insertHoot(hooterData) {
    $.post("/api/hoot", hooterData).then(getHooters);
  }
  // Variable to hold our posts
  var posts;

  // The code below handles the case where we want to get hoot posts for a specific hooter
  // Looks for a query param in the url for hooter_id
  var url = window.location.search;
  var hooterId;
  if (url.indexOf("?hooter_id=") !== -1) {
    hooterId = url.split("=")[1];
    getPosts(hooterId);
  }
  // If there's no hooterId we just get all posts as usual
  else {
    getPosts();
  }

  // This function grabs posts from the database and updates the view
  function getPosts(hooter) {
    hooterId = hooter || "";
    if (hooterId) {
      hooterId = "/?hooter_id=" + hooterId;
    }
    $.get("/api/posts" + hooterId, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(hooter);
      } else {
        initializeRows();
      }
    });
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
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    hootContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(hoot) {
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
    cardThirteen.addClass("content");
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
    p.text("hoot.body"); 
    var formattedDate = new Date(hoot.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    cardEightteen.append(p);
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
