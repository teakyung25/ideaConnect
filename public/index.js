$(function(){

    $(".updown").click((e)=>{
        console.log(e.currentTarget.parentElement.childNodes);
        $(e.currentTarget.parentElement.childNodes[5]).toggle();
        console.log($('#item_toggle'));
        ($("#item_toggle").text() == 'keyboard_arrow_up') ? $("#item_toggle",this).text('keyboard_arrow_down') : $("#item_toggle",this).text('keyboard_arrow_up');
    })

})