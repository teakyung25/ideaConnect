$(function(){
    $("#btnNewPost").click(function() {
        console.log("New Post Button Pressed")
        post = new Post("Title Name", "This is a description!", "./pics/1.jpg");

        $(".feed").append(`
            <div class="feed_item" id="item1" class="left">
                <img src="${post.image}" alt="k" class="image_thumb">
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

    $(document).on("click", ".updown", (e)=>{
        console.log(e.currentTarget.parentElement.childNodes[5]);
        $(e.currentTarget.parentElement.childNodes[5]).toggle();
        console.log(e.currentTarget.parentElement.childNodes[1].children[0].innerText);
        (e.currentTarget.parentElement.childNodes[1].children[0].innerText == 'keyboard_arrow_up') ? $(e.currentTarget.parentElement.childNodes[1].children[0]).text('keyboard_arrow_down') : $(e.currentTarget.parentElement.childNodes[1].children[0]).text('keyboard_arrow_up');
    })
})



class Post {
    constructor(name, desc, imageSrc) {
        this.name = name;
        this.desc = desc;
        this.image = imageSrc;
    }
}
