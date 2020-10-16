$(function(){
    /// feed page
    // updown description showing
    $(document).on("click", ".updown", (e)=>{
        console.log(e.currentTarget.parentElement.childNodes[5]);
        $(e.currentTarget.parentElement.childNodes[5]).toggle();
        console.log(e.currentTarget.parentElement.childNodes[1].children[0].innerText);
        (e.currentTarget.parentElement.childNodes[1].children[0].innerText == 'keyboard_arrow_up') ? $(e.currentTarget.parentElement.childNodes[1].children[0]).text('keyboard_arrow_down') : $(e.currentTarget.parentElement.childNodes[1].children[0]).text('keyboard_arrow_up');
    })

    // feed post
    $("#btnNewPost").click(function() {
        console.log("New Post Button Pressed")
        post = new Post("Title Name", "This is a description!", "./pics/1.jpg");

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
    })

    /// my ideas page
    // my ideas post
    $("#newIdea").click(function() {
        console.log("New Post!")
        post = new Post("Title", "This is a brief description of my idea post", "./pics/3.jpg")

        $("#idea_container").append(`
            <div class="idea_item" id="idea">
                <div class="idea-preview">
                    <div class="idea-thumb">
                        <img src="${post.imageSrc}" alt="">
                    </div>
                    <div class="idea-title">${post.name}</div> 
                    <span class="flex_grow"></span>
                    <!-- <button class="idea_info destyle_btn" ><i class="material-icons">info</i></button> -->
                    <button class="idea_message destyle_btn" ><i class="material-icons">message</i></button>
                </div>
                <div class="idea-content">
                    <h3>Title of Project</h3>
                    <h4>Description Here</h4>
                    <h5>Owner:</h5>
                    <h5>Date:</h5>
                    <h5>Contributers:</h5>
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

    let requestURL = 'http://127.0.0.1:5500/public/ideas.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        const ideas = request.response;
        console.log(ideas);
    }
    request.open('POST', requestURL);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({ "email": "hello@user.com", "response": { "name": "Tester" } }));

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
