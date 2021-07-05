const getAdvice = function(searchTerm){
    fetch(`https://api.adviceslip.com/advice/search/${searchTerm}`).then(function(response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function(data) {
            console.log(data);
            if (!data.slips) {
                console.log(data.message.text);
                // will log: "No advice slips found matching that search term."
            } else {
                advice = data.slips[0].advice;
                console.log(advice);
                transPirate(advice);
            }
            })
        }
    })
};

// pirate API link: https://api.funtranslations.com/translate/pirate.json

const transPirate = function(advice){
    splitAdvice = advice.split(` `);
    urlAdvice = splitAdvice.join(`+`)
    console.log(urlAdvice);
    fetch(`https://api.funtranslations.com/translate/pirate.json?text=${urlAdvice}`).then(function(response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                console.log(data.contents.translated)
            })
        }
    })
};

getAdvice(`spiders`);
// `spiders` will change to user input 