//Problem: Retrieve content from the NYT Top Stories API and add it to our site.
//If we dont get a successful response, let the user know/

//1a) Listen for the select menu to change (watching value)
//1b) If the select value is an empty string, do nothing and return from this function immediately... can do with if statment//
//1c) Show a loader and clear out old stories
//2) Send a request to the NYT API for data based in the value of the select menu
//3) If successful, parse the data that we get back and decide what parts we want to append to our DOM
//4) Append that stuff to the DOM
//5) If unsuccessful, append and show a helpful error message to the user in the UI
//6) Hide the loader again

//the same as document ready()
$(document).ready(function() {

    $("#selections").on("change", function() {
        const storySelector = $("#selections option:selected").val();
        $(".loadAnimation").append(`<img src="assets/images/ajax-loader.gif">`);
    });

    //   console.log(section); (take out )
// if value is empty, return( easy 3 liner)
//show loader here
//clear stories

//make our ajax request/use the ajax method
$.ajax({
   method: 'GET',
   url:`https://api.nytimes.com/svc/topstories/v2/${storySelector}.json?api-key=AzWQPPnoeoce8OTsnO0jBU6R9LJ2UuGR`,
    dataType: 'json'

}).done(function(response) { //=is an object!
   console.log(response.results);
   //append all the things

   //1. Filter the data to only includee 12 aeticles with images.
   //2. Create .each function to run a function for each article in response. results

   //3. For each article -create constans for image URL, title and link
   //4. Make a HTML string for the article, using the constans we just created do stuff here if it doesnt work out
   //5. append string to stories section.
})
.fail(function() {
   //do stuff here if it doesnt work out


}).always(function() {
    $(".loadAnimation").remove();
});
});