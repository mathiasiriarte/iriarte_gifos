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
    buttons[0].addEventListener("click", () => {
        console.log("Favoriteando GIFO: " + selected.querySelector(".gif-title").innerHTML)
        favItem = new FAVGIFO(array_favorites.length, selected.querySelector(".gif-title").innerHTML, selected.querySelector(".gif-user").innerHTML, selected.querySelector("img").src);
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
    maximizeGif_section.querySelector(".title").innerHTML = title;
    maximizeGif_section.querySelector(".username").innerHTML = userName;
    maximizeGif_section.querySelector(".gifo").src = url;
    maximizeGif_section.classList.remove("hidden");
    search_section.classList.add("hidden");
    favoriteGifs_section.classList.add("hidden");
    window.scrollTo(0, 0);
    let buttons = maximizeGif_section.querySelectorAll(".maximized-container img");
    buttons[0].addEventListener("click", () => {
        favItem = new FAVGIFO(array_favorites.length, userName, title, url);
        buttons[0].src = "imgs/icon-fav-active.svg";
    })
    buttons[0].addEventListener("mouseover", () => {
        buttons[0].src = "imgs/icon-fav-hover.svg";
    });
    buttons[0].addEventListener("mouseout", () => {
        buttons[0].src = "imgs/icon-fav.svg";
    });
    buttons[1].addEventListener("click", () => {
        downloadGif(maximizeGif_section.querySelector(".gifo").src, maximizeGif_section.querySelector(".title").innerHTML)
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
    search_section.classList.remove("hidden");
    favoriteGifs_section.classList.add("hidden");
});

//----- DOWNLOAD GIF FUNCTION -----
async function downloadGif(url, title) {
    let blob = await fetch(url).then(img => img.blob());
    saveGif(blob, title + ".gif");
}

//--------------- TRENDING SEARCH TAGS ---------------
function generateTrendingTags(array) {
    //DELETE PLACEHOLDER
    popular_tags.innerHTML = "";
    //CREATE & APPEND ALL ELEMENTS
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
        gifContainer.classList.add("gifo");
        gifContainer.innerHTML = `<img src="${trendingGifs_array[i].url}" alt="${trendingGifs_array[i].title}">
            <!--OVERLAY-->
            <div class="gif-hover hidden">
                <div class="gif-buttonbar">
                    <img src="imgs/icon-fav.svg" class="fav" alt="Botón favorito">
                    <img src="imgs/icon-download.svg" class="download" alt="Botón descargar">
                    <img src="imgs/icon-max-normal.svg" class="maximize" alt="Botón maximizar">
                </div>
                <p class="gif-user">${trendingGifs_array[i].author}</p>
                <p class="gif-title">${trendingGifs_array[i].title}</p>
            </div>`;
        trendingGifs_container.appendChild(gifContainer);
        gifEventListeners(gifContainer);
        addGifButtons(gifContainer);
    }
}
