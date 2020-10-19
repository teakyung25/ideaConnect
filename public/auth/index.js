$(function() {
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
        if (matchingUserWithUsernameInOtherUsers(user.username)) {
            alert("That username already exists! Try a different username.");
            return;
        }

        appendOtherUserToLocalStorage(user);
        // window.location.url = "";
        $(location).attr('href', './auth/index.html');
        window.location.hash = "#login_section";
        location.reload();
    })  

    //login 

    $("#login-form").submit((e) => {
        e.preventDefault();
        let formData = $(":input").serializeArray();
        console.log(formData);
        
        var user = matchingUser(formData);
        if (user == null) {
            alert("Invalid username or password! Try again.");
            return;
        }

        let url ='http://127.0.0.1:5500/public/?' + formData[0].value + "#";
        window.location.href = url;
        storeUser(user);
    })

    // returns if a username and password match an existing user
    function matchingUser(formData) {
        var matchingUser = matchingUserWithUsernameInOtherUsers(formData[0].value);
        if (matchingUser == null) {
            alert("Invalid username!");
            return null;
        }

        if (formData[1].value !== matchingUser.password) {
            alert("Invalid password!");
            return null;
        }

        return matchingUser;
    }

    // finds and returns a matching user in otherUsers storage (null if not found)
    function matchingUserWithUsernameInOtherUsers(username) {
        var otherUsers = getStoredOtherUserArray();
        for (i = 0; i < otherUsers.length; i++) {
            if (username === otherUsers[i].username) {
                console.log("Checked username: " + otherUsers[i].username);
                return otherUsers[i];
            }
        }
        return null; // not found
    }
})