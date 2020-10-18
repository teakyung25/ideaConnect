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
        appendToUserLocalStorage(user);
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
        let users = getStoreduserArray();
        let vUser = verifyUser(form_data,users);
        if(vUser) {
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

    function verifyUser(form_data, users){
        let isGood;
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.username == form_data[0].value && user.password == form_data[1].value) {
                // alert("Success!");
                isGood = true;
                break;
            } else {
                isGood = false;
            }
        }
        return isGood;
    }


    function getStoreduserArray() {
        var usersStorage = JSON.parse(localStorage.getItem('users'));
        if (!usersStorage) return null;
    
        return usersStorage.usersArray;
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

            this.indexStoredAt = -1; // represents which index this post is stored in, in localStorage.ideaArray
            this.userID = "Invalid feedID";
        }
        
    }

    /// storage functions  ///////////

    function appendToUserLocalStorage(user) {
        var existingKey = localStorage.getItem('users'); // current array
        if (!existingKey) { // doesn't exist yet
            createLocalUserStorageArray(user); // makes first instance
            return;
        }

        existingKey = JSON.parse(existingKey); // duplicates array

        // add any data that needs to be saved here:
        user.indexStoredAt = existingKey.usersArray.length; // special value for tracking order of storage
        updateUserID(user);
        // console.log(user.keywords);

        existingKey.usersArray[user.indexStoredAt] = user; // adds post to end of list

        localStorage.setItem('users', JSON.stringify(existingKey)); // updates localStorage with the new list
    }

    function createLocalUserStorageArray(firstPost) {
        firstPost.indexStoredAt = 0;
        updateUserID(firstPost);
        localStorage.setItem("users", JSON.stringify( 
            {
            usersArray: [firstPost]
            }
        ));
    }

    function updateUserID(user) {
        user.userID = "user" + user.indexStoredAt;
    }
})