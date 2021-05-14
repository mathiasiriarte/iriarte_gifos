//---------- DARK MODE FUNCTION ----------
function enableDarkMode() {
    if (darkMode_enabled == false) {
        console.log("Switching into Dark Mode");
        darkMode_toggle.innerHTML = `<a href="#">MODO DIURNO</a>`;
        document.body.classList.add("dark");
        darkMode_enabled = true;
        //CHANGE ICONS INTO DARK MODE
        logo.src = "imgs/Logo-modo-noc.svg";
        trendingRightArrow.src = "imgs/button-slider-right-md-noct.svg";
        trendingLeftArrow.src = "imgs/button-slider-left-md-noct.svg";
        facebook.src = "imgs/icon_facebook_noc.svg";
        twitter.src = "imgs/icon_twitter_noc.svg";
        instagram.src = "imgs/icon_instagram_noc.svg";
        searchIcon_purple.src = "imgs/icon-search-modo-noct.svg";
        input_search.style.borderBottom = "1pt solid #9CAFC3";
        localStorage.setItem("COLORMODE", "dark");
    } else {
        console.log("Switching into Light Mode");
        darkMode_toggle.innerHTML = `<a href="#">MODO NOCTURNO</a>`;
        document.body.classList.remove("dark");
        darkMode_enabled = false;
        //REPLACE IMGS
        logo.src = "imgs/logo-desktop.svg";
        trendingRightArrow.src = "imgs/Button-Slider-right.svg";
        trendingLeftArrow.src = "imgs/button-slider-left.svg";
        facebook.src = "imgs/icon_facebook.svg";
        twitter.src = "imgs/icon-tw-normal.svg";
        instagram.src = "imgs/icon_instagram.svg";
        searchIcon_purple.src = "imgs/icon-search.svg";
        //STYLES
        input_search.style.borderBottom = "1pt solid #572EE5";
        //LOCALSSTORAGE
        localStorage.setItem("COLORMODE", "light");
    }
}
//---------- GET DARK MODE FROM LOCAL STORAGE ----------
function recoverDarkMode() {
    if (localStorage.getItem("COLORMODE")) {
        if (localStorage.getItem("COLORMODE") == "light") {
            darkMode_enabled = true;
        } else {
            darkMode_enabled = false;
        }
    } else {
        darkMode_enabled = true;
    }
enableDarkMode();
}
recoverDarkMode();

function gifEventListeners(selected) {
    selected.addEventListener("mouseover", () => {
        selected.querySelector(".gif-hover").classList.remove("hidden");
    });
    selected.addEventListener("mouseout", () => {
        selected.querySelector(".gif-hover").classList.add("hidden");
    });
    if (window.matchMedia("(max-width: 1000px)").matches) {
        selected.addEventListener("click", () => {
            maximizeGif(selected);
        });
    }
}

function addGifButtons(selected) {
    let buttons = selected.querySelectorAll(".gif-buttonbar img");
    console.log("Added gif to favorite: " + selected.querySelector(".gif-title").innerHTML)
    buttons[0].addEventListener("click", () => {
        favItem = new FAVGIFINFO(favoritesArray.length, selected.querySelector(".gif-title").innerHTML, selected.querySelector(".gif-user").innerHTML, selected.querySelector("img").src);
        buttons[0].src = "imgs/icon-fav-active.svg";
    })
    buttons[1].addEventListener("click", () => {
        downloadGif(selected.querySelector("img").src, selected.querySelector(".gif-title").innerHTML)
    });
    buttons[2].addEventListener("click", () => {
        maximizeGif(selected);
    });
    buttons[1].addEventListener("click", () => {
        console.log(selected);
    });
    buttons[0].addEventListener("mouseover", () => {
        buttons[0].src = "imgs/icon-fav-hover.svg";
    });
    buttons[0].addEventListener("mouseout", () => {
        buttons[0].src = "imgs/icon-fav.svg";
    });
    buttons[1].addEventListener("mouseover", () => {
        buttons[1].src = "imgs/icon-download-hover.svg";
    });
    buttons[1].addEventListener("mouseout", () => {
        buttons[1].src = "imgs/icon-download.svg";
    });
    buttons[2].addEventListener("mouseover", () => {
        buttons[2].src = "imgs/icon-max-hover.svg";
    });
    buttons[2].addEventListener("mouseout", () => {
        buttons[2].src = "imgs/icon-max-normal.svg";
    });
}

