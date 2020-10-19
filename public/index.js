$(function(){

    //Parses user from url 
    function parseURL (url) {
        var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#")  ,
        query = url.slice(queryStart, queryEnd );
        console.log(query);
        return query;
    }
    // Get User from url, for testing purposes, better method must be used later
    var username_universal = parseURL(window.location.href);
    
    addUserInfoAccounts(username_universal);

    //// storage
    updateFromStorage();

    //Parses user from url 
    function parseURL (url) {
        var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#")  ,
        query = url.slice(queryStart, queryEnd );
        console.log(query);
        return query;
    }
    // Get User from url, for testing purposes, better method must be used later
    var username_universal = parseURL(window.location.href);

    addUserInfoAccounts(username_universal);
        
    /// feed page
    $(document).on("click", ".updown", (e)=>{
        console.log(e.currentTarget.parentElement.childNodes[5]);
        $(e.currentTarget.parentElement.childNodes[5]).toggle();
        console.log(e.currentTarget.parentElement.childNodes[1].children[0].innerText);
        (e.currentTarget.parentElement.childNodes[1].children[0].innerText == 'keyboard_arrow_up') ? $(e.currentTarget.parentElement.childNodes[1].children[0]).text('keyboard_arrow_down') : $(e.currentTarget.parentElement.childNodes[1].children[0]).text('keyboard_arrow_up');
    })

    //// events
    // search feed
    $("#searchForm").submit(function(e) {
        e.preventDefault();
        console.log("Search Button Pressed");
        var input = $("input#search_bar").val(); // input into search bar
        searchPosts(getStoredPostArray(), input);
    })

    /// my ideas page
    // my ideas post
    $("#newIdea").click(function() {
        $("#idea_create_modal").show();
    })


    //Create Idea Form
    $("body").on('submit', "#create_idea_form", (e)=>{
        e.preventDefault();
        let data = $("#create_idea_form").serializeArray();
        let allSelect = document.querySelectorAll(".selected");
        let keywords = [];
        let date = new Date();
        console.log(allSelect);
        //gets all the selected keywords 
        for(var i = 0; i < allSelect.length; i++){
            console.log(allSelect[i].innerHTML.toLowerCase());
            if(allSelect[i].id == `${allSelect[i].innerHTML.toLowerCase()}_modal`) {
                keywords.push(allSelect[i].innerHTML.toLowerCase());
            }
        }
        console.log("New Post!")
        //pushes data in to local storage
        console.log(Math.floor(Math.random() * 7))
        let post = new Post(data[0].value,data[1].value,`./pics/${Math.floor(Math.random() * 7)}.jpg`,username_universal,"",keywords,date);
        appendPostToLocalStorage(post);
        appendToYourIdeas(post);
                
        $("#idea_create_modal").hide();
    })

    //Feed btns
    $("#explore").click(() => {
        $("#your_feed").hide();
        $("#explore_feed").show();
    })
    $("#yourFeed").click(() => {
        $("#your_feed").show();
        $("#explore_feed").hide();
    })

    //close create idea modal
    $(document).on("click", "#close_create_idea", (e)=>{
        $("#idea_create_modal").hide();
    })

    //toggles selected class on tags 
    $(".select_tag").click((e) =>{
        console.log(e.target.className.substring(0,10));
        let element = e.currentTarget;
        $(e.currentTarget).toggleClass("selected");
    })


    // message modal
    $(document).on("click", ".idea_message", (e)=>{
        $("#message_modal").show();
    })

    //Modal for messages
    $(document).on("click", "#close", (e)=>{
        $("#message_modal").hide();
    })

    //LOGOUT BTN 
    $("#logout_btn").click(() => {
        console.log("hihoihohio");
        location.href = "./auth/"
    })


    //Collapse event lisenter 
    $(document).on("click", ".idea-preview", (e) => {
        console.log(e.currentTarget.parentElement.childNodes[3]);
        $(e.currentTarget.parentElement.childNodes[3]).toggle();
    })

    //Save account settings 
    $("#edit_account").submit((e)=>{
        e.preventDefault();
        let data = [$("#username_editable").val(),$("#first_editable").val(),$("#last_editable").val(),$("#email_editable").val()];
        let allSelect = document.querySelectorAll(".selected");
        let keywords = [];
        console.log(data);
        // gets all the selected keywords 
        for(var i = 0; i < allSelect.length; i++){
            console.log(allSelect[i].id);
            keywords.push(allSelect[i].id);
        }
        let user = getStoredUser();
        console.log(user);
        let newUser = new User(data[0], data[1], data[2], data[3], keywords, user.password, user.date);
        // updateUserID(newUser);
        editOtherUserStorage(newUser);
    })

})


