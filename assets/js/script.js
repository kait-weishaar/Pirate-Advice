const searchHistUL = document.querySelector(`#search-history`);

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

const saveSearch = function(searchTerm) {
    var savePull = JSON.parse(localStorage.getItem("searchHist")) || [];
    
    savePull.push({
        search: searchTerm
    });
    localStorage.setItem("searchHist", JSON.stringify(savePull));
};

const loadSearch = function() {
    var saves = JSON.parse(localStorage.getItem("searchHist"));

    if (!saves) {
        return
    } else {
        for (i = 0; i < saves.length; i++) {
            historyAdd(saves[i].search); 
        }
    }
}

var historyAdd = function(searchTerm) {
    var newHisEl = document.createElement(`li`);
    var newHis = document.createTextNode(`${searchTerm}`);

    newHisEl.appendChild(newHis)
    searchHistUL.append(newHisEl);

};

loadSearch();

getAdvice(`spiders`);
// `spiders` will change to user input, and it will be an event listener