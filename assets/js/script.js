const searchHistUL = document.querySelector(`#search-history`);
const imgContainerEl = document.getElementById(`img-container`);
const btnContainerEl = document.getElementById(`button-container`);

const getAdvice = function(searchTerm){
    fetch(`https://api.adviceslip.com/advice/search/${searchTerm}`).then(function(response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function(data) {
            console.log(data);
            if (!data.slips) {
                console.log(data.message.text);
                // will log: "No advice slips found matching that search term." Display to page
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

let displayInitialPage = function() {
//get giphy through api call ---Dylan?
//display giphy to page --Z? reference in class giphy activity
let heroImg = document.createElement('img');
heroImg.setAttribute("src", "put URL here?");

//create searchbar
let form = document.createElement('form');
let searchBar = document.createElement("input");
    searchBar.setAttribute("type", "search");
    searchBar.setAttribute("name", "searchTerm");
    searchBar.setAttribute("placeholder", "Search");
let searchBtn =  document.createElement("input"); 
   searchBtn.setAttribute("type", "button");  
   form.appendChild(searchBar);
   form.appendChild(searchBtn);


};

searchBtn.addEventListener("click", getAdvice);
//display initial page
        //searchbar 
        //pirate chest image
        //favorites btn
//add evnt listener to butn
        //call fetch function with user input
        //display advice to page
        //clear giphy
        //get a giphy to the page
        //add btns to page to allow saving to favorites and clear favorites
                //add event listener to each btn
                //on favorites click - save to local storage
                //on clear favorites - clear local storage
