$(function(){
    $(".updown").click((e)=>{
        console.log(e.currentTarget.parentElement.childNodes);
        $(e.currentTarget.parentElement.childNodes[5]).toggle();
        console.log($('#item_toggle'));
        ($("#item_toggle").text() == 'keyboard_arrow_up') ? $("#item_toggle",this).text('keyboard_arrow_down') : $("#item_toggle",this).text('keyboard_arrow_up');
    })
    $(window).scroll(() => {
        var first = $(window).height();
        if($(this).scrollTop() >= first) {
            console.log("hi");
            $("#user_nav").css("position","absolute");
        }
    })
})