function maximizeGif(selected) {
    let userName = selected.querySelector(".gif-user").innerHTML;
    let title = selected.querySelector(".gif-title").innerHTML;
    let url = selected.querySelector("img").src;
    console.log("Maximizing gif: " + title);
    maximizeGif_section.querySelector(".title").innerHTML = title;
    maximizeGif_section.querySelector(".username").innerHTML = userName;
    maximizeGif_section.querySelector(".gifU").src = url;
    maximizeGif_section.classList.remove("hidden");
    searchS.classList.add("hidden");
    favoriteGifs_section.classList.add("hidden");
    window.scrollTo(0, 0);
    let buttons = maximizeGif_section.querySelectorAll(".maximized-container img");
    buttons[0].addEventListener("click", () => {
        console.log("Added gif to favorite: " + selected.querySelector(".gif-title").innerHTML)
        favItem = new FAVGIFINFO(favoritesArray.length, userName, title, url);
        buttons[0].src = "imgs/icon-fav-active.svg";
    })
    buttons[0].addEventListener("mouseover", () => {
        buttons[0].src = "imgs/icon-fav-hover.svg";
    });
    buttons[0].addEventListener("mouseout", () => {
        buttons[0].src = "imgs/icon-fav.svg";
    });
    buttons[1].addEventListener("click", () => {
        downloadGif(maximizeGif_section.querySelector(".gifU").src, maximizeGif_section.querySelector(".title").innerHTML)
    });
    buttons[1].addEventListener("mouseover", () => {
        buttons[1].src = "imgs/icon-download-hover.svg";
    });
    buttons[1].addEventListener("mouseout", () => {
        buttons[1].src = "imgs/icon-download.svg";
    });
}

maximizeGif_section.querySelector(".close-maximized").addEventListener("click", () => {
    maximizeGif_section.classList.add("hidden");
    searchS.classList.remove("hidden");
    favoriteGifs_section.classList.add("hidden");
});

