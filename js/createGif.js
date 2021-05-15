const create_button = document.getElementById("btnCreateGif1");
create_button.addEventListener("click", () => {
    create_button.src = "imgs/CTA-crear-gifo-active.svg"
    create_section.classList.remove("hidden");
    searchS.classList.add("hidden");
    favoriteGifs_section.classList.add("hidden");
    search_section.classList.add("hidden");
    trendingGifs_section.classList.add("hidden");
    maximizeGif_section.classList.add("hidden");
    create_section.scrollIntoView()
});
const startRec = document.querySelector(".start-btn");
startRec.addEventListener("click", executeStep1, { once: true });
const create_section = document.querySelector(".create-section");

function executeStep1() {
    startRec.removeEventListener("click", executeStep1);
    document.querySelector(".create-section h2").innerHTML = "¿Nos das acceso a tu cámara?";
    document.querySelector(".create-section .my-gifo p").innerHTML = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
    document.querySelector(".create-section .steps .p1").style.backgroundColor = "#572EE5";
    document.querySelector(".create-section .steps .p1").style.color = "white";
    startRec.innerHTML = "OK";
    startRec.addEventListener("click", () => {
        getStreamAndRecord()
    }, { once: true });
}

async function getStreamAndRecord() {
    document.querySelector(".create-section .steps .p1").style.backgroundColor = "white";
    document.querySelector(".create-section .steps .p1").style.color = "#572EE5";
    document.querySelector(".create-section .steps .p2").style.backgroundColor = "#572EE5";
    document.querySelector(".create-section .steps .p2").style.color = "white";
    var video = document.createElement("video");
    await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
        .then(function (stream) {
            document.querySelector(".create-window").innerHTML = "";
            document.querySelector(".create-window").append(video);
            startRec.innerHTML = "GRABAR";
            startRec.addEventListener("click", () => {
                recorder.startRecording();
                startRec.innerHTML = "FINALIZAR";
                startRec.addEventListener("click", () => {
                    document.querySelector(".create-section .steps .p2").style.backgroundColor = "white";
                    document.querySelector(".create-section .steps .p2").style.color = "#572EE5";
                    document.querySelector(".create-section .steps .p3").style.backgroundColor = "#572EE5";
                    document.querySelector(".create-section .steps .p3").style.color = "white";
                    overlay = document.createElement("div");
                    overlay.classList.add("create-overlay");
                    overlay.innerHTML = `<img src="imgs/loader.svg" alt="Cargando"><p>Estamos subiendo tu GIFO</p>`
                    document.querySelector(".create-window").append(overlay)
                    recorder.stopRecording()
                    let form = new FormData();
                    form.append('file', recorder.getBlob(), 'myGifo.gif');
                    form.append('api_key', generated_api_key)
                    console.log(form.get('file'))
                    async function uploadFetch() {
                        await fetch("https://upload.giphy.com/v1/gifs", {
                            method: 'POST',
                            body: form,
                            mode: 'cors'
                        })
                            .then(response => {
                                return response.json();
                            })
                            .then(result => {
                                console.log("RESULT")
                                console.log(result)
                                fetch(`https://api.giphy.com/v1/gifs?ids=${result.data.id}&api_key=${generated_api_key}`)
                                    .then(response => response.json())
                                    .then(ownGif => {
                                        let my_own_gif = new MYGIFINFO(ownGifsArray.length, "Tú", "Sin título", ownGif.data[0].images.original.url)
                                        console.log("ownGif")
                                        console.log(my_own_gif)
                                        ownGifsArray.push(my_own_gif);
                                        localStorage.setItem("MYGIFS", JSON.stringify(ownGifsArray));
                                    })
                                overlay.querySelector("img").src = "imgs/ok.svg";
                                overlay.querySelector("p").innerHTML = "GIFO subido con éxito. Si quieres subir otro GIFO, recarga la página";
                                setTimeout(() => {
                                    takeUserToMyGifos();
                                }, 2500);
                            })
                    }
                    uploadFetch();

                }, { once: true })
            }, { once: true });
            video.srcObject = stream;
            video.play();

            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('Recording')
                },
            });
        })
}