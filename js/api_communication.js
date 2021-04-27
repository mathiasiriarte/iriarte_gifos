//----- KEY -----
const generated_api_key = "dEU71xYON78mNX3VJOtvuScHXSKxkWDI";
//----- SEARCH -----
const api_search_endpoint = "https://api.giphy.com/v1/gifs/search";
//----- TRENDING GIFS -----
const api_trendingGif_endpoint = "https://api.giphy.com/v1/gifs/trending";
//----- POPULAR SEARCH TAGS -----
const api_trendingSearchTags_endpoint = "https://api.giphy.com/v1/trending/searches";

trendingSearchTags();

//---------- CALL TRENDING SEARCH TAGS ----------
async function trendingSearchTags() {
    await fetch(api_trendingSearchTags_endpoint + "api_key=" + generated_api_key)
        .then(response => { return (response.json()) })
        .then(json => {
            console.log(json);
        })
        .catch(err => console.log(err))
}