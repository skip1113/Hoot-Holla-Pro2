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
    // alert("You've made it to  line 75");
    insertHoot({
      hoot: newHoot,
      image: imgUrl,
      userId: userId
    });
    document.getElementById('newHoot').value = "";
  }
  function insertHoot(hootData) {
    $.post("/api/hoot", hootData).then(getHoots);
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Hooter before you can create a Post.");
    hooterContainer.append(alertDiv);
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
    
    var cardThirteen = $("<div>");
    cardThirteen.addClass("card");
    
    var p = $("<p>");
    p.text(hoot.hoot);
    var formattedDate = new Date(hoot.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    cardThirteen.append(p);
    

    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    cardThirteen.append(newPostTitle);
    cardThirteen.append(p);
    cardThirteen.data("hoot", hoot);
    
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
