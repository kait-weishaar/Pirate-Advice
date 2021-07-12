const searchHistUL = document.querySelector(`#search-history`);
const imgContainerEl = document.getElementById(`img-container`);
const btnContainerEl = document.getElementById(`button-container`);
const adviceContainerEl = document.getElementById(`advice-container`);

let displayheroImg = function() {
    imgContainerEl.innerHTML = "";
    let heroImg = document.createElement('img');
    heroImg.setAttribute("src", "./assets/images/treasure.svg");
    heroImg.style.width = "30vw";
    //heroImg.classList.add("column", "is-2");
    imgContainerEl.appendChild(heroImg);
}

const getAdvice = function(searchTerm){
    fetch(`https://api.adviceslip.com/advice/search/${searchTerm}`).then(function(response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                if (!data.slips) {
                    console.log(data.message.text);
                    displayheroImg();
                    adviceContainerEl.textContent = "ARRRRGGGHHH! Ain't no pirate dat knows nothing 'bout " + searchTerm;
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

let displayInitialPage = function() {
    //hide favorites and empty divs
    searchHistUL.classList.add('invisible');
    btnContainerEl.innerHTML = "";
    imgContainerEl.innerHTML = "";
    displayheroImg();

    //create searchbar 
    let form = document.createElement('form');
    form.classList.add("field", "has-addons")
    let searchBar = document.createElement("input");
    searchBar.setAttribute("type", "text");
    searchBar.setAttribute("name", "searchTerm");
    searchBar.setAttribute("placeholder", "Search");
    searchBar.classList.add("input","is-danger", "is-medium")
    let searchBtn =  document.createElement("input");
    // searchBtn.textContent = "SEARCH"; 
    searchBtn.setAttribute("type", "button");  
    searchBtn.setAttribute("value", "Search");
                    
    searchBtn.classList.add("button","is-danger", "is-medium", "has-text-white");
    form.appendChild(searchBar);
    form.appendChild(searchBtn);
    btnContainerEl.appendChild(form);

    let favBtn = document.createElement('button');
    favBtn.textContent = "Favorites";
    favBtn.classList.add("button","is-danger", "is-medium", "has-text-white");
    btnContainerEl.appendChild(favBtn);
                
    let searchValue = searchBar.value;
    
    searchBtn.addEventListener("click",function() {
        const searchTerm = searchBar.value.trim();
        if (searchTerm) {.3
            getAdvice(searchTerm);
            saveSearch(searchTerm);
            //goes to favorite button
        } else {
            return; //add modal if time
        }
    })
                
    let backbtnDiv = document.createElement("div");
    btnContainerEl.appendChild(backbtnDiv);
               
    favBtn.addEventListener("click", function() {
        displayFavorites();
        loadSearch(searchValue);
        form.classList.add("invisible");
        //make backbtn div, append to btn container
                    
        backbtnDiv.innerHTML="";
        let backButton = document.createElement("button");
        backButton.textContent = "Back";
        //append to backbtn div
        backbtnDiv.appendChild(backButton);
        backButton.classList.add("button","is-danger", "is-medium", "has-text-white");
        backButton.addEventListener("click", function() {
            displayInitialPage();
        })
    })
};

displayInitialPage();