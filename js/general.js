var darkMode_enabled;
var hamburgerMenu_open = false;
var carouselOffset = 0;
var offsetS = 0;
var trendingGifs_array = [];
var searchedGifs_array = [];
var iterations = 0;
//---------- NAV ----------
const section_nav = document.querySelector(".nav");
const logo = document.querySelector(".nav-logo");
const search_nav = document.querySelector(".nav-search-container");
const searchBar_nav = document.querySelector(".nav-search-bar");
const nav_purple_magnifyingGlass = document.querySelector(".nav-searchIcon-purple");
const nav_gray_magnifyingGlass = document.querySelector(".nav-searchIcon-gray");
const nav_search_close = document.querySelector(".nav-search-close");
const hamburguer = document.querySelector(".nav-container-hamburger");
const ul_nav = document.querySelector(".nav-container-items");
const ul_li_nav = document.querySelectorAll(".nav-container-items li");
//---------- LINKS ----------
const darkMode_toggle = document.getElementById("btnDarkMode");
const favorites_link = document.getElementById("btnFav");
const myGifs_link = document.getElementById("btnMyGifs");
//---------- SEARCH SECTION ----------
const search_section = document.querySelector(".search-section");
const popular_tags = document.querySelector(".search-trending-tags");
const input_search = document.querySelector(".searchbar");
const searchIcon_purple = document.querySelector(".search-icon-purple");
const searchIcon_gray = document.querySelector(".search-icon-gray");
const cancel_search = document.querySelector(".search-close");
const autocomplete_suggest = document.querySelector(".autocomplete");
//--------------------
const favoriteGifs_section = document.querySelector(".favs");
const maximizeGif_section = document.querySelector(".max");
const myGifs_section = document.querySelector(".my-gifs");
const results_search = document.querySelector(".search-results");
//---------- TRENDING SECTION ----------
const trendingGifs_section = document.querySelector(".trending-gifos");
const trendingGifs_container = document.querySelector(".trending-gifos-gifos-container");
const trendingRightArrow = document.getElementById("rightArrow");
const trendingLeftArrow = document.getElementById("leftArrow");
//---------- FOOTER ----------
const facebook = document.querySelectorAll(".share-buttons")[0];
const twitter = document.querySelectorAll(".share-buttons")[1];
const instagram = document.querySelectorAll(".share-buttons")[2];



//---------- EVENT LISTENERS ----------

darkMode_toggle.addEventListener("click", () => {
    enableDarkMode(); if (darkMode_enabled == false) {
        hamburguer.src = "imgs/close.svg";
    } else {
        hamburguer.src = "imgs/close-modo-noct.svg";
    }
});

spc1 = document.createElement("hr");
spc2 = document.createElement("hr");
ul_nav.insertBefore(spc1, ul_li_nav[1])
ul_nav.insertBefore(spc2, ul_li_nav[2])

//----- HAMBURGUER -----
hamburguer.addEventListener("click", () => {
    if (hamburgerMenu_open == false) {
        ul_nav.style.display = "flex";
        hamburgerMenu_open = true;
        if (darkMode_enabled == false) {
            hamburguer.src = "imgs/close.svg";
    } else {
        hamburguer.src = "imgs/close-modo-noct.svg";
    }
    } else {
            ul_nav.style.display = "none";
            hamburgerMenu_open = false;
            if (darkMode_enabled == false) {
                hamburguer.src = "imgs/burger.svg";
            } else {
                hamburguer.src = "imgs/burger-modo-noct.svg";
            }
        }
});

favorites_link.addEventListener("click", () => {
    search_section.classList.add("hidden")
    favoriteGifs_section.classList.remove("hidden")
    maximizeGif_section.classList.add("hidden");
    create-section.classList.add("hidden");
    myGifs_section.classList.add("hidden");
    trendingGifs_section.classList.remove("hidden");
    if (hamburgerMenu_open == true) {
        ul_nav.style.display = "none";
        hamburgerMenu_open = false;
    }

    if (darkMode_enabled == false) {
        hamburguer.src = "imgs/burger.svg";
    } else {
        hamburguer.src = "imgs/burger-modo-noct.svg";
    }
retrieveFavs();
})

