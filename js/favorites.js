    //*ARRAY
var favoritesArray = [];
    //*RETRIEVE FROM LOCALSTORAGE
function retrieveFavs() {
    if (localStorage.hasOwnProperty("FAVORITEGIFS")) {
        favoritesArray = JSON.parse(localStorage.getItem("FAVORITEGIFS"))
    } 
}
retrieveFavs();
    //*FAV A GIFO
function favSelected(item) {
    favoritesArray.push(item);
    localStorage.setItem("FAVORITEGIFS", JSON.stringify(favoritesArray));
    displayFavGifs();
}
    //*CONSTRUCT FAV GIFOS
function FAVGIFINFO(index, author, title, url) {
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
    console.log(this)
    favSelected(this);
    return this;
}
    //*RENDER GIFOS
function displayFavGifs() {
    favoriteGifs_section.innerHTML = `<img src="imgs/icon-favoritos.svg" alt="Favorites"> 
    <h4>Favoritos</h4>
    <button class="back">VOLVER</button>`;
    document.querySelector(".back").addEventListener("click", () => {
        maximizeGif_section.classList.add("hidden");
        searchS.classList.remove("hidden");
        favoriteGifs_section.classList.add("hidden");
        
    });
    if (favoritesArray.length == 0) {
        div = document.createElement("div");
        div.style = "display:flex; flex-direction: column; align-items: center; margin-top: 4rem"
        div.innerHTML = `<img src="imgs/icon-fav-sin-contenido.svg" alt="No gifs saved">
    <p class="no-result">¡Guarda tu primer GIFO en Favoritos 
    para que se muestre aquí!</p>`;
        favoriteGifs_section.appendChild(div);
    } else {
        let container = document.createElement("div");
        container.classList.add("container");
        favoriteGifs_section.appendChild(container);
        for (let i = 0; i < favoritesArray.length; i++) {
            let gifoo = document.createElement("div")
            gifoo.classList.add("gifU");
            gifoo.innerHTML = `<img src="${favoritesArray[i].url}" alt="${favoritesArray[i].title}">
        <div class="gif-hover hidden">
            <div class="gif-buttonbar">
                <img src="imgs/icon-trash-normal.svg" class="delete" alt="Delete favorite">
                <img src="imgs/icon-download.svg" class="download" alt="Download button">
                <img src="imgs/icon-max-normal.svg" class="maximize" alt="Maximize button">
            </div>
            <p class="gif-user">${favoritesArray[i].author}</p>
            <p class="gif-title">${favoritesArray[i].title}</p>
        </div>`;
            container.appendChild(gifoo);
            //HOVER
            gifoo.addEventListener("mouseover", () => {
                gifoo.querySelector(".gif-hover").classList.remove("hidden");
            });
            gifoo.addEventListener("mouseout", () => {
                gifoo.querySelector(".gif-hover").classList.add("hidden");
            });
            let buttons = gifoo.querySelectorAll(".gif-buttonbar img");
            //MEDIA QUERY (IF ON MOBILE, THE CLICK WILL MAXIMIZE GIFO)
            if (window.matchMedia("(max-width: 1000px)").matches) {
                gifoo.addEventListener("click", () => {
                    maximizeGif(gifoo);
                });
            }
            ////BUTTONS
            //!CLICK LISTENERS
            //fav
            buttons[0].addEventListener("click", () => {
                console.log("Borrando GIFO: " + gifoo.querySelector(".gifo-title").innerHTML)
                favoritesArray.splice(i, 1);
                localStorage.setItem("FAVORITEGIFS", JSON.stringify(favoritesArray));
                displayFavGifs();
            })
            //download
            buttons[1].addEventListener("click", () => {
                downloadGif(favoritesArray[i].url, favoritesArray[i].title);
            });
            //maximize
            buttons[2].addEventListener("click", () => {
                maximizeGif(gifoo);
            });
            //!HOVER LISTENERS
            //remove button
            buttons[0].addEventListener("mouseover", () => {
                buttons[0].src = "imgs/icon-trash-hover.svg";
            });
            buttons[0].addEventListener("mouseout", () => {
                buttons[0].src = "imgs/icon-trash-normal.svg";
            });
            //download button
            buttons[1].addEventListener("mouseover", () => {
                buttons[1].src = "imgs/icon-download-hover.svg";
            });
            buttons[1].addEventListener("mouseout", () => {
                buttons[1].src = "imgs/icon-download.svg";
            });
            //expand button
            buttons[2].addEventListener("mouseover", () => {
                buttons[2].src = "imgs/icon-max-hover.svg";
            });
            buttons[2].addEventListener("mouseout", () => {
                buttons[2].src = "imgs/icon-max-normal.svg";
            });
        }
    }
}
displayFavGifs();