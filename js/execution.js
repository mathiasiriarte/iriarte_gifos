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
        //REPLACE SOURCES
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