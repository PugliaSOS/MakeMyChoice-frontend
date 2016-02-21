$( document ).ready(function() {

  $(".search_input").autocomplete({ 
    appendTo: "overlay",
    source: ['Tv','Cellulari','Computer','Tablet','TV','T-Shirt'],
    minLength:1,
  }); 
 
  $(".search").click(function() {
	$(".title").addClass("hidden");
  	$(".search_bar").removeClass("hidden");
  	$(".overlay").css("background-color", "rgba(125, 125, 125, .5)");
  });
});
