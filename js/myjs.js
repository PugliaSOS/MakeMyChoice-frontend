$( document ).ready(function() {

  $(".search_input").autocomplete({
    source: ['Tv','Cellulari','Computer','Tablet','TV','T-Shirt'],
    minLength:1
  });

  $(".search").click(function() {
	$(".title").addClass("hidden");
  	$(".search_bar").removeClass("hidden");
  	$(".overlay").css("opacity", "0.3");
  });
});