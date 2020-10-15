$(function(){
    // feed post
    $("#btnNewPost").click(function() {
        console.log("New Post Button Pressed")
        post = new Post("Title Name", "This is a description!", "./pics/1.jpg");

        $(".feed").append(`
            <div class="feed_item" id="item1" class="left">
                <img src="${post.imageSrc}" alt="k" class="image_thumb">
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

    // my ideas post
    $("#newIdea").click(function() {
        console.log("New Post!")
        post = new Post("Title", "This is a brief description of my idea post", "./pics/3.jpg")

        $("#idea_container").append(`
            <div class="idea_item" id="idea1">
                <div class="idea-thumb">
                    <img src="${post.imageSrc}" alt="">
                </div>
                <div class="idea-title">
                    ${post.name}
                </div> 
                <span class="flex_grow"></span>
                <button class="idea_info destyle_btn" ><i class="material-icons">info</i></button>
                <button class="idea_message destyle_btn" ><i class="material-icons">message</i></button>
                <button class="idea_edit destyle_btn" ><i class="material-icons">edit</i></button>
            </div>
        `)
    })

    $(document).on("click", ".updown", (e)=>{
        console.log(e.currentTarget.parentElement.childNodes[5]);
        $(e.currentTarget.parentElement.childNodes[5]).toggle();
        console.log(e.currentTarget.parentElement.childNodes[1].children[0].innerText);
        (e.currentTarget.parentElement.childNodes[1].children[0].innerText == 'keyboard_arrow_up') ? $(e.currentTarget.parentElement.childNodes[1].children[0]).text('keyboard_arrow_down') : $(e.currentTarget.parentElement.childNodes[1].children[0]).text('keyboard_arrow_up');
    })

    //Modal for messages
    $("#close").click(()=>{
        $(".modals2").hide();
    })

    $(document).on("click", ".idea_message", (e)=>{
        $(".modals2").show();
    })
})

class Post {
    constructor(name, desc, imageSrc) {
        this.name = name;
        this.desc = desc;
        this.imageSrc = imageSrc;
    }
}
