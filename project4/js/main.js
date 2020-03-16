/**
   This program will search and display 10 gifs using the giphy API

   Thomas Good 2019
*/

/**
   This function simply adds event listeners to the two buttons found in the html
*/
const init = () => {
   let searchButton = document.querySelector("#searchGiphy");
   searchButton.addEventListener("click", sendUserInputAndRetrieveData);

   let clearButton = document.querySelector("#clearResults");
   clearButton.addEventListener("click", clearResults);
}

/**
   This function will send the user's input to getGifsFromGiphy. It will then prepare
   the gif display container, then send the user searched gifs to createDisplayForGifs
*/
sendUserInputAndRetrieveData = async () => {
   // clear the screen in case gifs are already on the page
   clearResults();

   // Grab the gifs from Giphy and add them to the returningGifs variable
   let returningGifs = await getGifsFromGiphy(document.querySelector("#userInput").value);

   // Create container before loading gifs into it
   let gifContainer = document.createElement("div");
   gifContainer.setAttribute("id", "gifContainer");
   gifContainer.setAttribute("class", "row");
   document.body.appendChild(gifContainer);

   returningGifs.map((gif) => createDisplayForGifs(gif));
}

/**
   This function will search the giphy api for whatever the user searched with a fetch. Once the gifs are recieved, 
   they will be mapped to returnedGifs so that we are only getting back the .mp4 url of the gif
*/
getGifsFromGiphy = async userInput => {
   const url = `http://api.giphy.com/v1/gifs/search?q=${userInput}&limit=10&api_key=H21vL3H5wKGOs430ACQxiCHkLlQgU8GG`;
   return await fetch(url).then(data => {
      return data.json();
   }).then(jsonData => {
      let gifDataArray = jsonData.data;
      let returnedGifs = gifDataArray.map(gif => gif.images.looping.mp4)
      return returnedGifs;
   })
}

/**
   This function will create the individual gif displays by attaching the returned urls of the gifs
   to a source tag. These displays will then be appended to the gifContainer created in sendUserInputAndRetrieveData
*/
createDisplayForGifs = gifs => {
   let gifDisplay = document.createElement("video");
   gifDisplay.setAttribute("class", "col-xs-4");
   gifDisplay.setAttribute("autoplay", "autoplay");
   let source = document.createElement("source");
   source.setAttribute("src", gifs);
   source.setAttribute("type", "video/mp4");
   gifDisplay.appendChild(source);
   let gifContainer = document.querySelector("#gifContainer");
   gifContainer.appendChild(gifDisplay);
}

/**
   This function simply checks if the gifContainer exisits. If it does, it will delete it from the html page.
   Used for new searches, or when the user clears the results.
*/
clearResults = () => {
   // Check to make sure the div containing the gifts exists on the page first
   if (document.body.querySelector("#gifContainer")) { 
      document.body.removeChild(document.querySelector("#gifContainer"));
   }
}

window.onload = init;