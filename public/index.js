$(function(){
    //// storage
    updateFromStorage();

    //// events

    /// feed page
    // updown description showing
    $(document).on("click", ".updown", (e)=>{
        console.log(e.currentTarget.parentElement.childNodes[5]);
        $(e.currentTarget.parentElement.childNodes[5]).toggle();
        console.log(e.currentTarget.parentElement.childNodes[1].children[0].innerText);
        (e.currentTarget.parentElement.childNodes[1].children[0].innerText == 'keyboard_arrow_up') ? $(e.currentTarget.parentElement.childNodes[1].children[0]).text('keyboard_arrow_down') : $(e.currentTarget.parentElement.childNodes[1].children[0]).text('keyboard_arrow_up');
    })

    // search feed
    $("#searchForm").submit(function(e) {
        e.preventDefault();
        console.log("Search Button Pressed");
        var input = $("input").first().val() // input into search bar

        searchPosts(getStoredIdeaArray(), input);
    })

    // feed post
    $("#btnNewPost").click(function() {
        console.log("New Post Button Pressed")
        post = new Post("Title Name", "This is a description!", "./pics/1.jpg");
        appendToLocalStorage(post);
        appendToFeed(post);

    })

    /// my ideas page
    // my ideas post
    $("#newIdea").click(function() {
        console.log("New Post!")
        post = new Post("Title", "This is a brief description of my idea post", "./pics/3.jpg")

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
                                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies pellentesque sem, nec dapibus turpis bibendum sit amet. </h4>
                                <div class="tags">
                                    <div class="tag" id="coding">Coding</div>
                                    <div class="tag" id="art">Art</div>
                                </div>
                            </div>
                            <div class="info">
                                <div class="info">
                                    <i class="material-icons">access_time</i>
                                    <h5 id="time_created">10/23/12</h5>
                                </div>
                                <div class="info">
                                    <i class="material-icons">person</i>
                                    <h5 id="owner">Bob ki</h5>
                                </div>
                                <div class="info">
                                    <i class="material-icons">groups</i>
                                    <h5 id="contributers">Jams, Bob, gjes</h5>
                                </div>
                            </div>
                        </div>
                    </div>
        `)
    })
    
    // message modal
    $(document).on("click", ".idea_message", (e)=>{
        $(".modals2").show();
    })

    //Modal for messages
    $("#close").click(()=>{
        $(".modals2").hide();
    })

    //Collapse event lisenter 
    $(document).on("click", ".idea-preview", (e) => {
        console.log(e.currentTarget.parentElement.childNodes[3]);
        $(e.currentTarget.parentElement.childNodes[3]).toggle();
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

        this.indexStoredAt = -1; // represents which index this post is stored in, in localStorage.ideaArray
        this.feedID = "Invalid feedID";
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
    localStorage.clear();

    /// example localStorage setup:
    // localStorage.setItem("ideas", JSON.stringify( 
    //     {
    //     ideaArray: [new Post("Title", "Really cool description", "./pics/1.jpg"), 
    //                 new Post("Name", "A boring description", "./pics/2.jpg")]
    //     }
    // ));
    appendToLocalStorage(new Post("Title", "Really cool description", "./pics/1.jpg"));
    appendToLocalStorage(new Post("Name", "A boring description", "./pics/2.jpg"));
}

// get the stored idea array in javascript JSON object form
function getStoredIdeaArray() {
    var ideaStorage = JSON.parse(localStorage.getItem('ideas'));
    if (!ideaStorage) return null;

    return ideaStorage.ideaArray;
}

function updateFromStorage() {
    var storedPosts = getStoredIdeaArray();
    if (!storedPosts) return;

    storedPosts.forEach(post => {
        appendToFeed(post);
    });
}

// use this function whenever adding to localStorage!
function appendToLocalStorage(post) {
    var existingKey = localStorage.getItem('ideas'); // current array
    if (!existingKey) { // doesn't exist yet
        createLocalStorageArray(post); // makes first instance
        return;
    }

    existingKey = JSON.parse(existingKey); // duplicates array

    // add any data that needs to be saved here:
    post.indexStoredAt = existingKey.ideaArray.length; // special value for tracking order of storage
    updateFeedID(post);

    existingKey.ideaArray[post.indexStoredAt] = post; // adds post to end of list

    localStorage.setItem('ideas', JSON.stringify(existingKey)); // updates localStorage with the new list
}

function createLocalStorageArray(firstPost) {
    firstPost.indexStoredAt = 0;
    updateFeedID(firstPost);
    localStorage.setItem("ideas", JSON.stringify( 
        {
        ideaArray: [firstPost]
        }
    ));
}

function updateFeedID(post) {
    post.feedID = "item" + post.indexStoredAt;
}

/// html generating functions

function appendToFeed(post) {
    $(".feed").append(`
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
