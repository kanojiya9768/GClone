//get SearchResult OF Google
export let getResultByQuery = async (query) => {
  try {
    let response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.API_URL}&cx=${process.env.SEARCH_KEY}&q=${query}`,
      { cache: "force-cache" }
    );
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

//get videos Search Results
export const getVideosByQuery = async (query) => {
  try {
    let url =
      "https://www.googleapis.com/youtube/v3/search?" +
      new URLSearchParams({
        maxResults: 50,
        q: `${query?.split(" ")?.join("+")}`,
        key: "AIzaSyBifNkI5dPkJRBb5K2I3AY9bHbQyEni_ZQ",
        part: "snippet",
        type: "video",
      });
    let response = await fetch(url, { cache: "force-cache" });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

//get Images Search Results
export const getImagesByQuery = async (query) => {
  try {
    let response = await fetch(
      `${process.env.PIXABAY_SEARCH_IMAGE_BASE_URL}?key=${process.env.PIXABAY_API_KEY}&q=${query}&image_type=photo&pretty=true`,
      { cache: "force-cache" }
    );
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
};


//GET NEWS SEARCH RESULT
export const getNewsByQuery = async(query) =>{
  try{
    let response = await fetch(
      `${process.env.NEWS_API_BASE_URL}?q=${query?.split(' ').join('+')}&apiKey=${process.env.NEWS_API_KEY}`,
      { cache: "force-cache" }
    )
    if(response.ok){
      return response?.json();
    }
  }catch(error){
    console.log(error);
  }
}
