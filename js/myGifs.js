var ownGifsArray = [];
function retrieveMyGifos() {
    if (localStorage.hasOwnProperty("MYGIFS")) {
        ownGifsArray = JSON.parse(localStorage.getItem("MYGIFS"))
    }
}
retrieveMyGifos();

function MYGIFINFO(index, author, title, url) {
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
    return this;
}

myGifs_link.addEventListener("click", goToMyGifs);

function goToMyGifs() {
    myGifs_section.classList.remove("hidden");
    favoriteGifs_section.classList.add("hidden");
    create_section.classList.add("hidden");
    searchS.classList.add("hidden");
    maximizeGif_section.classList.add("hidden");
    search_section.classList.add("hidden");
    trendingGifs_section.classList.remove("hidden");
    printOwnGifs();
}

function printOwnGifs() {
    myGifs_section.innerHTML = `<img src="imgs/icon-mis-gifos.svg" alt="My gifs"> 
    <h4>Mis GIFOS</h4>
    <button class="back2">VOLVER</button>`;
    document.querySelector(".back2").addEventListener("click", () => {
        maximizeGif_section.classList.add("hidden");
        searchS.classList.remove("hidden");
        myGifs_section.classList.add("hidden");
    });
    if (ownGifsArray.length == 0) {
        div = document.createElement("div");
        div.style = "display:flex; flex-direction: column; align-items: center; margin-top: 4rem"
        div.innerHTML = `<img src="imgs/icon-mis-gifos-sin-contenido.svg" alt="Empty">
    <p class="no-result">¡Anímate a crear tu primer GIFO!</p>`;
        myGifs_section.appendChild(div);
    } else {
        let container = document.createElement("div");
        container.classList.add("container");
        myGifs_section.appendChild(container);
        for (let i = 0; i < ownGifsArray.length; i++) {
            let giffU = document.createElement("div")
            giffU.classList.add("gifU");
            giffU.innerHTML = `<img src="${ownGifsArray[i].url}" alt="${ownGifsArray[i].title}">
        <div class="gif-hover hidden">
            <div class="gif-buttonbar">
                <img src="imgs/icon-trash-normal.svg" class="delete" alt="Delete favorite">
                <img src="imgs/icon-download.svg" class="download" alt="Download button">
                <img src="imgs/icon-max-normal.svg" class="maximize" alt="Maximize button">
            </div>
            <p class="gif-user">${ownGifsArray[i].author}</p>
            <p class="gif-title">${ownGifsArray[i].title}</p>
        </div>`;
            container.appendChild(giffU);
            giffU.addEventListener("mouseover", () => {
                giffU.querySelector(".gif-hover").classList.remove("hidden");
            });
            giffU.addEventListener("mouseout", () => {
                giffU.querySelector(".gif-hover").classList.add("hidden");
            });
            let buttons = giffU.querySelectorAll(".gif-buttonbar img");
            if (window.matchMedia("(max-width: 1000px)").matches) {
                giffU.addEventListener("click", () => {
                    maximizeGif(giffU);
                });
            }             
            buttons[0].addEventListener("click", () => {
                console.log("Deleting gif: " + giffU.querySelector(".gif-title").innerHTML)
                ownGifsArray.splice(i, 1);
                localStorage.setItem("MYGIFS", JSON.stringify(ownGifsArray));
                printOwnGifs();
            })
            buttons[1].addEventListener("click", () => {
                downloadGif(ownGifsArray[i].url,ownGifsArray[i].title);
            });
            buttons[2].addEventListener("click", () => {
                maximizeGif(giffU);
            });
            buttons[0].addEventListener("mouseover", () => {
                buttons[0].src = "imgs/icon-trash-hover.svg";
            });
            buttons[0].addEventListener("mouseout", () => {
                buttons[0].src = "imgs/icon-trash-normal.svg";
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
    }
}
printOwnGifs();