// object containing all post-specific data
class Post {
    constructor(name, desc, imageSrc, projectOwner, contributers, keywords, creationDate) {
        this.name = name;
        this.desc = desc;
        this.imageSrc = imageSrc;
        this.projectOwner = projectOwner;
        this.contributers = contributers;
        this.keywords = keywords;
        this.creationDate = creationDate;

        this.indexStoredAt = -1; // represents which index this post is stored in, in localStorage posts: postArray
        this.feedID = "Invalid feedID";
    }
    
}

//user class
class User {
    constructor(username, firstname, lastname, email, keywords, password,creationDate) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.keywords = keywords;
        this.password = password;
        this.creationDate = creationDate;

        this.userID = "Invalid userID";
    }
    
}


/// general helper functions
function includesCaseInsensitive(testString, filterString) {
    var regex = new RegExp(filterString, "i");
    return regex.test(testString);
}

// shows and hides posts according to if their name includes filterString
function searchPosts(searchList, filterString) {
    for (let i = 0; i < searchList.length; i++) {
        let post = searchList[i];
        if (includesCaseInsensitive(post.name, filterString)) {
            $("#" + post.feedID).show();
        } else {
            $("#" + post.feedID).hide();
        }
    }
}

/// storage functions

// resets localStorage with temp data. For testing purposes only
function initializeLocalStorage() {
    localStorage.posts.clear();

    /// example localStorage setup:
    // localStorage.setItem("posts", JSON.stringify( 
    //     {
    //     postArray: [new Post("Title", "Really cool description", "./pics/1.jpg"), 
    //                 new Post("Name", "A boring description", "./pics/2.jpg")]
    //     }
    // ));
    appendPostToLocalStorage(new Post("Title", "Really cool description", "./pics/1.jpg"));
    appendPostToLocalStorage(new Post("Name", "A boring description", "./pics/2.jpg"));
}

// resets localStoarge with logged in user temp data. For testing purposes only
function initializeUserLocalStorage() {
    let date = new Date();
    storeUser(new User("kyim","Bob", "Kim", "bob.kim@bob.kim",[],));
}

// resets localStorage with temp user data. For testing purposes only
function initializeOtherUsersLocalStorage() {

}


// get the stored idea array in javascript JSON object form
function getStoredPostArray() {
    var postStorage = JSON.parse(localStorage.getItem('posts'));
    if (!postStorage) return null;

    return postStorage.postArray;
}

function getStoredUser() {
    var userStorage = JSON.parse(localStorage.getItem('user'));
    if (!userStorage) return null;
    
    return userStorage;
}

function updateFromStorage() {
    var storedPosts = getStoredPostArray();
    var user = getStoredUser();
    if (!storedPosts || !user) return;
    
    storedPosts.forEach(post => {
        appendToFeed(post);
        if (post.projectOwner === user.username) {
            appendToYourIdeas(post);
        }
    });
    
}

// updates localStorage with the new user (overwriting the old one)
function storeUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// use this function whenever adding to localStorage!
function appendPostToLocalStorage(post) {
    var existingKey = localStorage.getItem('posts'); // current storage key
    if (!existingKey) { // doesn't exist yet
        createLocalStorageArray(post); // makes first instance
        return;
    }

    existingKey = JSON.parse(existingKey); // duplicates array

    // add any data that needs to be saved here:
    post.indexStoredAt = existingKey.postArray.length; // special value for tracking order of storage
    updateFeedID(post);
    console.log(post.keywords)

    existingKey.postArray[post.indexStoredAt] = post; // adds post to end of list

    localStorage.setItem('posts', JSON.stringify(existingKey)); // updates localStorage with the new list
}


function createLocalStorageArray(firstPost) {
    firstPost.indexStoredAt = 0;
    updateFeedID(firstPost);
    localStorage.setItem("posts", JSON.stringify( 
        {
        postArray: [firstPost]
        }
    ));
}

function updateFeedID(post) {
    post.feedID = "item" + post.indexStoredAt;
}

function updateUserID(user) {
    user.userID = "item" + user.indexStoredAt;
}