//----- DOWNLOAD GIF FUNCTION -----
async function downloadGif(url, title){
    let a = document.createElement("a");
    let source = await fetch (url);
    let file = await source.blob();
    a.download=title + ".gif";
    a.href=window.URL.createObjectURL(file);
    a.dataset.downloadurl=['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

//--------------- TRENDING SEARCH TAGS ---------------
function generateTrendingTags(array) {
    popular_tags.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        let trendTag = document.createElement("span");
        trendTag.classList.add("trending_tag");
        trendTag.innerHTML = array[i];
        popular_tags.appendChild(trendTag);
    }
    addTagListeners();
}

//----- TRENDING GIFS -----
function addTrendingGifs(array) {
    for (let i = 0; i < 9; i++) {
        trendingGifs_array[i] = new GIFINFO(
        i,
        array[i].userName,
        array[i].title,
        array[i].images.original.url
        );
    }
}

function postTrendingGifs(offset) {
    trendingGifs_container.innerHTML = "";
    for (let i = offset; i < offset + 3; i++) {
        gifContainer = document.createElement("div");
        gifContainer.classList.add("gifU");
        gifContainer.innerHTML = `<img src="${trendingGifs_array[i].url}" alt="${trendingGifs_array[i].title}">
            <div class="gif-hover hidden">
                <div class="gif-buttonbar">
                    <img src="imgs/icon-fav.svg" class="fav" alt="Favorite button">
                    <img src="imgs/icon-download.svg" class="download" alt="Download button">
                    <img src="imgs/icon-max-normal.svg" class="maximize" alt="Maximize button">
                </div>
                <p class="gif-user">${trendingGifs_array[i].author}</p>
                <p class="gif-title">${trendingGifs_array[i].title}</p>
            </div>`;
        trendingGifs_container.appendChild(gifContainer);
        gifEventListeners(gifContainer);
        addGifButtons(gifContainer);
    }
}

//---------- SEARCH SECTION ----------

function addSuggestions(array) {
    autocomplete_suggest.classList.remove("hidden");
    autocomplete_suggest.innerHTML = "";
    input_search.style.borderRadius = "27px 27px 0 0";
    input_search.style.borderBottom = "none";
    for (let i = 0; i < 5; i++) {
        let li = document.createElement("li");
        li.innerHTML = `<img src="../../imgs/icon-search.svg" class="suggest-button"></img><p>${array[i].title}</p>`;
        autocomplete_suggest.appendChild(li);
        li.addEventListener("click", () => {
            input_search.value = array[i].title;
            userSearch(array[i].title);
            hideSuggestions();
            deactivateSearch();
            iterations = 0;
            offsetS = 0;
            search_section.innerHTML = "";
            searchedGifsArray = [];
            search_section.classList.remove("hidden");
            search_section.scrollIntoView()
        })
    }
}

function hideSuggestions() {
    input_search.style.borderRadius = "27px";
    if (darkMode_enabled == false) {
        input_search.style.borderBottom = "1pt solid #572EE5";
    } else {
        input_search.style.borderBottom = "1pt solid #9CAFC3";
    }

    autocomplete_suggest.classList.add("hidden");
}

//----- SEARCH ON NAV -----
function searchingOnNav() {
    if (window.matchMedia("(max-width: 800px)").matches) {
    } else if (window.matchMedia("(max-width: 1280px)")) {
        if (document.documentElement.scrollTop > 500) {
        searchOnNav()
        } else {
            search_nav.classList.add("hidden");
            section_nav.style.borderBottom = "none";
        }
    }
}

function searchOnNav() {
    search_nav.classList.remove("hidden");
    if (input_search.value != "") {
        searchBar_nav.value = input_search.value;
    }
}

window.addEventListener('scroll', searchingOnNav);

function searching() {
    document.querySelector(".search-h3").classList.add("hidden");
    document.querySelector(".search-trending-tags").classList.add("hidden");
    searchIcon_purple.classList.add("hidden");
    cancel_search.classList.remove("hidden");
    searchIcon_gray.classList.remove("hidden");
    nav_purple_magnifyingGlass.classList.add("hidden");
    nav_search_close.classList.remove("hidden");
    nav_gray_magnifyingGlass.classList.remove("hidden");
}

function deactivateSearch() {
    document.querySelector(".search-h3").classList.remove("hidden");
    document.querySelector(".search-trending-tags").classList.remove("hidden");
    searchIcon_purple.classList.remove("hidden");
    cancel_search.classList.add("hidden");
    searchIcon_gray.classList.add("hidden");
    nav_purple_magnifyingGlass.classList.remove("hidden");
    nav_search_close.classList.add("hidden");
    nav_gray_magnifyingGlass.classList.add("hidden");
    search_section.classList.add("hidden");
}

function startSearch() {
    if (input_search.value != "") {
        search_section.scrollIntoView()
        iterations = 0;
        offsetS = 0;
        search_section.innerHTML = "";
        searchedGifsArray = [];
        deactivateSearch();
        search_section.classList.remove("hidden");
        userSearch(input_search.value);
    }
}

//----- DISPLAY SEARCHED GIFS -----
function userSearchedGifs(array, input) {
    for (let i = 0; i < array.length; i++) {
        let newGif = new GIFINFO(
        i + offsetS,
        array[i].userName,
        array[i].title,
        array[i].images.original.url
        );
        searchedGifsArray.push(newGif);
    }
    printSearchedGifs(searchedGifsArray, input);
}

function printSearchedGifs(array, input) {
    console.log(input)
    if (offsetS == 0) {
        search_section.innerHTML = " ";
        searchedGifsArray = [];
        hr = document.createElement("hr");
        search_section.appendChild(hr);
        h3 = document.createElement("h3");
        h3.innerHTML = input;
        search_section.appendChild(h3);
    }

    if (array.length == 0) {
        noRes = document.createElement("div");
        noRes.style = "display:flex; flex-flow: column;";
        noRes.innerHTML = `<img src="imgs/icon-busqueda-sin-resultado.svg"> <h3 class="no-result">Intenta con otra búsqueda.</h3>`;
        search_section.appendChild(noRes);
    }

    for (let i = 0; i < array.length; i++) {
        div = document.createElement("div");
        div.classList.add("gifU");
        div.innerHTML = `<img src="${array[i].url}" alt="gif" class="gifU trending-giff">
        <div class="gif-hover hidden">
            <div class="gif-buttonbar">
                <img src="imgs/icon-fav.svg" class="fav" alt="Favorite button">
                <img src="imgs/icon-download.svg" class="download" alt="Download button">
                <img src="imgs/icon-max-normal.svg" class="maximize" alt="Maximize button">
            </div>
            <p class="gif-user">${array[i].author}</p>
            <p class="gif-title">${array[i].title}</p>`;
        search_section.appendChild(div);
        gifEventListeners(div);
        addGifButtons(div);
    }
    iterations++;

//----- BUTTON MORE -----
    if (iterations < 3) {
        if (array.length > 11) {
        createButton();
        }
    } else if (array.length - (offsetS - 12) > 11) {
        createButton();
    }

    function createButton() {
        let button = document.createElement("button");
        button.classList.add("see-more");
        button.innerHTML = "VER MÁS";
        button.addEventListener("click", () => {
            document.querySelector(".see-more").remove();
            offsetS = offsetS + 12;
            userSearch(input_search.value);
        });
        search_section.append(button);
    }
}