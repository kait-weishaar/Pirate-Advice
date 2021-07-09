const searchHistUL = document.querySelector(`#search-history`);
const imgContainerEl = document.getElementById(`img-container`);
const btnContainerEl = document.getElementById(`button-container`);
const adviceContainerEl = document.getElementById(`advice-container`);


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
                pirateGif();
            }
            })
        }
    })
};
const pirateGif = function() {
    fetch(`https://api.giphy.com/v1/gifs/search?q=pirate&limit=20&offset=${Math.floor(Math.random() * (10))}&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1`).then(function(response) {
    console.log(response)
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            var gifDiv = document.querySelector(`#img-container`);
                gifDiv.innerHTML = "";
            var gifImg = document.createElement('img');
            gifImg.setAttribute('src', data.data[Math.floor(Math.random() * (20))].images.fixed_height.url);
            gifDiv.appendChild(gifImg);
        })
    }
});
}


// pirate API link: https://api.funtranslations.com/translate/pirate.json

const transPirate = function(advice){
    // splitAdvice = advice.split(` `);
    // urlAdvice = splitAdvice.join(`+`);
    let urlAdvice = encodeURIComponent(advice);
    console.log(urlAdvice);
    fetch(`https://api.funtranslations.com/translate/pirate.json?text=${urlAdvice}`).then(function(response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                console.log(data.contents.translated)
                adviceContainerEl.textContent = data.contents.translated;
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
    searchHistUL.innerHTML="";
    if (!saves) {
        return
    } else {
        for (i = 0; i < saves.length; i++) {
            historyAdd(saves[i].search); 
        }
    }
}

let displayFavorites = function() {
    searchHistUL.classList.remove('invisible')
}

var historyAdd = function(searchTerm) {
    var newHisEl = document.createElement(`li`);
    var newHis = document.createTextNode(`${searchTerm}`);

    newHisEl.appendChild(newHis)
    searchHistUL.append(newHisEl);

};


// `spiders` will change to user input, and it will be an event listener



let displayInitialPage = function() {

                //hide favorites and empty divs
                searchHistUL.classList.add('invisible');
                btnContainerEl.innerHTML = "";

                let heroImg = document.createElement('img');
                heroImg.setAttribute("src", "put URL here?");
                imgContainerEl.appendChild(heroImg);

                


                //create searchbar 

                let form = document.createElement('form');
                let searchBar = document.createElement("input");
                    searchBar.setAttribute("type", "search");
                    searchBar.setAttribute("name", "searchTerm");
                    searchBar.setAttribute("placeholder", "Search");
                let searchBtn =  document.createElement("input");
                searchBtn.textContent = "Search"; 
                searchBtn.setAttribute("type", "button");  
                form.appendChild(searchBar);
                form.appendChild(searchBtn);
                btnContainerEl.appendChild(form);

                let favBtn = document.createElement('button');
                favBtn.textContent = "Favorites";
                btnContainerEl.appendChild(favBtn);
                let searchValue = searchBar.value;
                

                searchBtn.addEventListener("click",function() {
                    //get giphy through api call ---Dylan?
                //clear old giphy and display giphy to page --Z? reference in class giphy activity
                    const searchTerm = searchBar.value;
                    //
                 if (searchTerm) {
                    getAdvice(searchTerm);
                    saveSearch(searchTerm);
                     //goes to favorite button
                 } else {
                     return; //add modal if time
                 }
                })


                favBtn.addEventListener("click", function() {
                    displayFavorites();
                    loadSearch(searchValue);
                    //btnContainerEl.classList.add("invisible")
                    let backButton = document.createElement("button");
                    backButton.textContent = "Back";
                    btnContainerEl.appendChild(backButton);

                    backButton.addEventListener("click", function() {
                        displayInitialPage();
                    })
                })


};

displayInitialPage();





//display initial page
        //pirate chest image
        //favorites btn
            // add "back" button to return to display initial page
//add evnt listener to butn
        //clear giphy

        //pirate chest open image + giphy
        
        //add btns to page to allow saving to favorites and clear favorites
                //add event listener to each btn
                //on favorites click - save to local storage
                //on clear favorites - clear local storage/clear unordered list

// css framework/utility classes

// mobile first!! (mediaqueries?)
