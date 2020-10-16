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

    // search
    $("#searchForm").submit(function() {
        console.log("Search Button Pressed");

        
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
        $("#idea_create_modal").show();
        // console.log("New Post!")
        // post = new Post("Title", "This is a brief description of my idea post", "./pics/3.jpg")

        // $("#idea_container").append(`
        //      <div class="idea_item" id="idea1">
        //                 <div class="idea-preview">
        //                     <div class="idea-thumb">
        //                         <img src="${post.imageSrc}" alt="">
        //                     </div>
        //                     <div class="idea-title">${post.name}</div> 
        //                     <span class="flex_grow"></span>
        //                     <!-- <button class="idea_info destyle_btn" ><i class="material-icons">info</i></button> -->
        //                     <button class="idea_message destyle_btn" ><i class="material-icons">message</i></button>
        //                 </div>
        //                 <div class="idea-content noselect">
        //                     <div class="summary">
        //                         <h3>${post.name}</h3>
        //                         <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies pellentesque sem, nec dapibus turpis bibendum sit amet. </h4>
        //                         <div class="tags">
        //                             <div class="tag" id="coding">Coding</div>
        //                             <div class="tag" id="art">Art</div>
        //                         </div>
        //                     </div>
        //                     <div class="info">
        //                         <div class="info">
        //                             <i class="material-icons">access_time</i>
        //                             <h5 id="time_created">10/23/12</h5>
        //                         </div>
        //                         <div class="info">
        //                             <i class="material-icons">person</i>
        //                             <h5 id="owner">Bob ki</h5>
        //                         </div>
        //                         <div class="info">
        //                             <i class="material-icons">groups</i>
        //                             <h5 id="contributers">Jams, Bob, gjes</h5>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        // `)
    })
    
    // message modal
    $(document).on("click", ".idea_message", (e)=>{
        $("#message_modal").show();
    })

    //Modal for messages
    $(document).on("click", "#close", (e)=>{
        $("#message_modal").hide();
    })

    //close create idea modal
    $(document).on("click", "#close_create_idea", (e)=>{
        $("#idea_create_modal").hide();
    })

    //Collapse event lisenter 
    $(document).on("click", ".idea-preview", (e) => {
        console.log(e.currentTarget.parentElement.childNodes[3]);
        $(e.currentTarget.parentElement.childNodes[3]).toggle();
    })

    // localStorage.setItem("ideas", JSON.stringify( {'idea1':{'bob':'bfbd'},'idea2':{'bob':'bfbd'}} ) );
    // let getdata = localStorage.getItem('ideas');
    // console.log(JSON.parse(getdata).idea1.bob);


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
    }
    
}

/// storage functions

// resets localStorage with temp data
function initializeLocalStorage() {
    localStorage.setItem("ideas", JSON.stringify( 
        {
        ideaArray: [new Post("Title", "Really cool description", "./pics/1.jpg"), 
                    new Post("Name", "A boring description", "./pics/2.jpg")]
        }
    ));

    updateFromStorage();
}

function updateFromStorage() {
    var storedPosts = JSON.parse(localStorage.getItem('ideas')).ideaArray;

    storedPosts.forEach(post => {
        appendToFeed(post);
    });
}

function appendToLocalStorage(data) {
    var existingKey = localStorage.getItem('ideas'); // current array

    existingKey = existingKey ? JSON.parse(existingKey) : {}; // creates array if new. Duplicates array if not

    existingKey.ideaArray[existingKey.ideaArray.length] = data; // adds data

    localStorage.setItem('ideas', JSON.stringify(existingKey));
}

/// html generating functions

function appendToFeed(post) {
    $(".feed").append(`
    <div class="feed_item" id="item">
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
