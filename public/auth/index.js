$(function() {
    //toggles selected class on tags 
    $(".select_tag").click((e) =>{
        console.log(e.target.className.substring(0,10));
        let element = e.currentTarget;
        $(e.currentTarget).toggleClass("selected");
    })

    //create account
    $("#create-account-form").submit((e) => {
        // e.preventDefault();
        // console.log($(":input").serializeArray());
        let data = $(":input").serializeArray();
        let allSelect = document.querySelectorAll(".selected");
        let keywords = [];
        let date = new Date();
        console.log(allSelect[0]);
        //gets all the selected keywords 
        for(var i = 0; i < allSelect.length; i++){
            console.log(allSelect[i].id);
            keywords.push(allSelect[i].id);
        }

        let user = new User(data[2].value, data[3].value, data[4].value, data[5].value, keywords,data[6].value, date);
        storeUser(user);
        // window.location.url = "";
        $(location).attr('href', './auth/index.html');
        window.location.hash = "#login_section";
        location.reload();
    })  

    //login 

    $("#login-form").submit((e) => {
        e.preventDefault();
        let form_data = $(":input").serializeArray();
        console.log(form_data);
        let user = getStoredUser();
        
        if(userIsVerified(form_data,user)) {
            let url ='http://127.0.0.1:5500/public/?' + form_data[0].value + "#";
            // let form = $(`<form  action="${url}" method="POST"><input type="text" name="api_val" value="${form_data[0].value}"></form>`);
            // $("head").append(form);
            window.location.href = url;
            // form.submit();
            // $('#inset_form').html(`<form action="${url}" name="redirect" method="post" style="display:none;"><input type="text" name="api_data" value="${form_data[0].value}" /></form>`);

            // document.forms['redirect'].submit();
        } else {
            alert("Invalid Login! Try again.")
        }
    })

    function userIsVerified(form_data, user) {
        return user.username === form_data[0].value && user.password === form_data[1].value
    }
})