function appendOtherUserToLocalStorage(otherUser) {
    var existingKey = localStorage.getItem('otherUsers'); // current storage key
    if (!existingKey) { // doesn't exist yet
        createOtherUsersLocalStorageArray(otherUser); // makes first instance
        return;
    }

    existingKey = JSON.parse(existingKey); // duplicates array

    // add any data that needs to be saved here:
    otherUser.indexStoredAt = existingKey.otherUserArray.length; // special value for tracking order of storage
    updateUserID(otherUser);

    existingKey.otherUserArray[user.indexStoredAt] = otherUser; // adds post to end of list

    localStorage.setItem('otherUsers', JSON.stringify(existingKey)); // updates localStorage with the new list
}

function createOtherUsersLocalStorageArray(firstOtherUser) {
    firstOtherUser.indexStoredAt = 0;
    updateUserID(firstOtherUser);
    localStorage.setItem("otherUsers", JSON.stringify( 
        {
        otherUserArray: [firstOtherUser]
        }
    ));
}

function updateUserID(user) {
    user.userID = "Set correctly";
}

function getStoredOtherUserArray() {
    return JSON.parse(localStorage.getItem("otherUsers")).otherUserArray;
}

// updates otherUser storage with current (logged in) user
function editOtherUserStorage(currentUser) {
    var otherUserArray = getStoredOtherUserArray();
    if (!otherUserArray || !currentUser) {
        console.log("Trying to edit a user with no existing data! This shouldn't happen.")
        return;
    }
    storeUser(currentUser);

    for (i = 0; i < otherUserArray.length; i++) {
        if (otherUser.username === currentUser.username) {
            otherUser = currentUser; // updates here
            break;
        }
    }
}

//updates setting after login
function addUserInfoAccounts(username) {
    let user = getStoredUser();
    if (!user) {
        // early return to prevent referencing a non-existant user. At this point, a user should be prompted to log in 
        // (ex: "Log In instead of "Account" or "[user.username]").
        console.log("No user logged in!");
        return; 
    } 

    if (user.username == username) {
        console.log("Username matches");
        document.getElementById("username_editable").value = user.username;
        document.getElementById("first_editable").value = user.firstname;
        document.getElementById("last_editable").value = user.lastname;
        document.getElementById("email_editable").value = user.email;
        for(let i = 0; i < user.keywords.length; i++){
            let str = user.keywords[i].toLowerCase();
            console.log(str);
            console.log(document.querySelectorAll(`#${str}`));
            document.querySelectorAll(`#${str}`)[0].className = "selected select_tag tag";
        }
        ////MATCHING ALGORITHM: LOCATION IS HERE JUST FOR TESTING Reasons BETTER place soon

    }

}

function gerYourIdeaFeed (username) {
    let user = getStoredUser();
    if(getStoredPostArray() != null) {
        match(getStoredPostArray(),user.keywords, username);
    }
}
/// html generating functions

function appendToFeed(post) {
    $("#your_feed").append(`
        <div class="feed_item" id="${post.feedID}">
            <img src="${post.imageSrc}" alt="no image" class="image_thumb">
            <div class="item_content">
                <div class="updown">
                    <i class="material-icons" id="item_toggle">keyboard_arrow_up</i>
                </div>
                <div class="item_title">
                    <h3>${post.name}</h3>
                    <span class="flex_grow"></span>
                    <button class="join_btn">Join</button>
                </div>
                <div class="item_detail">
                    ${post.desc}
                </div>
            </div>
        </div>
    `);
}

function appendToYourIdeas(post) {
    $("#idea_container").append(`
        <div class="idea_item" id="idea1">
            <div class="idea-preview">
                <div class="idea-thumb">
                    <img src="${post.imageSrc}" alt="">
                </div>
                <div class="idea-title">${post.name}</div> 
                <span class="flex_grow"></span>
                <!-- <button class="idea_info destyle_btn" ><i class="material-icons">info</i></button> -->
                <button class="idea_message destyle_btn" ><i class="material-icons">message</i></button>
            </div>
            <div class="idea-content noselect">
                <div class="summary">
                    <h3>${post.name}</h3>
                    <h4>${post.desc}</h4>
                    <div class="tags">
                        <div class="tag" id="coding">Coding</div>
                        <div class="tag" id="art">Art</div>
                    </div>
                </div>
                <div class="info">
                    <div class="info">
                        <i class="material-icons">access_time</i>
                        <h5 id="time_created">${post.creationDate}</h5>
                    </div>
                    <div class="info">
                        <i class="material-icons">person</i>
                        <h5 id="owner">${post.projectOwner}</h5>
                    </div>
                    <div class="info">
                        <i class="material-icons">groups</i>
                        <h5 id="contributers">Jams, Bob, gjes</h5>
                    </div>
                </div>
            </div>
        </div>
    `)
}
