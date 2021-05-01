//----- KEY -----
const generated_api_key = "dEU71xYON78mNX3VJOtvuScHXSKxkWDI";
//----- SEARCH ENDPOINT -----
const api_search_endpoint = "https://api.giphy.com/v1/gifs/search";
//----- TRENDING GIFS ENDPOINT -----
const api_trendingGif_endpoint = "https://api.giphy.com/v1/gifs/trending";
//----- POPULAR SEARCH TAGS ENDPOINT-----
const api_trendingSearchTags_endpoint = "https://api.giphy.com/v1/trending/searches";

trendingSearchTags();
trendingGifs();

//---------- CALL TRENDING SEARCH TAGS ----------
async function trendingSearchTags() {
    await fetch(api_trendingSearchTags_endpoint + "?api_key=" + generated_api_key)
        .then(response => { return (response.json()) })
        .then(json => {
            console.log(json);
            generateTrendingTags(json.data);
        })
        .catch(err => console.log(err))
}

//---------- CALL TRENDING GIFS ----------
async function trendingGifs() {
    await fetch(api_trendingGif_endpoint + "?api_key=" + generated_api_key + "&limit=" + 9 + "&rating=g")
        .then(response => { return (response.json()) })
        .then(json => {
            console.log(json);
            addTrendingGifs(json.data);
            postTrendingGifs(0);
        })
        .catch(err => console.log(err))
}

//---------- CALL SEARCH ----------
async function userSearch(input) {
    await fetch(api_search_endpoint + "?api_key=" + generated_api_key + "&q=" + input + "&limit=" + 12 + "&offset="+ (offsetS + 1) + "&rating=g")
    .then(response => { return (response.json()) })
        .then(json => {
            console.log(json);
            console.log(input)
            userSearchedGifs(json.data, input);
        })
        .catch(err => console.log(err))
}

//---------- CALL AUTOCOMPLETE ----------
async function suggest(input) {
    await fetch(api_search_endpoint + "?api_key=" + generated_api_key + "&q=" + input + "&limit=" + 5 + "&rating=g")
    .then(response => { return (response.json()) })
        .then(json => {
            console.log(json);
            addSuggestions(json.data);
        })
        .catch(err => console.log(err))
}