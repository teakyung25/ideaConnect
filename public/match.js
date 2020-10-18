function match (ideas, userkeys, username) {
    let ideaMatched = {};
    for (let idea of ideas) {
        console.log(idea);
        ideaMatched[idea.name] = 0;
    };
    console.log(ideaMatched);
    for (let index = 0; index < ideas.length; index++) {
        const ideaName = ideas[index].name;
        console.log(ideas)
        const ideaKeys = ideas[index].keywords;
        console.log(ideaKeys)
        if(username != ideas[index].projectOwner){
            for (let key of ideaKeys) {
                console.log(key)
                console.log(userkeys)
                if (userkeys.includes(key) ) {
                    ideaMatched[ideaName] += 1;
                }
            }
        }
        
    }
    // Now we have an array of mentors and their scores
    console.log(ideaMatched);
    // const getMax = object => {
    //     return Object.keys(object).filter(x => {
    //         return object[x] == Math.max.apply(null, Object.values(object));
    //    });
    // };
    let userIdeas = [];
    Object.keys(ideaMatched).forEach(function(key) {
        console.log(key, ideaMatched[key]);
        if(ideaMatched[key] >= 1) {
            userIdeas.push(key);
        }
    });
    console.log(userIdeas);
    return userIdeas;
}