function addTagListeners() {
    for (let i = 0; i < 5; i++) {
    popular_tags.querySelectorAll(".trending-tag")[i].addEventListener("click", () => {
        input_search.value = popular_tags.querySelectorAll(".trending-tag")[i].innerHTML;
        searchBar_nav.value = popular_tags.querySelectorAll(".trending-tag")[i].innerHTML;
        startSearch();
    })
    }
}
//------------------ SEARCH ------------------
//---------- TRIGGER SEARCH ON INPUT ----------
input_search.addEventListener("input", () => { suggest(input_search.value) })
searchIcon_purple.addEventListener("click", () => { startSearch() });
input_search.addEventListener("keypress", (input) => {
    if (input.charCode === 13) {
        startSearch()
    }
});
//----- NAVBAR -----
nav_purple_magnifyingGlass.addEventListener("click", () => {
    input_search.value = searchBar_nav.value;
    startSearch();
});
searchBar_nav.addEventListener("keypress", (input) => {
    if (input.charCode === 13) {
        input_search.value = searchBar_nav.value;
        startSearch();
    }
});

input_search.addEventListener("focus", () => { searching() });
searchIcon_gray.addEventListener("click", () => { startSearch() });
cancel_search.addEventListener("click", () => { searchDisable(); input_search.value = ""; searchBar_nav.value = ""; SearchSection.innerHTML = ""; });

nav_gray_magnifyingGlass.addEventListener("click", () => {
    input_search.value = searchBar_nav.value;
    startSearch();
});
nav_search_close.addEventListener("click", () => { searchDisable(); input_search.value = ""; searchBar_nav.value = ""; SearchSection.innerHTML = ""; });

//---------- TRENDING SECTION ----------
trendingRightArrow.addEventListener("click", () => {
    if (carouselOffset < 6) {
        carouselOffset = carouselOffset + 3;
    } else {
        carouselOffset = 0;
    }
    printTrendingGifs(carouselOffset)
});

trendingRightArrow.addEventListener("mouseover", () => {
    trendingRightArrow.src = "imgs/button-slider-right-hover.svg"
});

trendingRightArrow.addEventListener("mouseout", () => {
    if (darkMode_enabled == false) {
    trendingRightArrow.src = "imgs/Button-Slider-right.svg"
    } else {
        trendingRightArrow.src = "imgs/button-slider-right-md-noct.svg";
    }
});

trendingLeftArrow.addEventListener("click", () => {
    if (carouselOffset > 0) {
        carouselOffset = carouselOffset - 3;
    } else {
        carouselOffset = 6;
    }
printTrendingGifs(carouselOffset)
});

trendingLeftArrow.addEventListener("mouseover", () => {
    trendingLeftArrow.src = "imgs/button-slider-left-hover.svg"
});

trendingLeftArrow.addEventListener("mouseout", () => {
    if (darkMode_enabled == false) {
        trendingLeftArrow.src = "imgs/button-slider-left.svg"
    } else {
        trendingLeftArrow.src = "imgs/button-slider-left-md-noct.svg";
    }
});

//---------- FOOTER ----------
facebook.addEventListener("click", () => {
    window.location.href = "https://www.facebook.com/";
});
facebook.addEventListener("mouseover", () => {
    facebook.src = "imgs/icon_facebook_hover.svg";
});
facebook.addEventListener("mouseout", () => {
    if (darkMode_enabled == false) {
        facebook.src = "imgs/icon_facebook.svg";
    } else {
    facebook.src = "imgs/icon_facebook_noc.svg"
    }
});

twitter.addEventListener("click", () => {
    window.location.href = "https://twitter.com/";
});
twitter.addEventListener("mouseover", () => {
    twitter.src = "imgs/icon-twitter-hover.svg";
});
twitter.addEventListener("mouseout", () => {
    if (darkMode_enabled == false) {
        twitter.src = "imgs/icon-twitter.svg";
    } else {
        twitter.src = "imgs/icon_twitter_noc.svg"
    }
});

instagram.addEventListener("click", () => {
    window.location.href = "https://www.instagram.com/";
});
instagram.addEventListener("mouseover", () => {
    instagram.src = "imgs/icon_instagram-hover.svg";
});
instagram.addEventListener("mouseout", () => {
    if (darkMode_enabled == false) {
        instagram.src = "imgs/icon_instagram.svg";
    } else {
        instagram.src = "imgs/icon_instagram_noc.svg"
    }
});

function GIFINFO(index, author, title, url) {
    this.index = index;
    this.author = author;
    if (this.author == "") {
        this.author = "Anónimo";
    }
    this.title = title;
    if (this.title == "") {
        this.title = "Sin título";
    }
    this.url = url;
    return this;
}